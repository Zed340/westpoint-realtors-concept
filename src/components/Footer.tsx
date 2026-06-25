import { advisorLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="gold-hairline mb-16" />
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl">West Point</span>
              <span className="font-serif text-3xl text-gold italic">Realtors</span>
            </div>
            <p className="mt-5 text-sm text-ivory/60 leading-relaxed max-w-sm">
              Architectural masterpieces and verified land for the discerning few — securing generational wealth across Nigeria.
            </p>
          </div>

          <div>
            <p className="eyebrow text-gold mb-5">Visit</p>
            <p className="text-sm text-ivory/70 leading-relaxed">
              14 Admiralty Way<br />
              Lekki Phase 1, Lagos<br />
              Nigeria
            </p>
          </div>

          <div>
            <p className="eyebrow text-gold mb-5">Speak with us</p>
            <a href={advisorLink()} target="_blank" rel="noopener" className="btn-gold">
              WhatsApp an Advisor
            </a>
            <p className="mt-4 text-xs text-ivory/40">Available 24/7 · Diaspora-friendly</p>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-ivory/40">
          <p>© {new Date().getFullYear()} West Point Realtors. All titles verified.</p>
          <p className="tracking-[0.18em] uppercase">RC 1847299 · ECRA Member</p>
        </div>
      </div>
    </footer>
  );
}
