import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Clock,
  IndianRupee,
  Briefcase,
  Bookmark,
  Share2,
  CheckCircle2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useApplyToJob } from "@/hooks/useApplications";
import { useSaveJob, useSavedJobs } from "@/hooks/useSavedJobs";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");

  const { data: job, isLoading } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select(`
          *,
          companies (
            id,
            name,
            logo_url,
            description,
            location,
            website,
            industry,
            size
          ),
          job_skills (
            skills (
              id,
              name
            )
          )
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: savedJobs } = useSavedJobs(user?.id);
  const saveJob = useSaveJob();
  const applyToJob = useApplyToJob();

  const { data: existingApplication } = useQuery({
    queryKey: ["application-check", id, user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase
        .from("applications")
        .select("id, status")
        .eq("job_id", id)
        .eq("candidate_id", user.id)
        .maybeSingle();
      return data;
    },
    enabled: !!id && !!user,
  });

  const isSaved = savedJobs?.some((sj) => sj.job_id === id);
  const hasApplied = !!existingApplication;

  const handleSaveJob = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    saveJob.mutate({ user_id: user.id, job_id: id! });
  };

  const handleApply = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    applyToJob.mutate(
      {
        job_id: id!,
        candidate_id: user.id,
        cover_letter: coverLetter || undefined,
      },
      {
        onSuccess: () => {
          setIsApplyOpen(false);
          setCoverLetter("");
        },
      }
    );
  };

  const formatSalary = (min?: number | null, max?: number | null) => {
    if (!min && !max) return null;
    if (min && max) return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L per annum`;
    if (min) return `₹${(min / 100000).toFixed(1)}L+ per annum`;
    if (max) return `Up to ₹${(max / 100000).toFixed(1)}L per annum`;
    return null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-secondary rounded w-1/3"></div>
            <div className="h-4 bg-secondary rounded w-1/2"></div>
            <div className="h-64 bg-secondary rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Job not found</h1>
            <Link to="/jobs">
              <Button>Browse Jobs</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const skills = job.job_skills?.map((js: any) => js.skills.name) || [];
  const salary = formatSalary(job.salary_min, job.salary_max);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container py-8">
          {/* Back Button */}
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to jobs
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="font-display text-2xl font-bold">{job.title}</h1>
                      <Badge variant="outline" className="capitalize">{job.job_type}</Badge>
                      {job.is_remote && <Badge className="bg-success-light text-success border-0">Remote</Badge>}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {job.companies?.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Posted {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={handleSaveJob}>
                      <Bookmark className={`h-5 w-5 ${isSaved ? "fill-primary text-primary" : ""}`} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        toast.success("Link copied!");
                      }}
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {salary && (
                  <div className="flex items-center gap-2 mt-4 text-lg font-semibold text-primary">
                    <IndianRupee className="h-5 w-5" />
                    {salary}
                  </div>
                )}

                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {skills.map((skill: string) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-display text-lg font-semibold mb-4">Job Description</h2>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p className="whitespace-pre-wrap">{job.description}</p>
                </div>
              </div>

              {/* Job Details */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-display text-lg font-semibold mb-4">Job Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-light">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Job Type</p>
                      <p className="font-medium capitalize">{job.job_type}</p>
                    </div>
                  </div>
                  {job.experience_level && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary-light">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Experience Level</p>
                        <p className="font-medium capitalize">{job.experience_level}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-light">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{job.location}</p>
                    </div>
                  </div>
                  {job.deadline && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary-light">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Application Deadline</p>
                        <p className="font-medium">{new Date(job.deadline).toLocaleDateString('en-IN')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                {hasApplied ? (
                  <div className="text-center">
                    <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-3" />
                    <h3 className="font-semibold mb-1">Already Applied</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Status: <span className="capitalize">{existingApplication?.status}</span>
                    </p>
                    <Link to="/dashboard">
                      <Button variant="outline" className="w-full">
                        View Application
                      </Button>
                    </Link>
                  </div>
                ) : role === "candidate" || !user ? (
                  <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full" size="lg">
                        Apply Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Apply for {job.title}</DialogTitle>
                        <DialogDescription>
                          Submit your application to {job.companies?.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                          <Textarea
                            id="coverLetter"
                            placeholder="Tell us why you're interested in this position..."
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            rows={6}
                          />
                        </div>
                        <Button
                          className="w-full"
                          onClick={handleApply}
                          disabled={applyToJob.isPending}
                        >
                          {applyToJob.isPending ? "Submitting..." : "Submit Application"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <p className="text-center text-muted-foreground">
                    Only candidates can apply to jobs
                  </p>
                )}

                {!user && (
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>{" "}
                    to apply for this job
                  </p>
                )}
              </div>

              {/* Company Info */}
              {job.companies && (
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-display font-semibold mb-4">About the Company</h3>
                  <div className="space-y-3">
                    <p className="font-medium">{job.companies.name}</p>
                    {job.companies.industry && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Industry:</span> {job.companies.industry}
                      </p>
                    )}
                    {job.companies.size && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Company Size:</span> {job.companies.size}
                      </p>
                    )}
                    {job.companies.location && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Location:</span> {job.companies.location}
                      </p>
                    )}
                    {job.companies.description && (
                      <p className="text-sm text-muted-foreground">{job.companies.description}</p>
                    )}
                    {job.companies.website && (
                      <a
                        href={job.companies.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobDetails;
