import { Link } from "react-router-dom";
import { Briefcase, Linkedin, Github, MessageCircle } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    forCandidates: [
      { label: "Browse Jobs", href: "/jobs" },
      { label: "Companies", href: "/jobs" },
      { label: "Career Advice", href: "/resources" },
    ],
    forEmployers: [
      { label: "Post a Job", href: "/recruiter/post-job" },
      { label: "Pricing", href: "/pricing" },
      { label: "Employer Resources", href: "/employer-resources" },
    ],

  };

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <span>JobConnect</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              India's leading job portal connecting talented professionals with top companies across the nation.
            </p>
            <div className="flex gap-4">

              <a href="https://in.linkedin.com/in/anuragkumar008"className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>

              <a href="https://github.com/Ajaix08" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>

              <a href="https://wa.me/919835563988?text=Hello%20I%20found%20your%20portfolio" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* For Candidates */}
          <div>
            <h4 className="font-display font-semibold mb-4">For Candidates</h4>
            <ul className="space-y-2">
              {footerLinks.forCandidates.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="font-display font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2">
              {footerLinks.forEmployers.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Anurag Kumar. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made By Anurag Kumar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
