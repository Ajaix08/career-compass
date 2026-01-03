import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/jobs/JobCard";
import { ArrowRight } from "lucide-react";

const FeaturedJobs = () => {
  // Mock data - will be replaced with API data
  const featuredJobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120K - $160K",
      type: "Full-time" as const,
      postedAt: "2 days ago",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      isNew: true,
    },
    {
      id: "2",
      title: "Product Designer",
      company: "Design Studio",
      location: "Remote",
      salary: "$90K - $130K",
      type: "Remote" as const,
      postedAt: "3 days ago",
      skills: ["Figma", "UI/UX", "Design Systems", "Prototyping"],
    },
    {
      id: "3",
      title: "Data Science Intern",
      company: "DataFlow Analytics",
      location: "New York, NY",
      salary: "$25/hr",
      type: "Internship" as const,
      postedAt: "1 week ago",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
      isNew: true,
    },
    {
      id: "4",
      title: "Backend Engineer",
      company: "CloudScale",
      location: "Austin, TX",
      salary: "$130K - $170K",
      type: "Full-time" as const,
      postedAt: "5 days ago",
      skills: ["Node.js", "PostgreSQL", "AWS", "Docker"],
    },
    {
      id: "5",
      title: "Marketing Manager",
      company: "GrowthHub",
      location: "Chicago, IL",
      salary: "$80K - $110K",
      type: "Full-time" as const,
      postedAt: "1 week ago",
      skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
    },
    {
      id: "6",
      title: "Mobile Developer",
      company: "AppWorks",
      location: "Seattle, WA",
      salary: "$110K - $145K",
      type: "Contract" as const,
      postedAt: "4 days ago",
      skills: ["React Native", "iOS", "Android", "TypeScript"],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Featured Opportunities
            </h2>
            <p className="text-muted-foreground">
              Discover top jobs from leading companies
            </p>
          </div>
          <Link to="/jobs">
            <Button variant="outline" className="gap-2">
              View All Jobs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job, index) => (
            <div
              key={job.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <JobCard {...job} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
