import { useEffect } from "react";
import { track } from "@/lib/metaPixel";
import { trackGoogleContactChannel } from "@/lib/googleTag";

/**
 * Reports every click on a WhatsApp, email or phone link, wherever it sits
 * on the page -- the footer, the connect dock, the contact page, an
 * article.
 *
 * One delegated listener rather than an onClick on each link, because
 * these links are scattered across a dozen components and a new one added
 * later should be counted without anyone remembering to wire it up.
 * Social-profile clicks are not covered here; the connect dock reports
 * those itself.
 *
 * A link can name its own location with `data-contact-location`; otherwise
 * it is "Footer" inside the footer and "Page" anywhere else.
 *
 * Renders nothing.
 */
export function ContactLinkTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      const channel = channelFor(link.getAttribute("href") ?? "");
      if (!channel) return;

      const location = link.dataset.contactLocation ?? (link.closest("footer") ? "Footer" : "Page");
      track("Contact", { content_name: channel });
      trackGoogleContactChannel(channel, location);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

function channelFor(href: string): "WhatsApp" | "Email" | "Phone" | undefined {
  if (href.startsWith("https://wa.me/")) return "WhatsApp";
  if (href.startsWith("mailto:")) return "Email";
  if (href.startsWith("tel:")) return "Phone";
  return undefined;
}
