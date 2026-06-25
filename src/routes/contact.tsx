import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { advisorLink } from "@/lib/whatsapp";
import { MapPin, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — West Point Realtors" },
      { name: "description", content: "Speak with a West Point advisor — discreet, immediate, available 24/7 via WhatsApp." },
      { property: "og:title", content: "Contact West Point Realtors" },
      { property: "og:description", content: "Begin a private conversation about Nigeria's most exclusive properties." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <section className="pt-32 pb-20 bg-ink text-ivory">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <p className="eyebrow text-gold">Speak With Us</p>
          <h1 className="mt-4 font-serif text-4xl lg:text-6xl">Begin a private conversation.</h1>
          <p className="mt-6 max-w-xl text-ivory/60 leading-relaxed">
            Every enquiry reaches a senior advisor within minutes. We don't use forms — we use WhatsApp.
          </p>
          <a href={advisorLink()} target="_blank" rel="noopener" className="mt-10 btn-gold inline-flex">
            Open WhatsApp
          </a>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 grid sm:grid-cols-3 gap-10">
          {[
            { Icon: MapPin, t: "Visit", v: "14 Admiralty Way\nLekki Phase 1, Lagos" },
            { Icon: Phone, t: "Call", v: "+234 801 234 5678\n24/7 concierge" },
            { Icon: Mail, t: "Write", v: "advisor@westpointrealtors.ng" },
          ].map(({ Icon, t, v }) => (
            <div key={t}>
              <Icon className="text-gold" size={22} />
              <p className="eyebrow text-ink/40 mt-4">{t}</p>
              <p className="mt-2 text-ink whitespace-pre-line leading-relaxed">{v}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
