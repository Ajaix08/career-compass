import { Link } from "react-router-dom";
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
  CheckCircle2,
  XCircle,
  Building2,
  MapPin,
  Calendar,
} from "lucide-react";

const CandidateDashboard = () => {
  // Mock data
  const stats = [
    { label: "Applications", value: "12", icon: FileText, change: "+3 this week" },
    { label: "Saved Jobs", value: "8", icon: Bookmark, change: "+2 new matches" },
    { label: "Profile Views", value: "45", icon: TrendingUp, change: "+12% this month" },
    { label: "Interviews", value: "3", icon: Calendar, change: "2 upcoming" },
  ];

  const recentApplications = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      appliedAt: "2 days ago",
      status: "Under Review",
    },
    {
      id: "2",
      title: "Product Designer",
      company: "Design Studio",
      location: "Remote",
      appliedAt: "5 days ago",
      status: "Shortlisted",
    },
    {
      id: "3",
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "New York, NY",
      appliedAt: "1 week ago",
      status: "Rejected",
    },
  ];

  const recommendedJobs = [
    {
      id: "1",
      title: "React Developer",
      company: "InnovateTech",
      location: "Remote",
      salary: "$100K - $130K",
      match: 95,
    },
    {
      id: "2",
      title: "Frontend Engineer",
      company: "CloudFirst",
      location: "Austin, TX",
      salary: "$110K - $140K",
      match: 88,
    },
    {
      id: "3",
      title: "UI Developer",
      company: "PixelPerfect",
      location: "Seattle, WA",
      salary: "$90K - $120K",
      match: 82,
    },
  ];

  const statusColors = {
    "Under Review": "bg-warning-light text-warning",
    "Shortlisted": "bg-success-light text-success",
    "Rejected": "bg-destructive/10 text-destructive",
    "Interview": "bg-primary-light text-primary",
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
          <Link
            to="/applications"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <FileText className="h-5 w-5" />
            Applications
          </Link>
          <Link
            to="/saved-jobs"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Bookmark className="h-5 w-5" />
            Saved Jobs
          </Link>
          <Link
            to="/notifications"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Bell className="h-5 w-5" />
            Notifications
            <Badge className="ml-auto bg-primary text-primary-foreground text-xs">3</Badge>
          </Link>
        </nav>

        <div className="p-4 border-t border-border space-y-1">
          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <User className="h-5 w-5" />
            Profile
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold">Welcome back, John!</h1>
              <p className="text-muted-foreground">Here's what's happening with your job search</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-secondary">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
              </button>
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
                <Link to="/applications" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>
              <div className="divide-y divide-border">
                {recentApplications.map((app) => (
                  <div key={app.id} className="p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{app.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Building2 className="h-4 w-4" />
                          <span>{app.company}</span>
                          <span>•</span>
                          <MapPin className="h-4 w-4" />
                          <span>{app.location}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Applied {app.appliedAt}</span>
                        </div>
                      </div>
                      <Badge className={statusColors[app.status as keyof typeof statusColors]}>
                        {app.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Jobs */}
            <div className="bg-card rounded-xl border border-border shadow-sm">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display font-semibold text-lg">Recommended for You</h2>
                <Link to="/jobs" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>
              <div className="divide-y divide-border">
                {recommendedJobs.map((job) => (
                  <div key={job.id} className="p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{job.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Building2 className="h-4 w-4" />
                          <span>{job.company}</span>
                          <span>•</span>
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{job.salary}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="bg-success-light text-success border-success/30">
                          {job.match}% match
                        </Badge>
                        <Button size="sm" className="mt-2">
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg">Complete Your Profile</h2>
              <span className="text-sm text-muted-foreground">75% complete</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 mb-4">
              <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }} />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>Basic Info</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>Resume Uploaded</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>Skills Added</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <XCircle className="h-4 w-4" />
                <span>Add Experience</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CandidateDashboard;
