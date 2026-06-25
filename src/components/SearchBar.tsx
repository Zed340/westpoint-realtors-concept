import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Search, Mic, ArrowRight } from "lucide-react";

const POPULAR = [
  "4-bedroom duplex in Lekki under 200m",
  "Penthouse in Ikoyi",
  "Land with C of O in Epe",
  "Serviced apartment for investment",
];

const RECENT_KEY = "westpoint-recent-searches";

interface Props {
  variant?: "hero" | "compact";
  initial?: string;
}

export function SearchBar({ variant = "hero", initial = "" }: Props) {
  const [q, setQ] = useState(initial);
  const [focused, setFocused] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const [listening, setListening] = useState(false);
  const nav = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) setRecent(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  function submit(value: string) {
    const v = value.trim();
    if (!v) return;
    const next = [v, ...recent.filter(r => r !== v)].slice(0, 4);
    setRecent(next);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    nav({ to: "/search", search: { q: v } });
  }

  function startVoice() {
    type SR = { new (): { lang: string; continuous: boolean; interimResults: boolean; onresult: (e: { results: ArrayLike<{ 0: { transcript: string } }> }) => void; onend: () => void; start: () => void } };
    const w = window as unknown as { SpeechRecognition?: SR; webkitSpeechRecognition?: SR };
    const SR = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!SR) { alert("Voice search isn't supported on this browser."); return; }
    const rec = new SR();
    rec.lang = "en-NG";
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setQ(transcript);
      setListening(false);
      submit(transcript);
    };
    rec.onend = () => setListening(false);
    setListening(true);
    rec.start();
  }

  const isHero = variant === "hero";

  return (
    <div className={isHero ? "w-full max-w-3xl mx-auto" : "w-full"}>
      <form
        onSubmit={(e) => { e.preventDefault(); submit(q); }}
        className={`group relative flex items-center bg-ivory/95 backdrop-blur-md border transition-all ${
          focused ? "border-gold shadow-[0_20px_60px_-20px_rgba(197,160,89,0.4)]" : "border-ivory/20"
        }`}
        style={{ borderRadius: "2px" }}
      >
        <Search className="ml-3 sm:ml-5 text-ink/40 shrink-0" size={18} />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder={isHero ? "Try: '4-bedroom duplex in Lekki under 200m'" : "Search properties…"}
          className="flex-1 bg-transparent py-3 sm:py-4 px-2 sm:px-3 text-ink placeholder:text-ink/40 focus:outline-none text-[15px]"
        />
        <button type="button" onClick={startVoice} aria-label="Voice search" className={`p-3 sm:p-4 transition-colors shrink-0 ${listening ? "text-destructive" : "text-ink/50 hover:text-gold"}`}>
          <Mic size={18} />
        </button>
        <button type="submit" aria-label="Search" className="bg-ink text-ivory px-3 sm:px-5 py-3 sm:py-4 hover:bg-gold hover:text-ink transition-colors flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline text-[0.7rem] tracking-[0.18em] uppercase font-medium">Search</span>
          <ArrowRight size={16} />
        </button>
      </form>

      {focused && (
        <div className="mt-3 p-5 bg-ivory/95 backdrop-blur-md border border-ivory/20 text-ink animate-in fade-in slide-in-from-top-2" style={{ borderRadius: "2px" }}>
          {recent.length > 0 && (
            <div className="mb-4">
              <p className="eyebrow text-ink/40 mb-2">Recent</p>
              <div className="flex flex-wrap gap-2">
                {recent.map(r => (
                  <button key={r} type="button" onMouseDown={() => submit(r)} className="text-xs px-3 py-1.5 border border-ink/15 hover:border-gold hover:text-gold transition-colors">
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}
          <p className="eyebrow text-ink/40 mb-2">Popular searches</p>
          <div className="flex flex-wrap gap-2">
            {POPULAR.map(p => (
              <button key={p} type="button" onMouseDown={() => submit(p)} className="text-xs px-3 py-1.5 border border-ink/15 hover:border-gold hover:text-gold transition-colors">
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
