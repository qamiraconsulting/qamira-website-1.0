import { Link } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { footerNav } from "@/data/navigation";
import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal/10 bg-white pb-8 pt-16 text-charcoal-dim sm:pt-20">
      <Container>
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-[32ch] text-sm">
              AI-native Business Performance Excellence. We redesign how organizations work, then calibrate AI to execute it.
            </p>
          </div>
          <FooterColumn title="Firm" items={footerNav.firm} />
          <FooterColumn title="Work" items={footerNav.work} />
          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-charcoal-dim">Contact</h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href={`mailto:${site.email}`} className="text-sm transition-colors hover:text-brass">
                  {site.email}
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-sm transition-colors hover:text-brass">
                  Our offices
                </Link>
              </li>
              <li>
                <SignedOut>
                  <Link to="/login" className="text-sm transition-colors hover:text-brass">
                    Login
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link to="/portal" className="text-sm transition-colors hover:text-brass">
                    Client Portal
                  </Link>
                </SignedIn>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-charcoal/10 pt-6 font-mono text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {site.name}. All rights reserved.</span>
          <span>{site.motto}</span>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; path: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-charcoal-dim">{title}</h4>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.path}>
            <Link to={item.path} className="text-sm transition-colors hover:text-brass">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
