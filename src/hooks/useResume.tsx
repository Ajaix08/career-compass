import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useResumeUpload = () => {
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  const uploadResume = async (file: File, userId: string) => {
    if (!file || !userId) {
      throw new Error("File and user ID are required");
    }

    if (file.type !== "application/pdf") {
      throw new Error("Only PDF files are allowed");
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File size must be less than 5MB");
    }

    setUploading(true);

    try {
      const fileName = `${userId}/resume.pdf`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(fileName, file, {
          upsert: true,
          contentType: "application/pdf",
        });

      if (uploadError) throw uploadError;

      // Get the URL
      const { data: urlData } = supabase.storage
        .from("resumes")
        .getPublicUrl(fileName);

      // Update candidate profile with resume URL
      const { error: updateError } = await supabase
        .from("candidate_profiles")
        .update({ resume_url: fileName })
        .eq("user_id", userId);

      if (updateError) throw updateError;

      queryClient.invalidateQueries({ queryKey: ["candidate-profile"] });
      toast.success("Resume uploaded successfully");
      
      return fileName;
    } finally {
      setUploading(false);
    }
  };

  return { uploadResume, uploading };
};

export const useCandidateProfile = (userId?: string) => {
  return useQuery({
    queryKey: ["candidate-profile", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("candidate_profiles")
        .select("*")
        .eq("user_id", userId!)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};

export const useResumeDownload = () => {
  const downloadResume = async (resumePath: string) => {
    if (!resumePath) {
      toast.error("No resume available");
      return;
    }

    try {
      const { data, error } = await supabase.storage
        .from("resumes")
        .download(resumePath);

      if (error) throw error;

      // Create download link
      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Resume downloaded");
    } catch (error: any) {
      toast.error("Failed to download resume");
      console.error(error);
    }
  };

  return { downloadResume };
};

export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const fileName = `${userId}/resume.pdf`;
      
      // Delete from storage
      const { error: deleteError } = await supabase.storage
        .from("resumes")
        .remove([fileName]);

      if (deleteError) throw deleteError;

      // Clear resume_url from profile
      const { error: updateError } = await supabase
        .from("candidate_profiles")
        .update({ resume_url: null })
        .eq("user_id", userId);

      if (updateError) throw updateError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidate-profile"] });
      toast.success("Resume deleted");
    },
    onError: (error: any) => {
      toast.error("Failed to delete resume");
      console.error(error);
    },
  });
};
