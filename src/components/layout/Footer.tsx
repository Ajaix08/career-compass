import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    forCandidates: [
      { label: "Browse Jobs", href: "/jobs" },
      { label: "Browse Internships", href: "/internships" },
      { label: "Career Advice", href: "/resources" },
      { label: "Resume Builder", href: "/resume" },
    ],
    forEmployers: [
      { label: "Post a Job", href: "/post-job" },
      { label: "Browse Candidates", href: "/candidates" },
      { label: "Pricing", href: "/pricing" },
      { label: "Employer Resources", href: "/employer-resources" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  };

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <span>JobConnect</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connecting talent with opportunity. Find your dream job or the perfect candidate.
            </p>
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

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
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
            © {new Date().getFullYear()} JobConnect. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
