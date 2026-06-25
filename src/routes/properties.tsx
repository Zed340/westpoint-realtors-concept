import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { PROPERTIES } from "@/lib/properties";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Portfolio — West Point Realtors" },
      { name: "description", content: "Curated luxury homes, penthouses, and land across Nigeria's most exclusive corridors." },
      { property: "og:title", content: "Portfolio — West Point Realtors" },
      { property: "og:description", content: "Architectural masterpieces, hand-selected." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <section className="pt-32 pb-12 bg-ink text-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow text-gold">The Portfolio</p>
          <h1 className="mt-4 font-serif text-4xl lg:text-6xl max-w-3xl">A discreetly held collection of Nigeria's finest properties.</h1>
          <div className="mt-10 max-w-3xl">
            <SearchBar variant="compact" />
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROPERTIES.map(p => <PropertyCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
