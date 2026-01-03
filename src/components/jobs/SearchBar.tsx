import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  onSearch?: (query: string, location: string) => void;
  className?: string;
  variant?: "default" | "hero";
}

const SearchBar = ({ onSearch, className = "", variant = "default" }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query, location);
  };

  if (variant === "hero") {
    return (
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col sm:flex-row gap-3 p-3 bg-card rounded-2xl shadow-xl border border-border ${className}`}
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Job title, skills, or company"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 h-12 border-0 bg-secondary/50 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="relative flex-1">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Mumbai, Bangalore, Delhi..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-12 h-12 border-0 bg-secondary/50 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <Button type="submit" size="xl" variant="hero">
          Search Jobs
        </Button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row gap-2 ${className}`}
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search jobs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchBar;
