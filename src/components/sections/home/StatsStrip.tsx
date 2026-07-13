import { Container } from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { stats } from "@/data/content/home";

export function StatsStrip() {
  return (
    <div className="border-y border-charcoal/10 bg-parchment-2">
      <Container>
        <RevealGroup className="grid grid-cols-2 divide-x divide-y divide-charcoal/10 lg:grid-cols-4 lg:divide-y-0">
          {stats.map((stat) => (
            <RevealItem key={stat.label} className="px-6 py-9 first:pl-0 rtl:first:pl-6">
              <div className="font-display text-3xl text-brass sm:text-4xl">{stat.value}</div>
              <div className="mt-2 font-mono text-xs uppercase tracking-[0.05em] text-charcoal-dim">{stat.label}</div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </div>
  );
}
