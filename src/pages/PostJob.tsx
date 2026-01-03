import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Briefcase, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCreateJob } from "@/hooks/useJobs";
import { useRecruiterCompany } from "@/hooks/useCompanies";
import { useSkills } from "@/hooks/useSkills";
import { toast } from "sonner";

const indianCities = [
  "Mumbai, Maharashtra",
  "Delhi, NCR",
  "Bangalore, Karnataka",
  "Hyderabad, Telangana",
  "Chennai, Tamil Nadu",
  "Pune, Maharashtra",
  "Kolkata, West Bengal",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Lucknow, Uttar Pradesh",
  "Chandigarh, Punjab",
  "Noida, Uttar Pradesh",
  "Gurgaon, Haryana",
  "Kochi, Kerala",
  "Indore, Madhya Pradesh",
  "Remote",
];

const PostJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: company, isLoading: companyLoading } = useRecruiterCompany(user?.id);
  const { data: skills } = useSkills();
  const createJob = useCreateJob();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    job_type: "",
    experience_level: "",
    salary_min: "",
    salary_max: "",
    is_remote: false,
    deadline: "",
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!company) {
      toast.error("Please create a company profile first");
      return;
    }

    if (!formData.title || !formData.description || !formData.location || !formData.job_type) {
      toast.error("Please fill in all required fields");
      return;
    }

    createJob.mutate(
      {
        title: formData.title,
        description: formData.description,
        company_id: company.id,
        recruiter_id: user!.id,
        location: formData.location,
        job_type: formData.job_type,
        experience_level: formData.experience_level || undefined,
        salary_min: formData.salary_min ? parseInt(formData.salary_min) : undefined,
        salary_max: formData.salary_max ? parseInt(formData.salary_max) : undefined,
        is_remote: formData.is_remote,
        deadline: formData.deadline || undefined,
        skill_ids: selectedSkills,
      },
      {
        onSuccess: () => {
          navigate("/recruiter/dashboard");
        },
      }
    );
  };

  const toggleSkill = (skillId: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]
    );
  };

  if (companyLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Company Profile Required</h1>
          <p className="text-muted-foreground mb-6">
            You need to create a company profile before posting jobs.
          </p>
          <Link to="/recruiter/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl py-8">
        {/* Back Link */}
        <Link
          to="/recruiter/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Post a New Job</h1>
          <p className="text-muted-foreground">
            Fill in the details below to create a new job posting for {company.name}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <h2 className="font-display font-semibold text-lg">Basic Information</h2>

            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                placeholder="e.g. Senior Software Engineer"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the role, responsibilities, and requirements..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={8}
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="job_type">Job Type *</Label>
                <Select
                  value={formData.job_type}
                  onValueChange={(value) => setFormData({ ...formData, job_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="is_remote"
                checked={formData.is_remote}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_remote: checked as boolean })
                }
              />
              <Label htmlFor="is_remote" className="font-normal cursor-pointer">
                This is a remote/work from home position
              </Label>
            </div>
          </div>

          {/* Experience & Salary */}
          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <h2 className="font-display font-semibold text-lg">Experience & Compensation</h2>

            <div className="space-y-2">
              <Label htmlFor="experience_level">Experience Level</Label>
              <Select
                value={formData.experience_level}
                onValueChange={(value) => setFormData({ ...formData, experience_level: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Fresher (0-1 years)</SelectItem>
                  <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                  <SelectItem value="senior">Senior (5+ years)</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary_min">Minimum CTC (₹/year)</Label>
                <Input
                  id="salary_min"
                  type="number"
                  placeholder="e.g. 600000"
                  value={formData.salary_min}
                  onChange={(e) => setFormData({ ...formData, salary_min: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Enter in rupees (e.g. 600000 for 6 LPA)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary_max">Maximum CTC (₹/year)</Label>
                <Input
                  id="salary_max"
                  type="number"
                  placeholder="e.g. 1200000"
                  value={formData.salary_max}
                  onChange={(e) => setFormData({ ...formData, salary_max: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Enter in rupees (e.g. 1200000 for 12 LPA)</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Application Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>
          </div>

          {/* Skills */}
          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <h2 className="font-display font-semibold text-lg">Required Skills</h2>
            <p className="text-sm text-muted-foreground">
              Select the skills required for this position
            </p>

            {selectedSkills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skillId) => {
                  const skill = skills?.find((s) => s.id === skillId);
                  return (
                    <Badge key={skillId} variant="secondary" className="gap-1">
                      {skill?.name}
                      <button type="button" onClick={() => toggleSkill(skillId)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {skills
                ?.filter((s) => !selectedSkills.includes(s.id))
                .map((skill) => (
                  <Badge
                    key={skill.id}
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary"
                    onClick={() => toggleSkill(skill.id)}
                  >
                    + {skill.name}
                  </Badge>
                ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/recruiter/dashboard")}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={createJob.isPending}>
              {createJob.isPending ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
