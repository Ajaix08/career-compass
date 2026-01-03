import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/jobs/SearchBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter, X, MapPin, Building2, Clock, Bookmark } from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import { useSaveJob, useSavedJobs } from "@/hooks/useSavedJobs";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";

const Jobs = () => {
  const { user, role } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<string[]>([]);

  const { data: jobs, isLoading } = useJobs({
    search: searchQuery,
    location: locationQuery,
    job_type: selectedJobTypes.length > 0 ? selectedJobTypes : undefined,
    experience_level: selectedExperienceLevels.length > 0 ? selectedExperienceLevels : undefined,
  });

  const { data: savedJobs } = useSavedJobs(user?.id);
  const saveJob = useSaveJob();

  const savedJobIds = new Set(savedJobs?.map((sj) => sj.job_id) || []);

  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setLocationQuery(location);
  };

  const toggleJobType = (type: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleExperienceLevel = (level: string) => {
    setSelectedExperienceLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const clearFilters = () => {
    setSelectedJobTypes([]);
    setSelectedExperienceLevels([]);
    setSearchQuery("");
    setLocationQuery("");
  };

  const handleSaveJob = (jobId: string) => {
    if (!user) return;
    saveJob.mutate({ user_id: user.id, job_id: jobId });
  };

  const jobTypes = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
    { value: "remote", label: "Remote" },
  ];

  const experienceLevels = [
    { value: "entry", label: "Fresher" },
    { value: "mid", label: "Mid Level (2-5 yrs)" },
    { value: "senior", label: "Senior (5+ yrs)" },
    { value: "executive", label: "Executive" },
  ];

  const formatSalary = (min?: number | null, max?: number | null) => {
    if (!min && !max) return null;
    if (min && max) return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L`;
    if (min) return `₹${(min / 100000).toFixed(1)}L+`;
    if (max) return `Up to ₹${(max / 100000).toFixed(1)}L`;
    return null;
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Job Type */}
      <div>
        <h3 className="font-medium mb-3">Job Type</h3>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <div key={type.value} className="flex items-center gap-2">
              <Checkbox
                id={`type-${type.value}`}
                checked={selectedJobTypes.includes(type.value)}
                onCheckedChange={() => toggleJobType(type.value)}
              />
              <Label htmlFor={`type-${type.value}`} className="text-sm font-normal cursor-pointer">
                {type.label}
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
            <div key={level.value} className="flex items-center gap-2">
              <Checkbox
                id={`exp-${level.value}`}
                checked={selectedExperienceLevels.includes(level.value)}
                onCheckedChange={() => toggleExperienceLevel(level.value)}
              />
              <Label htmlFor={`exp-${level.value}`} className="text-sm font-normal cursor-pointer">
                {level.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={clearFilters}>
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
            <SearchBar onSearch={handleSearch} />

            {/* Active Filters */}
            {(selectedJobTypes.length > 0 || selectedExperienceLevels.length > 0) && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-sm text-muted-foreground">Filters:</span>
                {selectedJobTypes.map((type) => (
                  <Badge key={type} variant="secondary" className="gap-1">
                    {type}
                    <button onClick={() => toggleJobType(type)} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedExperienceLevels.map((level) => (
                  <Badge key={level} variant="secondary" className="gap-1">
                    {level}
                    <button onClick={() => toggleExperienceLevel(level)} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
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
                  {isLoading ? (
                    "Loading..."
                  ) : (
                    <>
                      Showing <span className="font-medium text-foreground">{jobs?.length || 0}</span> jobs
                    </>
                  )}
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
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-card rounded-xl border border-border p-6 animate-pulse">
                      <div className="h-6 bg-secondary rounded w-1/3 mb-4"></div>
                      <div className="h-4 bg-secondary rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-secondary rounded w-1/4"></div>
                    </div>
                  ))}
                </div>
              ) : jobs && jobs.length > 0 ? (
                <div className="space-y-4">
                  {jobs.map((job, index) => {
                    const salary = formatSalary(job.salary_min, job.salary_max);
                    const skills = job.job_skills?.map((js) => js.skills.name) || [];
                    const isNew = new Date(job.created_at) > new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
                    const isSaved = savedJobIds.has(job.id);

                    return (
                      <div
                        key={job.id}
                        className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-all animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <Link
                                to={`/jobs/${job.id}`}
                                className="font-semibold text-lg hover:text-primary transition-colors"
                              >
                                {job.title}
                              </Link>
                              {isNew && (
                                <Badge className="bg-success-light text-success border-0">New</Badge>
                              )}
                              <Badge variant="outline" className="capitalize">{job.job_type}</Badge>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                              <span className="flex items-center gap-1">
                                <Building2 className="h-4 w-4" />
                                {job.companies?.name || "Company"}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                              </span>
                            </div>

                            {salary && (
                              <p className="text-sm font-medium text-primary mb-3">{salary}</p>
                            )}

                            {skills.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {skills.slice(0, 4).map((skill) => (
                                  <Badge key={skill} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                {skills.length > 4 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{skills.length - 4} more
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            {user && role === "candidate" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleSaveJob(job.id)}
                                disabled={isSaved}
                              >
                                <Bookmark
                                  className={`h-5 w-5 ${isSaved ? "fill-primary text-primary" : ""}`}
                                />
                              </Button>
                            )}
                            <Link to={`/jobs/${job.id}`}>
                              <Button>View Details</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No jobs found matching your criteria.</p>
                  <Button variant="outline" className="mt-4" onClick={clearFilters}>
                    Clear Filters
                  </Button>
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

export default Jobs;
