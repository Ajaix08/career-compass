import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Trash2, Check } from "lucide-react";
import { useResumeUpload, useCandidateProfile, useDeleteResume } from "@/hooks/useResume";
import { useAuth } from "@/hooks/useAuth";

const ResumeUpload = () => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadResume, uploading } = useResumeUpload();
  const { data: profile } = useCandidateProfile(user?.id);
  const deleteResume = useDeleteResume();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      try {
        await uploadResume(file, user.id);
      } catch (error: any) {
        console.error(error);
      }
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = () => {
    if (user) {
      deleteResume.mutate(user.id);
    }
  };

  const hasResume = !!profile?.resume_url;

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-lg bg-primary-light">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold">Resume</h3>
          <p className="text-sm text-muted-foreground">
            {hasResume ? "Your resume is uploaded" : "Upload your resume (PDF, max 5MB)"}
          </p>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,application/pdf"
        className="hidden"
      />

      <div className="flex gap-2">
        {hasResume ? (
          <>
            <div className="flex items-center gap-2 text-sm text-success bg-success-light px-3 py-2 rounded-lg flex-1">
              <Check className="h-4 w-4" />
              Resume uploaded
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Uploading..." : "Replace"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              disabled={deleteResume.isPending}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? "Uploading..." : "Upload Resume"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;
