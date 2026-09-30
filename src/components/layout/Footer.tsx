import { Link } from "react-router-dom";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { footerNav } from "@/data/navigation";
import { activeSocialProfiles, site, whatsappUrl } from "@/data/site";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal/10 bg-white pb-8 pt-16 text-charcoal-dim sm:pt-20">
      <Container>
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-[32ch] text-sm">
              Redesigning how businesses run, then using AI to make it stick.
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
                <a
                  href={whatsappUrl(`Hi Qamira, I found you at ${site.url} and would like to talk.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm transition-colors hover:text-brass"
                >
                  WhatsApp {site.phone}
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-sm transition-colors hover:text-brass">
                  Our offices
                </Link>
              </li>
            </ul>
            <SocialLinks />
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-charcoal/10 pt-6 font-mono text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {site.name}. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="transition-colors hover:text-brass">
              Privacy Policy
            </Link>
            <span>{site.motto}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

/**
 * The public profiles, rendered from the single list in site.ts so the
 * footer, the connect dock and the organization schema's `sameAs` can
 * never disagree about which accounts exist.
 */
function SocialLinks() {
  if (activeSocialProfiles.length === 0) return null;

  const icons = { LinkedIn: Linkedin, Instagram, Facebook } as const;

  return (
    <ul className="mt-5 flex items-center gap-2">
      {activeSocialProfiles.map((profile) => {
        const Icon = icons[profile.label];
        return (
          <li key={profile.label}>
            <a
              href={profile.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${site.name} on ${profile.label}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 text-charcoal-dim transition-colors hover:border-brass hover:text-brass"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
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
