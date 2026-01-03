import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import { useJobs } from "@/hooks/useJobs";

const FeaturedJobs = () => {
  const { data: jobs, isLoading } = useJobs();

  const formatSalary = (min?: number | null, max?: number | null) => {
    if (!min && !max) return null;
    if (min && max) return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L`;
    if (min) return `₹${(min / 100000).toFixed(1)}L+`;
    return null;
  };

  const displayJobs = jobs?.slice(0, 6) || [];

  // Fallback jobs with Indian data if no real jobs exist
  const fallbackJobs = [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "Tata Consultancy Services",
      location: "Mumbai, Maharashtra",
      salary: "₹18L - ₹25L",
      type: "Full-time",
      skills: ["Java", "Spring Boot", "Microservices", "AWS"],
    },
    {
      id: "2",
      title: "Product Manager",
      company: "Flipkart",
      location: "Bangalore, Karnataka",
      salary: "₹25L - ₹35L",
      type: "Full-time",
      skills: ["Product Strategy", "Agile", "Data Analytics", "SQL"],
    },
    {
      id: "3",
      title: "Data Scientist",
      company: "Infosys",
      location: "Hyderabad, Telangana",
      salary: "₹15L - ₹22L",
      type: "Full-time",
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    },
    {
      id: "4",
      title: "Frontend Developer",
      company: "Razorpay",
      location: "Bangalore, Karnataka",
      salary: "₹12L - ₹20L",
      type: "Full-time",
      skills: ["React", "TypeScript", "Next.js", "CSS"],
    },
    {
      id: "5",
      title: "DevOps Engineer",
      company: "Wipro",
      location: "Pune, Maharashtra",
      salary: "₹14L - ₹22L",
      type: "Full-time",
      skills: ["Docker", "Kubernetes", "AWS", "Jenkins"],
    },
    {
      id: "6",
      title: "Business Analyst Intern",
      company: "HDFC Bank",
      location: "Delhi, NCR",
      salary: "₹25K/month",
      type: "Internship",
      skills: ["Excel", "SQL", "PowerBI", "Communication"],
    },
  ];

  const jobsToShow = displayJobs.length > 0 ? displayJobs : null;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Featured Opportunities
            </h2>
            <p className="text-muted-foreground">
              Discover top jobs from leading Indian companies
            </p>
          </div>
          <Link to="/jobs">
            <Button variant="outline" className="gap-2">
              View All Jobs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-6 animate-pulse">
                <div className="h-6 bg-secondary rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-secondary rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-secondary rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : jobsToShow ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobsToShow.map((job, index) => (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="group bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-primary/50 transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary-light flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline" className="capitalize">{job.job_type}</Badge>
                </div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  {job.title}
                </h3>
                <p className="text-muted-foreground mb-2">{job.companies?.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                {formatSalary(job.salary_min, job.salary_max) && (
                  <p className="text-primary font-medium">{formatSalary(job.salary_min, job.salary_max)}</p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fallbackJobs.map((job, index) => (
              <Link
                key={job.id}
                to="/jobs"
                className="group bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-primary/50 transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary-light flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline">{job.type}</Badge>
                </div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  {job.title}
                </h3>
                <p className="text-muted-foreground mb-2">{job.company}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <p className="text-primary font-medium">{job.salary}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedJobs;
