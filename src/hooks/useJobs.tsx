import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Job {
  id: string;
  title: string;
  description: string;
  company_id: string;
  recruiter_id: string;
  location: string;
  job_type: string;
  experience_level: string | null;
  salary_min: number | null;
  salary_max: number | null;
  is_remote: boolean;
  status: string;
  deadline: string | null;
  created_at: string;
  updated_at: string;
  companies?: {
    id: string;
    name: string;
    logo_url: string | null;
    location: string | null;
  };
  job_skills?: {
    skills: {
      id: string;
      name: string;
    };
  }[];
}

export interface CreateJobData {
  title: string;
  description: string;
  company_id: string;
  location: string;
  job_type: string;
  experience_level?: string;
  salary_min?: number;
  salary_max?: number;
  is_remote?: boolean;
  deadline?: string;
  skill_ids?: string[];
}

export function useJobs(filters?: {
  search?: string;
  location?: string;
  job_type?: string[];
  experience_level?: string[];
}) {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: async () => {
      let query = supabase
        .from("jobs")
        .select(`
          *,
          companies (
            id,
            name,
            logo_url,
            location
          ),
          job_skills (
            skills (
              id,
              name
            )
          )
        `)
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (filters?.location) {
        query = query.ilike("location", `%${filters.location}%`);
      }

      if (filters?.job_type && filters.job_type.length > 0) {
        query = query.in("job_type", filters.job_type);
      }

      if (filters?.experience_level && filters.experience_level.length > 0) {
        query = query.in("experience_level", filters.experience_level);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Job[];
    },
  });
}

export function useRecruiterJobs(recruiterId?: string) {
  return useQuery({
    queryKey: ["recruiter-jobs", recruiterId],
    queryFn: async () => {
      if (!recruiterId) return [];

      const { data, error } = await supabase
        .from("jobs")
        .select(`
          *,
          companies (
            id,
            name,
            logo_url,
            location
          )
        `)
        .eq("recruiter_id", recruiterId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Job[];
    },
    enabled: !!recruiterId,
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateJobData & { recruiter_id: string }) => {
      const { skill_ids, ...jobData } = data;

      const { data: job, error } = await supabase
        .from("jobs")
        .insert(jobData)
        .select()
        .single();

      if (error) throw error;

      // Add skills if provided
      if (skill_ids && skill_ids.length > 0) {
        const jobSkills = skill_ids.map((skill_id) => ({
          job_id: job.id,
          skill_id,
        }));

        await supabase.from("job_skills").insert(jobSkills);
      }

      return job;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["recruiter-jobs"] });
      toast.success("Job posted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to post job: " + error.message);
    },
  });
}

export function useUpdateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<Job> & { id: string }) => {
      const { error } = await supabase
        .from("jobs")
        .update(data)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["recruiter-jobs"] });
      toast.success("Job updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update job: " + error.message);
    },
  });
}

export function useDeleteJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("jobs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["recruiter-jobs"] });
      toast.success("Job deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete job: " + error.message);
    },
  });
}
