import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Home,
  Search,
  FileText,
  Bookmark,
  Bell,
  Settings,
  User,
  TrendingUp,
  Clock,
  Building2,
  MapPin,
  Calendar,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCandidateApplications } from "@/hooks/useApplications";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import { useJobs } from "@/hooks/useJobs";
import { formatDistanceToNow } from "date-fns";

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: applications, isLoading: applicationsLoading } = useCandidateApplications(user?.id);
  const { data: savedJobs, isLoading: savedJobsLoading } = useSavedJobs(user?.id);
  const { data: allJobs } = useJobs();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const stats = [
    {
      label: "Applications",
      value: applications?.length || 0,
      icon: FileText,
      change: `${applications?.filter((a) => new Date(a.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length || 0} this week`,
    },
    {
      label: "Saved Jobs",
      value: savedJobs?.length || 0,
      icon: Bookmark,
      change: "Browse more",
    },
    {
      label: "Available Jobs",
      value: allJobs?.length || 0,
      icon: TrendingUp,
      change: "New opportunities",
    },
    {
      label: "Interviews",
      value: applications?.filter((a) => a.status === "interview").length || 0,
      icon: Calendar,
      change: "Scheduled",
    },
  ];

  const statusColors: Record<string, string> = {
    applied: "bg-primary-light text-primary",
    reviewing: "bg-warning-light text-warning",
    shortlisted: "bg-success-light text-success",
    interview: "bg-primary-light text-primary",
    offered: "bg-success-light text-success",
    rejected: "bg-destructive/10 text-destructive",
    withdrawn: "bg-muted text-muted-foreground",
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
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-light text-primary font-medium"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/jobs"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Search className="h-5 w-5" />
            Find Jobs
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
              <h1 className="font-display text-2xl font-bold">
                Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""}!
              </h1>
              <p className="text-muted-foreground">Here's what's happening with your job search</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
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
            {/* Recent Applications */}
            <div className="bg-card rounded-xl border border-border shadow-sm">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display font-semibold text-lg">Recent Applications</h2>
              </div>
              <div className="divide-y divide-border">
                {applicationsLoading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : applications && applications.length > 0 ? (
                  applications.slice(0, 5).map((app) => (
                    <div key={app.id} className="p-4 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{app.jobs?.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Building2 className="h-4 w-4" />
                            <span>{app.jobs?.companies?.name}</span>
                            <span>•</span>
                            <MapPin className="h-4 w-4" />
                            <span>{app.jobs?.location}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              Applied {formatDistanceToNow(new Date(app.created_at), { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                        <Badge className={statusColors[app.status] || statusColors.applied}>
                          {app.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <p>No applications yet</p>
                    <Link to="/jobs">
                      <Button variant="outline" className="mt-4">
                        Browse Jobs
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Saved Jobs */}
            <div className="bg-card rounded-xl border border-border shadow-sm">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display font-semibold text-lg">Saved Jobs</h2>
                <Link to="/jobs" className="text-sm text-primary hover:underline">
                  Find more
                </Link>
              </div>
              <div className="divide-y divide-border">
                {savedJobsLoading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : savedJobs && savedJobs.length > 0 ? (
                  savedJobs.slice(0, 5).map((saved: any) => (
                    <div key={saved.id} className="p-4 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{saved.jobs?.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Building2 className="h-4 w-4" />
                            <span>{saved.jobs?.companies?.name}</span>
                            <span>•</span>
                            <MapPin className="h-4 w-4" />
                            <span>{saved.jobs?.location}</span>
                          </div>
                        </div>
                        <Link to={`/jobs/${saved.job_id}`}>
                          <Button size="sm">View</Button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <p>No saved jobs</p>
                    <Link to="/jobs">
                      <Button variant="outline" className="mt-4">
                        Browse Jobs
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CandidateDashboard;
