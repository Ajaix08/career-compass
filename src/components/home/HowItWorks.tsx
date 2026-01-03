import { UserPlus, Search, FileCheck, Rocket } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      step: "01",
      title: "Create Account",
      description: "Sign up for free and build your professional profile in minutes.",
    },
    {
      icon: Search,
      step: "02",
      title: "Search Jobs",
      description: "Browse thousands of opportunities that match your skills and preferences.",
    },
    {
      icon: FileCheck,
      step: "03",
      title: "Apply Easily",
      description: "Submit applications with your saved resume and track your progress.",
    },
    {
      icon: Rocket,
      step: "04",
      title: "Get Hired",
      description: "Connect with employers and land your dream job or internship.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start your job search journey in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="relative animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
              )}

              <div className="relative bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-card-hover transition-all duration-300 text-center">
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full gradient-bg text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="inline-flex p-4 rounded-xl bg-primary-light mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>

                <h3 className="font-display font-semibold text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
