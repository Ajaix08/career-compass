import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Application {
  id: string;
  job_id: string;
  candidate_id: string;
  status: string;
  cover_letter: string | null;
  resume_url: string | null;
  created_at: string;
  updated_at: string;
  jobs?: {
    id: string;
    title: string;
    location: string;
    job_type: string;
    companies?: {
      id: string;
      name: string;
      logo_url: string | null;
    };
  };
  profiles?: {
    id: string;
    full_name: string | null;
    email: string;
    avatar_url: string | null;
  };
  candidate_profiles?: {
    headline: string | null;
    experience_years: number | null;
    resume_url: string | null;
  };
}

export function useCandidateApplications(candidateId?: string) {
  return useQuery({
    queryKey: ["candidate-applications", candidateId],
    queryFn: async () => {
      if (!candidateId) return [];

      const { data, error } = await supabase
        .from("applications")
        .select(`
          *,
          jobs (
            id,
            title,
            location,
            job_type,
            companies (
              id,
              name,
              logo_url
            )
          )
        `)
        .eq("candidate_id", candidateId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Application[];
    },
    enabled: !!candidateId,
  });
}

export function useRecruiterApplications(recruiterId?: string) {
  return useQuery({
    queryKey: ["recruiter-applications", recruiterId],
    queryFn: async () => {
      if (!recruiterId) return [];

      // First get jobs by this recruiter
      const { data: jobs, error: jobsError } = await supabase
        .from("jobs")
        .select("id")
        .eq("recruiter_id", recruiterId);

      if (jobsError) throw jobsError;
      if (!jobs || jobs.length === 0) return [];

      const jobIds = jobs.map((j) => j.id);

      const { data, error } = await supabase
        .from("applications")
        .select(`
          *,
          jobs (
            id,
            title,
            location,
            job_type
          )
        `)
        .in("job_id", jobIds)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch profiles separately
      const candidateIds = [...new Set(data.map(app => app.candidate_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name, email, avatar_url")
        .in("id", candidateIds);

      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);

      return data.map(app => ({
        ...app,
        profiles: profileMap.get(app.candidate_id) || null,
      })) as Application[];
    },
    enabled: !!recruiterId,
  });
}

export function useApplyToJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      job_id,
      candidate_id,
      cover_letter,
      resume_url,
    }: {
      job_id: string;
      candidate_id: string;
      cover_letter?: string;
      resume_url?: string;
    }) => {
      const { data, error } = await supabase
        .from("applications")
        .insert({
          job_id,
          candidate_id,
          cover_letter,
          resume_url,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidate-applications"] });
      toast.success("Application submitted successfully!");
    },
    onError: (error: Error) => {
      if (error.message.includes("duplicate")) {
        toast.error("You have already applied to this job");
      } else {
        toast.error("Failed to apply: " + error.message);
      }
    },
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("applications")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiter-applications"] });
      queryClient.invalidateQueries({ queryKey: ["candidate-applications"] });
      toast.success("Application status updated!");
    },
    onError: (error) => {
      toast.error("Failed to update status: " + error.message);
    },
  });
}
