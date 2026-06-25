import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { advisorLink } from "@/lib/whatsapp";
import { Menu, X } from "lucide-react";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-xl bg-[color-mix(in_oklab,var(--ink)_70%,transparent)] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-serif text-2xl text-ivory tracking-tight">West Point</span>
            <span className="font-serif text-2xl text-gold tracking-tight italic">Realtors</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            <Link to="/" className="text-xs tracking-[0.18em] uppercase text-ivory/80 hover:text-gold transition-colors">Home</Link>
            <Link to="/properties" className="text-xs tracking-[0.18em] uppercase text-ivory/80 hover:text-gold transition-colors">Portfolio</Link>
            <Link to="/tours" className="text-xs tracking-[0.18em] uppercase text-ivory/80 hover:text-gold transition-colors">Tours</Link>
            <Link to="/about" className="text-xs tracking-[0.18em] uppercase text-ivory/80 hover:text-gold transition-colors">About</Link>
            <Link to="/contact" className="text-xs tracking-[0.18em] uppercase text-ivory/80 hover:text-gold transition-colors">Contact</Link>
          </nav>

          <a href={advisorLink()} target="_blank" rel="noopener" className="hidden lg:inline-flex btn-gold !py-2.5 !px-4 !text-[0.68rem]">
            Speak to an Advisor
          </a>

          <button onClick={() => setOpen(!open)} className="lg:hidden text-ivory" aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-white/10 px-6 py-6 flex flex-col gap-5 bg-[color-mix(in_oklab,var(--ink)_92%,transparent)]">
            <Link to="/" onClick={() => setOpen(false)} className="text-sm tracking-[0.18em] uppercase text-ivory/90">Home</Link>
            <Link to="/properties" onClick={() => setOpen(false)} className="text-sm tracking-[0.18em] uppercase text-ivory/90">Portfolio</Link>
            <Link to="/tours" onClick={() => setOpen(false)} className="text-sm tracking-[0.18em] uppercase text-ivory/90">Tours</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="text-sm tracking-[0.18em] uppercase text-ivory/90">About</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="text-sm tracking-[0.18em] uppercase text-ivory/90">Contact</Link>
            <a href={advisorLink()} target="_blank" rel="noopener" className="btn-gold mt-2">Speak to an Advisor</a>
          </div>
        )}
      </div>
    </header>
  );
}
