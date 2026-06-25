import { Link } from "@tanstack/react-router";
import { formatNaira } from "@/lib/search";
import { inspectLink } from "@/lib/whatsapp";
import type { Property } from "@/lib/properties";
import type { ScoredProperty } from "@/lib/search";
import { Check, MapPin } from "lucide-react";

export function PropertyCard({ p, scored }: { p: Property; scored?: ScoredProperty }) {
  return (
    <article className="group bg-card border border-border/60 hover:border-gold/50 transition-all duration-500">
      <Link to="/properties" className="block overflow-hidden aspect-[4/5] relative">
        <img
          src={p.image}
          alt={p.title}
          width={1024}
          height={1280}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
        />
        {scored && (
          <div className="absolute top-4 left-4 bg-ink/80 backdrop-blur-sm px-3 py-1.5">
            <span className="font-serif text-gold text-lg leading-none tnum">{scored.score}<span className="text-xs">%</span></span>
            <span className="ml-1.5 text-[0.6rem] uppercase tracking-[0.18em] text-ivory/70">Match</span>
          </div>
        )}
      </Link>

      <div className="p-6">
        <div className="flex items-center gap-1.5 text-ink/50">
          <MapPin size={11} />
          <p className="eyebrow text-ink/50">{p.location} · {p.type}</p>
        </div>
        <h3 className="mt-2 font-serif text-2xl text-ink leading-tight">{p.title}</h3>
        <p className="mt-3 text-xl text-ink tnum font-light">{formatNaira(p.price)}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.slice(0, 3).map(t => (
            <span key={t} className="text-[0.65rem] tracking-wider uppercase text-ink/60 border border-ink/15 px-2 py-1">{t}</span>
          ))}
        </div>

        {scored && scored.checklist.length > 0 && (
          <div className="mt-5 pt-5 border-t border-gold/30 space-y-1.5">
            {scored.checklist.map(c => (
              <div key={c.label} className={`flex items-center gap-2 text-xs ${c.passed ? "text-ink/80" : "text-ink/35"}`}>
                <Check size={12} className={c.passed ? "text-gold" : "text-ink/30"} />
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        )}

        <a
          href={inspectLink(p.ref, p.title)}
          target="_blank"
          rel="noopener"
          className="mt-6 btn-ghost-gold w-full !text-ink"
        >
          Inspect via WhatsApp
        </a>
      </div>
    </article>
  );
}
