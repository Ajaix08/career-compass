import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Bookmark, Building2 } from "lucide-react";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: "Full-time" | "Part-time" | "Internship" | "Contract" | "Remote";
  postedAt: string;
  logo?: string;
  skills: string[];
  isNew?: boolean;
  isSaved?: boolean;
}

const JobCard = ({
  id,
  title,
  company,
  location,
  salary,
  type,
  postedAt,
  logo,
  skills,
  isNew = false,
  isSaved = false,
}: JobCardProps) => {
  const typeColors = {
    "Full-time": "bg-primary-light text-primary",
    "Part-time": "bg-accent-light text-accent",
    "Internship": "bg-success-light text-success",
    "Contract": "bg-warning-light text-warning",
    "Remote": "bg-primary-light text-primary",
  };

  return (
    <div className="group relative bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-card-hover transition-all duration-300 hover:border-primary/20">
      {isNew && (
        <Badge className="absolute -top-2 -right-2 bg-success text-success-foreground">
          New
        </Badge>
      )}

      <div className="flex gap-4">
        {/* Company Logo */}
        <div className="flex-shrink-0">
          <div className="h-14 w-14 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
            {logo ? (
              <img src={logo} alt={company} className="h-full w-full object-cover" />
            ) : (
              <Building2 className="h-7 w-7 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Job Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link to={`/jobs/${id}`}>
                <h3 className="font-display font-semibold text-lg hover:text-primary transition-colors line-clamp-1">
                  {title}
                </h3>
              </Link>
              <p className="text-muted-foreground text-sm">{company}</p>
            </div>
            <button
              className={`flex-shrink-0 p-2 rounded-lg hover:bg-secondary transition-colors ${
                isSaved ? "text-primary" : "text-muted-foreground"
              }`}
              aria-label="Save job"
            >
              <Bookmark className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              {salary}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {postedAt}
            </span>
          </div>

          {/* Skills & Type */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Badge variant="secondary" className={typeColors[type]}>
              {type}
            </Badge>
            {skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <span className="text-xs text-muted-foreground">+{skills.length - 3} more</span>
            )}
          </div>
        </div>
      </div>

      {/* Apply Button (shows on hover) */}
      <div className="mt-4 pt-4 border-t border-border flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
        <Link to={`/jobs/${id}/apply`}>
          <Button size="sm">Apply Now</Button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
