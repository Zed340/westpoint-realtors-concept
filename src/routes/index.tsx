import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { PROPERTIES } from "@/lib/properties";
import { advisorLink } from "@/lib/whatsapp";
import heroImg from "@/assets/hero-mansion.jpg";
import { ArrowRight, ShieldCheck, FileCheck, Globe2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

const PILLARS = [
  { n: "01", t: "100% Verified Titles", d: "Every listing legally vetted with Governor's Consent or C of O confirmed before introduction." },
  { n: "02", t: "Diaspora Escrow", d: "Secure cross-border transactions with milestone-based escrow and notarised documentation." },
  { n: "03", t: "24/7 Concierge", d: "From virtual inspections to closing logistics — your dedicated advisor never sleeps." },
  { n: "04", t: "Smart Inventory", d: "Curated portfolio of architectural masterpieces, never mass-listed, never resold publicly." },
];

const TESTIMONIALS = [
  { q: "West Point closed a Banana Island acquisition for our family while we were in London. Every document arrived before we asked.", n: "Adetola O.", role: "Diaspora Investor · London" },
  { q: "I have bought three duplexes through them in five years. Title verification alone is worth the premium.", n: "Chief E. Nwosu", role: "Lagos-based HNWI" },
  { q: "The match score search found us a Lekki penthouse we did not know existed. Off-market, priced fairly, closed in 11 days.", n: "Hauwa & Musa B.", role: "Abuja" },
];

function Home() {
  const featured = PROPERTIES.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* HERO */}
      <section className="relative h-[100svh] min-h-[680px] overflow-hidden bg-ink">
        <img
          src={heroImg}
          alt="Luxury Nigerian mansion at dusk"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover ken-burns opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink" />

        <div className="relative h-full mx-auto max-w-7xl px-6 lg:px-10 flex flex-col justify-end pb-16 sm:pb-24 pt-28">
          <div className="max-w-3xl">
            <p className="eyebrow text-gold fade-up">West Point Realtors · Est. 2014</p>
            <h1 className="mt-6 font-serif text-[2.6rem] sm:text-6xl lg:text-7xl text-ivory leading-[1.02] fade-up" style={{ animationDelay: "120ms" }}>
              Architectural masterpieces.<br />
              <span className="italic text-gold">Uncompromising</span> luxury.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-ivory/70 max-w-xl leading-relaxed fade-up" style={{ animationDelay: "240ms" }}>
              Securing generational wealth through Nigeria's most discreetly held estates, penthouses and land.
            </p>
          </div>

          <div className="mt-10 fade-up" style={{ animationDelay: "360ms" }}>
            <SearchBar />
            <p className="mt-3 text-xs text-ivory/50 text-center max-w-3xl mx-auto">
              Powered by intelligent match — type naturally, or tap the mic.
            </p>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ivory/40 text-[0.65rem] tracking-[0.3em] uppercase animate-pulse">Scroll</div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <div className="max-w-xl">
              <p className="eyebrow text-gold">The Portfolio</p>
              <h2 className="mt-3 font-serif text-4xl lg:text-5xl text-ink">Featured estates, hand-selected this season.</h2>
            </div>
            <a href="/properties" className="btn-ghost-gold !text-ink">
              View full portfolio <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map(p => <PropertyCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 lg:py-32 bg-ink text-ivory relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl mb-20">
            <p className="eyebrow text-gold">Why West Point</p>
            <h2 className="mt-3 font-serif text-4xl lg:text-5xl">Trust earned, not advertised.</h2>
            <div className="gold-hairline mt-8 max-w-xs" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {PILLARS.map(p => (
              <div key={p.n} className="group">
                <p className="font-serif text-gold text-5xl tnum mb-4 transition-transform group-hover:-translate-y-1">{p.n}</p>
                <h3 className="font-serif text-2xl mb-3">{p.t}</h3>
                <p className="text-sm text-ivory/60 leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVESTMENT */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="eyebrow text-gold">Capital Strategy</p>
            <h2 className="mt-3 font-serif text-4xl lg:text-5xl text-ink">Investment opportunities engineered for yield.</h2>
            <p className="mt-6 text-ink/60 leading-relaxed max-w-lg">
              From short-let serviced apartments returning 14–22% annually to gazetted land in Lagos's fastest-appreciating corridors, our investment desk curates positions for compounding wealth.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div>
                <p className="font-serif text-5xl text-gold tnum">18%</p>
                <p className="mt-2 text-xs tracking-wider uppercase text-ink/50">Avg. rental yield, prime Lagos</p>
              </div>
              <div>
                <p className="font-serif text-5xl text-gold tnum">3.4×</p>
                <p className="mt-2 text-xs tracking-wider uppercase text-ink/50">Epe land appreciation, 5 yrs</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[ShieldCheck, FileCheck, Globe2, Sparkles].map((Icon, i) => (
              <div key={i} className="aspect-square border border-gold/30 bg-card flex flex-col items-center justify-center text-center p-6 hover:bg-ink hover:text-ivory transition-colors group">
                <Icon className="text-gold mb-3" size={28} />
                <p className="font-serif text-lg text-ink group-hover:text-ivory">
                  {["Verified", "Gazetted", "Diaspora", "Curated"][i]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 lg:py-32 bg-ink text-ivory">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <p className="eyebrow text-gold">Client Voices</p>
          <div className="mt-12 space-y-16">
            {TESTIMONIALS.map((t, i) => (
              <figure key={i}>
                <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-4xl leading-[1.3] text-ivory/95">
                  &ldquo;{t.q}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-xs tracking-[0.2em] uppercase text-gold">
                  {t.n} <span className="text-ivory/40">· {t.role}</span>
                </figcaption>
                {i < TESTIMONIALS.length - 1 && <div className="gold-hairline mt-16 max-w-xs mx-auto opacity-40" />}
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-28 bg-background">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-serif text-4xl lg:text-5xl text-ink">Begin a private conversation.</h2>
          <p className="mt-5 text-ink/60 max-w-xl mx-auto">Tell us what you're looking for. An advisor responds within minutes — discreetly, on WhatsApp.</p>
          <a href={advisorLink()} target="_blank" rel="noopener" className="mt-10 btn-gold inline-flex">
            Speak to an Advisor
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
