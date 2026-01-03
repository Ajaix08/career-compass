import { Link } from "react-router-dom";
import {
  Code,
  Paintbrush,
  LineChart,
  Megaphone,
  Briefcase,
  HeartPulse,
  GraduationCap,
  Wrench,
} from "lucide-react";

const Categories = () => {
  const categories = [
    {
      icon: Code,
      name: "Technology",
      count: "15,234",
      color: "bg-primary-light text-primary",
    },
    {
      icon: Paintbrush,
      name: "Design",
      count: "8,456",
      color: "bg-accent-light text-accent",
    },
    {
      icon: LineChart,
      name: "Finance",
      count: "6,789",
      color: "bg-success-light text-success",
    },
    {
      icon: Megaphone,
      name: "Marketing",
      count: "9,123",
      color: "bg-warning-light text-warning",
    },
    {
      icon: Briefcase,
      name: "Business",
      count: "12,567",
      color: "bg-primary-light text-primary",
    },
    {
      icon: HeartPulse,
      name: "Healthcare",
      count: "7,890",
      color: "bg-accent-light text-accent",
    },
    {
      icon: GraduationCap,
      name: "Education",
      count: "4,567",
      color: "bg-success-light text-success",
    },
    {
      icon: Wrench,
      name: "Engineering",
      count: "11,234",
      color: "bg-warning-light text-warning",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Explore by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find opportunities in your field of expertise
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={`/jobs?category=${category.name.toLowerCase()}`}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-card-hover hover:border-primary/20 transition-all duration-300 h-full">
                <div
                  className={`inline-flex p-3 rounded-lg ${category.color} mb-4 group-hover:scale-110 transition-transform`}
                >
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.count} jobs
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
