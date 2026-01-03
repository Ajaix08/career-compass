import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  Home,
  PlusCircle,
  FileText,
  Users,
  Bell,
  Settings,
  Building2,
  TrendingUp,
  Eye,
  Clock,
  MapPin,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRecruiterJobs, useUpdateJob } from "@/hooks/useJobs";
import { useRecruiterApplications, useUpdateApplicationStatus } from "@/hooks/useApplications";
import { useRecruiterCompany } from "@/hooks/useCompanies";
import { formatDistanceToNow } from "date-fns";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: company } = useRecruiterCompany(user?.id);
  const { data: jobs, isLoading: jobsLoading } = useRecruiterJobs(user?.id);
  const { data: applications, isLoading: applicationsLoading } = useRecruiterApplications(user?.id);
  const updateJob = useUpdateJob();
  const updateApplicationStatus = useUpdateApplicationStatus();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const stats = [
    {
      label: "Active Jobs",
      value: jobs?.filter((j) => j.status === "active").length || 0,
      icon: Briefcase,
      change: "Posted jobs",
    },
    {
      label: "Total Applications",
      value: applications?.length || 0,
      icon: FileText,
      change: "All applications",
    },
    {
      label: "New Candidates",
      value: applications?.filter((a) => a.status === "applied").length || 0,
      icon: Users,
      change: "Pending review",
    },
    {
      label: "Interviews",
      value: applications?.filter((a) => a.status === "interview").length || 0,
      icon: Eye,
      change: "Scheduled",
    },
  ];

  const handleStatusChange = (applicationId: string, status: string) => {
    updateApplicationStatus.mutate({ id: applicationId, status });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg">
              <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>
            <span>JobConnect</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            to="/recruiter/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-light text-primary font-medium"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/recruiter/post-job"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            Post a Job
          </Link>
        </nav>

        <div className="p-4 border-t border-border space-y-1">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors w-full"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold">Recruiter Dashboard</h1>
              <p className="text-muted-foreground">
                {company ? company.name : "Manage your job postings and applicants"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/recruiter/post-job">
                <Button className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Post a Job
                </Button>
              </Link>
              <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-card rounded-xl border border-border p-6 shadow-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-display font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary-light">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Job Postings */}
            <div className="bg-card rounded-xl border border-border shadow-sm">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display font-semibold text-lg">Recent Job Postings</h2>
                <Link to="/recruiter/post-job" className="text-sm text-primary hover:underline">
                  Post new
                </Link>
              </div>
              <div className="divide-y divide-border">
                {jobsLoading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : jobs && jobs.length > 0 ? (
                  jobs.slice(0, 5).map((job) => {
                    const jobApplications = applications?.filter((a) => a.job_id === job.id) || [];
                    return (
                      <div key={job.id} className="p-4 hover:bg-secondary/50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium truncate">{job.title}</h3>
                              <Badge
                                variant="outline"
                                className={
                                  job.status === "active"
                                    ? "bg-success-light text-success border-success/30"
                                    : "bg-warning-light text-warning border-warning/30"
                                }
                              >
                                {job.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                              <span>•</span>
                              <span className="capitalize">{job.job_type}</span>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {jobApplications.length} applicants
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateJob.mutate({
                                id: job.id,
                                status: job.status === "active" ? "closed" : "active",
                              })
                            }
                          >
                            {job.status === "active" ? "Close" : "Reopen"}
                          </Button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <p>No jobs posted yet</p>
                    <Link to="/recruiter/post-job">
                      <Button className="mt-4">Post Your First Job</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Applicants */}
            <div className="bg-card rounded-xl border border-border shadow-sm">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display font-semibold text-lg">Recent Applicants</h2>
              </div>
              <div className="divide-y divide-border">
                {applicationsLoading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : applications && applications.length > 0 ? (
                  applications.slice(0, 5).map((applicant) => (
                    <div key={applicant.id} className="p-4 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium">
                            {applicant.profiles?.full_name || applicant.profiles?.email || "Candidate"}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            Applied for: {applicant.jobs?.title}
                          </p>
                          <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(new Date(applicant.created_at), { addSuffix: true })}
                          </span>
                        </div>
                        <Select
                          value={applicant.status}
                          onValueChange={(value) => handleStatusChange(applicant.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="applied">Applied</SelectItem>
                            <SelectItem value="reviewing">Reviewing</SelectItem>
                            <SelectItem value="shortlisted">Shortlisted</SelectItem>
                            <SelectItem value="interview">Interview</SelectItem>
                            <SelectItem value="offered">Offered</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <p>No applications yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h2 className="font-display font-semibold text-lg mb-4">Quick Actions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/recruiter/post-job">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                  <PlusCircle className="h-6 w-6" />
                  <span>Post New Job</span>
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                  <Eye className="h-6 w-6" />
                  <span>View All Jobs</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;
