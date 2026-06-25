import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import twoImage from "@/assets/2.jpeg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — West Point Realtors" },
      { name: "description", content: "A decade of brokering Nigeria's most discreet real estate transactions." },
      { property: "og:title", content: "About West Point Realtors" },
      { property: "og:description", content: "Built on verified titles, diaspora trust, and architectural taste." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <section className="pt-32 pb-20 bg-ink text-ivory">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <p className="eyebrow text-gold">Our Story</p>
          <h1 className="mt-4 font-serif text-4xl lg:text-6xl leading-[1.05]">
            Quietly building Nigeria's most trusted luxury property house since 2014.
          </h1>
          <div className="gold-hairline mt-12 max-w-xs" />
        </div>
      </section>

      {/* Decorative Image Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Decorative Image with Luxury Styling */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full border-2 border-gold/40 -z-10" />
              <img 
                src={twoImage} 
                alt="Luxury Property" 
                className="w-full shadow-[0_25px_60px_-12px_rgba(197,160,89,0.25)]" 
              />
              <div className="absolute -bottom-6 -right-6 bg-gold/95 text-ink px-8 py-4 font-serif text-lg">
                Ikoyi Villa
              </div>
            </div>

            {/* Text Content */}
            <div>
              <p className="eyebrow text-gold mb-4">Our Philosophy</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-8">
                Excellence in every detail
              </h2>
              <div className="space-y-6 text-lg text-ink/70 leading-relaxed font-light">
                <p>
                  West Point Realtors was founded on a single conviction: that wealth, especially in a young and fast-moving market, deserves slow, verified, architecturally serious stewardship.
                </p>
                <p>
                  We do not list publicly what should not be public. We do not introduce a property until our legal desk has signed off on the title chain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 space-y-8 text-lg text-ink/70 leading-relaxed font-light">
          <p>
            We do not take on a buyer whose long-term thesis we cannot understand.
          </p>
          <p>
            The result is a small but exceptional book: penthouses in Ikoyi, waterfront on Banana Island, gazetted land in Epe, and architecturally distinct duplexes in Lekki — each curated to compound across generations.
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
