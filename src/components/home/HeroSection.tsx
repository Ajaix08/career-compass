import { Link, useNavigate } from "react-router-dom";
import SearchBar from "@/components/jobs/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, Building2, TrendingUp } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Briefcase, value: "50,000+", label: "Active Jobs" },
    { icon: Building2, value: "10,000+", label: "Companies" },
    { icon: Users, value: "20L+", label: "Candidates" },
    { icon: TrendingUp, value: "5L+", label: "Hired" },
  ];

  const popularSearches = [
    "Software Engineer",
    "Data Analyst",
    "Product Manager",
    "UI/UX Designer",
    "Marketing",
    "Remote",
  ];

  const handleSearch = (query: string, location: string) => {
    navigate(`/jobs?search=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <section className="relative overflow-hidden gradient-hero py-16 md:py-24 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-1.5 text-sm font-medium animate-fade-in"
          >
            🇮🇳 India's #1 Job Portal - 10,000+ companies hiring
          </Badge>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in stagger-1">
            Find Your{" "}
            <span className="gradient-text">Dream Career</span>
            <br />
            in India
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in stagger-2">
            Connect with top employers across India and discover opportunities that match your skills,
            experience, and career goals.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto animate-fade-in stagger-3">
            <SearchBar variant="hero" onSearch={handleSearch} />
          </div>

          {/* Popular Searches */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 animate-fade-in stagger-4">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {popularSearches.map((search) => (
              <button
                key={search}
                onClick={() => navigate(`/jobs?search=${encodeURIComponent(search)}`)}
                className="text-sm text-primary hover:text-primary-hover hover:underline transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto animate-fade-in stagger-5">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-xl bg-card/50 backdrop-blur border border-border/50"
            >
              <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="font-display text-2xl md:text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
