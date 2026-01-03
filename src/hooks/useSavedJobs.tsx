import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useSavedJobs(userId?: string) {
  return useQuery({
    queryKey: ["saved-jobs", userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from("saved_jobs")
        .select(`
          *,
          jobs (
            *,
            companies (
              id,
              name,
              logo_url
            )
          )
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
}

export function useSaveJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user_id, job_id }: { user_id: string; job_id: string }) => {
      const { error } = await supabase.from("saved_jobs").insert({
        user_id,
        job_id,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-jobs"] });
      toast.success("Job saved!");
    },
    onError: (error: Error) => {
      if (error.message.includes("duplicate")) {
        toast.info("Job already saved");
      } else {
        toast.error("Failed to save job");
      }
    },
  });
}

export function useUnsaveJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user_id, job_id }: { user_id: string; job_id: string }) => {
      const { error } = await supabase
        .from("saved_jobs")
        .delete()
        .eq("user_id", user_id)
        .eq("job_id", job_id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-jobs"] });
      toast.success("Job removed from saved");
    },
    onError: () => {
      toast.error("Failed to remove job");
    },
  });
}
