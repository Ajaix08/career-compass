import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Company {
  id: string;
  name: string;
  description: string | null;
  website: string | null;
  logo_url: string | null;
  location: string | null;
  industry: string | null;
  size: string | null;
  owner_id: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export function useCompanies() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .order("name");

      if (error) throw error;
      return data as Company[];
    },
  });
}

export function useRecruiterCompany(ownerId?: string) {
  return useQuery({
    queryKey: ["recruiter-company", ownerId],
    queryFn: async () => {
      if (!ownerId) return null;

      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .eq("owner_id", ownerId)
        .maybeSingle();

      if (error) throw error;
      return data as Company | null;
    },
    enabled: !!ownerId,
  });
}

export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Company, "id" | "created_at" | "updated_at" | "is_verified">) => {
      const { data: company, error } = await supabase
        .from("companies")
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return company;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["recruiter-company"] });
      toast.success("Company created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create company: " + error.message);
    },
  });
}

export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<Company> & { id: string }) => {
      const { error } = await supabase
        .from("companies")
        .update(data)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["recruiter-company"] });
      toast.success("Company updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update company: " + error.message);
    },
  });
}
