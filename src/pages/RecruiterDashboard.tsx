import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

const RecruiterDashboard = () => {
  // Mock data
  const stats = [
    { label: "Active Jobs", value: "8", icon: Briefcase, change: "+2 this month" },
    { label: "Total Applications", value: "156", icon: FileText, change: "+34 this week" },
    { label: "New Candidates", value: "42", icon: Users, change: "+12 today" },
    { label: "Profile Views", value: "1.2K", icon: Eye, change: "+18% this month" },
  ];

  const recentJobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      type: "Full-time",
      applications: 45,
      views: 320,
      postedAt: "2 days ago",
      status: "Active",
    },
    {
      id: "2",
      title: "Product Designer",
      location: "Remote",
      type: "Full-time",
      applications: 32,
      views: 245,
      postedAt: "5 days ago",
      status: "Active",
    },
    {
      id: "3",
      title: "Backend Engineer",
      location: "New York, NY",
      type: "Full-time",
      applications: 28,
      views: 180,
      postedAt: "1 week ago",
      status: "Paused",
    },
  ];

  const recentApplicants = [
    {
      id: "1",
      name: "John Doe",
      role: "Senior Frontend Developer",
      experience: "5 years",
      appliedAt: "2 hours ago",
      match: 95,
    },
    {
      id: "2",
      name: "Jane Smith",
      role: "Product Designer",
      experience: "4 years",
      appliedAt: "4 hours ago",
      match: 88,
    },
    {
      id: "3",
      name: "Mike Johnson",
      role: "Senior Frontend Developer",
      experience: "6 years",
      appliedAt: "1 day ago",
      match: 92,
    },
    {
      id: "4",
      name: "Sarah Williams",
      role: "Backend Engineer",
      experience: "3 years",
      appliedAt: "1 day ago",
      match: 78,
    },
  ];

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
          <Link
            to="/recruiter/jobs"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <FileText className="h-5 w-5" />
            My Jobs
          </Link>
          <Link
            to="/recruiter/applicants"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Users className="h-5 w-5" />
            Applicants
            <Badge className="ml-auto bg-primary text-primary-foreground text-xs">12</Badge>
          </Link>
          <Link
            to="/recruiter/notifications"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Bell className="h-5 w-5" />
            Notifications
          </Link>
        </nav>

        <div className="p-4 border-t border-border space-y-1">
          <Link
            to="/recruiter/company"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Building2 className="h-5 w-5" />
            Company Profile
          </Link>
          <Link
            to="/recruiter/settings"
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
              <h1 className="font-display text-2xl font-bold">Recruiter Dashboard</h1>
              <p className="text-muted-foreground">Manage your job postings and applicants</p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/recruiter/post-job">
                <Button className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Post a Job
                </Button>
              </Link>
              <button className="relative p-2 rounded-lg hover:bg-secondary">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
              </button>
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
                <Link to="/recruiter/jobs" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>
              <div className="divide-y divide-border">
                {recentJobs.map((job) => (
                  <div key={job.id} className="p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium truncate">{job.title}</h3>
                          <Badge
                            variant="outline"
                            className={
                              job.status === "Active"
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
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {job.applications} applicants
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {job.views} views
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Applicants */}
            <div className="bg-card rounded-xl border border-border shadow-sm">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display font-semibold text-lg">Recent Applicants</h2>
                <Link to="/recruiter/applicants" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>
              <div className="divide-y divide-border">
                {recentApplicants.map((applicant) => (
                  <div key={applicant.id} className="p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium">{applicant.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          Applied for: {applicant.role}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {applicant.experience} exp
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {applicant.appliedAt}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="bg-success-light text-success border-success/30">
                          {applicant.match}% match
                        </Badge>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
              <Link to="/recruiter/applicants">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                  <Users className="h-6 w-6" />
                  <span>Review Applicants</span>
                </Button>
              </Link>
              <Link to="/recruiter/company">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                  <Building2 className="h-6 w-6" />
                  <span>Edit Company</span>
                </Button>
              </Link>
              <Link to="/recruiter/analytics">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>View Analytics</span>
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
