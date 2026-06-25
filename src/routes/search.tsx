import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { search, formatNaira } from "@/lib/search";
import { advisorLink } from "@/lib/whatsapp";
import { X, AlertCircle } from "lucide-react";
import { useMemo } from "react";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/search")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Search Results — West Point Realtors" },
      { name: "description", content: "AI-powered luxury property search across Nigeria." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const result = useMemo(() => search(q), [q]);
  const { parsed, results, fallback: isFallback, fallbackNote } = result;

  const chips: { label: string; key: string }[] = [];
  if (parsed.type) chips.push({ label: parsed.type, key: "type" });
  if (parsed.location) chips.push({ label: parsed.location, key: "location" });
  if (parsed.budgetMax) chips.push({ label: `Under ${formatNaira(parsed.budgetMax)}`, key: "budgetMax" });
  if (parsed.budgetMin && !parsed.budgetMax) chips.push({ label: `Above ${formatNaira(parsed.budgetMin)}`, key: "budgetMin" });
  if (parsed.intent) chips.push({ label: parsed.intent, key: "intent" });

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <section className="pt-28 pb-10 bg-ink text-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Link to="/" className="text-xs tracking-[0.18em] uppercase text-ivory/50 hover:text-gold">← Home</Link>
          <h1 className="mt-6 font-serif text-3xl lg:text-5xl">Search results</h1>
          <p className="mt-2 text-ivory/60 italic">&ldquo;{q || "Show all"}&rdquo;</p>

          <div className="mt-8">
            <SearchBar variant="compact" initial={q} />
          </div>

          {chips.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2 items-center">
              <span className="eyebrow text-ivory/40">Understood as</span>
              {chips.map(c => (
                <span key={c.key} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 border border-gold/40 text-gold capitalize">
                  {c.label}
                  <X size={11} className="opacity-50" />
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {isFallback && (
            <div className="mb-10 bg-card border-l-2 border-gold p-6 flex gap-4 items-start">
              <AlertCircle className="text-gold shrink-0 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="font-serif text-xl text-ink">{fallbackNote}</p>
                <p className="mt-2 text-sm text-ink/60">
                  Speak to an advisor for off-market listings that match your exact brief.
                </p>
                <a href={advisorLink()} target="_blank" rel="noopener" className="mt-4 btn-ghost-gold !text-ink inline-flex">
                  Talk to an advisor
                </a>
              </div>
            </div>
          )}

          <div className="flex items-baseline justify-between mb-10">
            <p className="text-sm text-ink/60">
              <span className="font-serif text-3xl text-ink tnum">{results.length}</span>
              <span className="ml-2 eyebrow text-ink/50">{isFallback ? "Closest alternatives" : "Matches · sorted by relevance"}</span>
            </p>
          </div>

          {results.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-serif text-2xl text-ink/60">Our portfolio is broader than the web shows.</p>
              <a href={advisorLink()} target="_blank" rel="noopener" className="mt-8 btn-gold inline-flex">
                Request private listings
              </a>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map(s => <PropertyCard key={s.property.id} p={s.property} scored={s} />)}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
