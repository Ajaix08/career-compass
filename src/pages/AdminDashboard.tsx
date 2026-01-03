import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Home,
  Users,
  Building2,
  FileText,
  Settings,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Bell,
  BarChart3,
  Clock,
} from "lucide-react";

const AdminDashboard = () => {
  // Mock data
  const stats = [
    { label: "Total Users", value: "24,567", icon: Users, change: "+345 this week" },
    { label: "Active Jobs", value: "8,234", icon: Briefcase, change: "+156 today" },
    { label: "Companies", value: "1,890", icon: Building2, change: "+28 this month" },
    { label: "Applications", value: "156K", icon: FileText, change: "+2.4K today" },
  ];

  const pendingApprovals = [
    {
      id: "1",
      company: "TechStart Inc.",
      email: "hr@techstart.com",
      submittedAt: "2 hours ago",
      type: "Recruiter",
    },
    {
      id: "2",
      company: "Design Agency Pro",
      email: "careers@designagency.com",
      submittedAt: "5 hours ago",
      type: "Recruiter",
    },
    {
      id: "3",
      company: "Cloud Solutions Ltd",
      email: "jobs@cloudsolutions.io",
      submittedAt: "1 day ago",
      type: "Recruiter",
    },
  ];

  const reportedJobs = [
    {
      id: "1",
      title: "Work from home - Easy money",
      company: "Unknown",
      reports: 15,
      reason: "Suspected scam",
    },
    {
      id: "2",
      title: "Data Entry - No experience needed",
      company: "FastCash Inc",
      reports: 8,
      reason: "Misleading information",
    },
  ];

  const recentActivity = [
    { action: "New recruiter approved", user: "Admin John", time: "5 min ago" },
    { action: "Job posting removed", user: "Admin Sarah", time: "1 hour ago" },
    { action: "User account suspended", user: "Admin Mike", time: "2 hours ago" },
    { action: "Company verified", user: "Admin John", time: "3 hours ago" },
    { action: "Report resolved", user: "Admin Sarah", time: "4 hours ago" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive">
              <Shield className="h-5 w-5 text-destructive-foreground" />
            </div>
            <span>Admin Panel</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-light text-primary font-medium"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Users className="h-5 w-5" />
            Users
            <Badge className="ml-auto bg-warning text-warning-foreground text-xs">3</Badge>
          </Link>
          <Link
            to="/admin/companies"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Building2 className="h-5 w-5" />
            Companies
          </Link>
          <Link
            to="/admin/jobs"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <FileText className="h-5 w-5" />
            Job Postings
            <Badge className="ml-auto bg-destructive text-destructive-foreground text-xs">2</Badge>
          </Link>
          <Link
            to="/admin/analytics"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <BarChart3 className="h-5 w-5" />
            Analytics
          </Link>
          <Link
            to="/admin/reports"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <AlertTriangle className="h-5 w-5" />
            Reports
          </Link>
        </nav>

        <div className="p-4 border-t border-border">
          <Link
            to="/admin/settings"
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
              <h1 className="font-display text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Platform overview and management</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-secondary">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
              </button>
              <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-destructive" />
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

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Pending Approvals */}
            <div className="bg-card rounded-xl border border-border shadow-sm">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display font-semibold text-lg">Pending Approvals</h2>
                <Badge variant="outline" className="bg-warning-light text-warning border-warning/30">
                  {pendingApprovals.length} pending
                </Badge>
              </div>
              <div className="divide-y divide-border">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium">{item.company}</h3>
                        <p className="text-sm text-muted-foreground">{item.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{item.submittedAt}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <XCircle className="h-4 w-4 text-destructive" />
                        </Button>
                        <Button size="sm" className="h-8 w-8 p-0 bg-success hover:bg-success/90">
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reported Jobs */}
            <div className="bg-card rounded-xl border border-border shadow-sm">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display font-semibold text-lg">Reported Jobs</h2>
                <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
                  {reportedJobs.length} flagged
                </Badge>
              </div>
              <div className="divide-y divide-border">
                {reportedJobs.map((job) => (
                  <div key={job.id} className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-destructive">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <AlertTriangle className="h-3 w-3 text-warning" />
                          <span className="text-xs text-muted-foreground">
                            {job.reports} reports - {job.reason}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="destructive">
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card rounded-xl border border-border shadow-sm">
              <div className="p-6 border-b border-border">
                <h2 className="font-display font-semibold text-lg">Recent Activity</h2>
              </div>
              <div className="divide-y divide-border">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="p-4 flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        by {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Platform Health */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h2 className="font-display font-semibold text-lg mb-4">Platform Health</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Server Uptime</span>
                  <span className="text-sm font-medium text-success">99.9%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: "99.9%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">API Response</span>
                  <span className="text-sm font-medium text-success">45ms</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: "95%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Database Load</span>
                  <span className="text-sm font-medium text-warning">67%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-warning h-2 rounded-full" style={{ width: "67%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Storage Used</span>
                  <span className="text-sm font-medium text-primary">42%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "42%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
