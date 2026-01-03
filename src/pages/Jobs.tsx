import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/jobs/SearchBar";
import JobCard from "@/components/jobs/JobCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter, X } from "lucide-react";

const Jobs = () => {
  const [showFilters, setShowFilters] = useState(false);

  // Mock data
  const jobs = [
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
    {
      id: "7",
      title: "DevOps Engineer",
      company: "InfraCloud",
      location: "Remote",
      salary: "$125K - $165K",
      type: "Remote" as const,
      postedAt: "2 days ago",
      skills: ["Kubernetes", "Terraform", "CI/CD", "AWS"],
      isNew: true,
    },
    {
      id: "8",
      title: "UX Researcher",
      company: "UserFirst",
      location: "Boston, MA",
      salary: "$85K - $120K",
      type: "Full-time" as const,
      postedAt: "6 days ago",
      skills: ["User Research", "Usability Testing", "Interviews", "Analytics"],
    },
  ];

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];
  const experienceLevels = ["Entry Level", "Mid Level", "Senior", "Lead", "Executive"];
  const salaryRanges = ["$0 - $50K", "$50K - $100K", "$100K - $150K", "$150K+"];

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Job Type */}
      <div>
        <h3 className="font-medium mb-3">Job Type</h3>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <div key={type} className="flex items-center gap-2">
              <Checkbox id={`type-${type}`} />
              <Label htmlFor={`type-${type}`} className="text-sm font-normal cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div>
        <h3 className="font-medium mb-3">Experience Level</h3>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <div key={level} className="flex items-center gap-2">
              <Checkbox id={`exp-${level}`} />
              <Label htmlFor={`exp-${level}`} className="text-sm font-normal cursor-pointer">
                {level}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div>
        <h3 className="font-medium mb-3">Salary Range</h3>
        <div className="space-y-2">
          {salaryRanges.map((range) => (
            <div key={range} className="flex items-center gap-2">
              <Checkbox id={`salary-${range}`} />
              <Label htmlFor={`salary-${range}`} className="text-sm font-normal cursor-pointer">
                {range}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Search Header */}
        <section className="bg-card border-b border-border py-8">
          <div className="container">
            <h1 className="font-display text-3xl font-bold mb-6">Find Your Dream Job</h1>
            <SearchBar />

            {/* Active Filters */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Filters:</span>
              <Badge variant="secondary" className="gap-1">
                Remote
                <button className="hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
              <Badge variant="secondary" className="gap-1">
                Full-time
                <button className="hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container py-8">
          <div className="flex gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-card rounded-xl border border-border p-6">
                <h2 className="font-display font-semibold text-lg mb-4">Filters</h2>
                <FiltersContent />
              </div>
            </aside>

            {/* Job Listings */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{jobs.length}</span> jobs
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <div className="lg:hidden bg-card rounded-xl border border-border p-6 mb-6 animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-semibold text-lg">Filters</h2>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <FiltersContent />
                </div>
              )}

              {/* Job Cards */}
              <div className="space-y-4">
                {jobs.map((job, index) => (
                  <div
                    key={job.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <JobCard {...job} />
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="mt-8 text-center">
                <Button variant="outline" size="lg">
                  Load More Jobs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;
