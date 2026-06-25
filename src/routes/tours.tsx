import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Play, X, MapPin, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { inspectLink } from "@/lib/whatsapp";
import prop1 from "@/assets/1.png";
import prop2 from "@/assets/property-2.jpg";
import prop3 from "@/assets/3.jpeg";
import prop4 from "@/assets/1.jpeg";
import heroPoster from "@/assets/hero-mansion.jpg";
import adPoster from "@/assets/4.jpeg";

export const Route = createFileRoute("/tours")({
  head: () => ({
    meta: [
      { title: "Virtual Tours & Cinematic Walkthroughs — West Point Realtors" },
      { name: "description", content: "Cinematic drone-led virtual tours of luxury Lagos estates, penthouses and duplexes by West Point Realtors." },
      { property: "og:title", content: "Virtual Tours — West Point Realtors" },
      { property: "og:description", content: "Experience luxury in motion. Exclusive virtual property tours." },
    ],
  }),
  component: ToursPage,
});

interface TourVideo {
  ref: string;
  title: string;
  location: string;
  price: string;
  src: string;
  poster: string;
}

const TOURS: TourVideo[] = [
  {
    ref: "NR-LEK-0421",
    title: "The Aurelius Residences",
    location: "Lekki Phase 1, Lagos",
    price: "₦185M",
    src: "/videos/vid1.mp4",
    poster: prop1,
  },
  {
    ref: "NR-IKY-0188",
    title: "Skyline Penthouse",
    location: "Ikoyi, Lagos",
    price: "₦420M",
    src: "/videos/vid.mp4",
    poster: prop2,
  },
  {
    ref: "NR-IKT-0072",
    title: "Palm Court Terraces",
    location: "Ikate, Lagos",
    price: "₦135M",
    src: "/videos/vid5.mp4",
    poster: prop3,
  },
  {
    ref: "NR-BAN-0009",
    title: "Private Island Villa",
    location: "Banana Island Waterfront Estate, Lagos",
    price: "₦950M",
    src: "/videos/vid3.mp4",
    poster: prop4,
  },
];

function ToursPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? TOURS[activeIndex] : null;
  const [adLikes, setAdLikes] = useState<number>(() => {
    const saved = localStorage.getItem("adLikes");
    return saved ? parseInt(saved) : 0;
  });
  const [adDislikes, setAdDislikes] = useState<number>(() => {
    const saved = localStorage.getItem("adDislikes");
    return saved ? parseInt(saved) : 0;
  });
  const [userRating, setUserRating] = useState<'like' | 'dislike' | null>(() => {
    const saved = localStorage.getItem("userAdRating");
    return saved as 'like' | 'dislike' | null;
  });

  // Clear old values on initial load
  useEffect(() => {
    const hasOldValues = localStorage.getItem("adLikes") === "1247" || 
                         localStorage.getItem("adDislikes") === "89";
    if (hasOldValues) {
      localStorage.removeItem("adLikes");
      localStorage.removeItem("adDislikes");
      localStorage.removeItem("userAdRating");
      setAdLikes(0);
      setAdDislikes(0);
      setUserRating(null);
    }
  }, []);

  const handleAdLike = () => {
    if (userRating === 'like') {
      setAdLikes(prev => {
        const newVal = prev - 1;
        localStorage.setItem("adLikes", newVal.toString());
        return newVal;
      });
      setUserRating(null);
      localStorage.removeItem("userAdRating");
    } else {
      setAdLikes(prev => {
        const newVal = prev + 1;
        localStorage.setItem("adLikes", newVal.toString());
        return newVal;
      });
      
      if (userRating === 'dislike') {
        setAdDislikes(prev => {
          const newVal = prev - 1;
          localStorage.setItem("adDislikes", newVal.toString());
          return newVal;
        });
      }
      
      setUserRating('like');
      localStorage.setItem("userAdRating", 'like');
    }
  };

  const handleAdDislike = () => {
    if (userRating === 'dislike') {
      setAdDislikes(prev => {
        const newVal = prev - 1;
        localStorage.setItem("adDislikes", newVal.toString());
        return newVal;
      });
      setUserRating(null);
      localStorage.removeItem("userAdRating");
    } else {
      setAdDislikes(prev => {
        const newVal = prev + 1;
        localStorage.setItem("adDislikes", newVal.toString());
        return newVal;
      });
      
      if (userRating === 'like') {
        setAdLikes(prev => {
          const newVal = prev - 1;
          localStorage.setItem("adLikes", newVal.toString());
          return newVal;
        });
      }
      
      setUserRating('dislike');
      localStorage.setItem("userAdRating", 'dislike');
    }
  };

  const goToPrev = () => {
    if (activeIndex !== null && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const goToNext = () => {
    if (activeIndex !== null && activeIndex < TOURS.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex]);

  return (
    <div className="bg-ink min-h-screen text-ivory">
      <Nav />

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/vid.mp4"
          poster={heroPoster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-[0.65rem] sm:text-xs tracking-[0.4em] uppercase text-gold mb-6 fade-up">
            Cinematic Property Tours
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.05] text-ivory max-w-4xl fade-up">
            Experience Luxury <span className="italic text-gold">in Motion</span>.
            <br className="hidden sm:block" /> Exclusive Virtual Property Tours.
          </h1>
          <p className="mt-6 max-w-xl text-ivory/70 text-sm sm:text-base fade-up">
            Walk through every suite, every horizon, every detail — from anywhere in the world.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 fade-up">
            <a href="#gallery" className="btn-gold">Browse the Collection</a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.6rem] tracking-[0.4em] uppercase text-ivory/50">
          Scroll
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 sm:py-32 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-6 mb-14 border-b border-white/10 pb-8">
          <div>
            <div className="text-[0.65rem] tracking-[0.4em] uppercase text-gold mb-3">The Collection</div>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory">Featured Walkthroughs</h2>
          </div>
          <div className="hidden sm:block text-xs text-ivory/50 tracking-wider">{TOURS.length} films</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {TOURS.map((t, i) => (
            <article
              key={t.ref}
              onClick={() => setActiveIndex(i)}
              className={`group cursor-pointer relative overflow-hidden bg-black/40 border border-white/5 hover:border-gold/40 transition-all duration-500 ${
                i % 3 === 0 ? "md:row-span-1" : ""
              }`}
            >
              <div className="relative aspect-[3/4] sm:aspect-[16/10] overflow-hidden">
                <img
                  src={t.poster}
                  alt={t.title}
                  className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

                {/* Play */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <span className="absolute inset-0 rounded-full border border-gold/40 scale-100 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold/95 backdrop-blur flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(197,160,89,0.6)] transition-transform duration-500 group-hover:scale-110">
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 text-ink fill-ink ml-1" />
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 left-4 text-[0.6rem] tracking-[0.3em] uppercase text-ivory/80 bg-ink/60 backdrop-blur px-3 py-1.5 border border-white/10">
                  {t.ref}
                </div>
              </div>

              <div className="p-6 sm:p-7 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-serif text-xl sm:text-2xl text-ivory truncate">{t.title}</h3>
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-ivory/60">
                    <MapPin className="w-3 h-3 text-gold" />
                    <span className="truncate">{t.location}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[0.6rem] tracking-[0.3em] uppercase text-ivory/40">From</div>
                  <div className="font-serif text-xl text-gold">{t.price}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* AD VIDEO */}
      <section className="border-t border-white/10 py-20 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-[0.65rem] tracking-[0.4em] uppercase text-gold mb-3">Sponsored Content</div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ivory">Featured Opportunity</h2>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_80px_-20px_rgba(197,160,89,0.25)]">
            <div className="relative aspect-[16/12] sm:aspect-video bg-black">
              <video
                className="w-full h-full object-contain"
                src="/videos/vid4.mp4"
                controls
                playsInline
                poster={adPoster}
              />
            </div>
            
            <div className="p-6 sm:p-8 bg-black/30 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-1">AD-2024-001</div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-ivory">Exclusive Investment</h4>
                  <p className="mt-1 text-sm text-ivory/60">Premium Real Estate Opportunity</p>
                </div>
                
                <div className="flex items-center gap-6">
                  <button
                    onClick={handleAdLike}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all ${
                      userRating === 'like'
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-white/20 text-ivory hover:border-gold/50'
                    }`}
                  >
                    <ThumbsUp className={`w-5 h-5 ${userRating === 'like' ? 'fill-gold' : ''}`} />
                    <span className="text-sm font-medium">{adLikes.toLocaleString()}</span>
                  </button>
                  
                  <button
                    onClick={handleAdDislike}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all ${
                      userRating === 'dislike'
                        ? 'border-red-500 bg-red-500/10 text-red-400'
                        : 'border-white/20 text-ivory hover:border-red-500/50'
                    }`}
                  >
                    <ThumbsDown className={`w-5 h-5 ${userRating === 'dislike' ? 'fill-red-400' : ''}`} />
                    <span className="text-sm font-medium">{adDislikes.toLocaleString()}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-t border-white/10 py-20 px-6 text-center">
        <h3 className="font-serif text-2xl sm:text-4xl text-ivory max-w-2xl mx-auto">
          A film can only show so much. <span className="italic text-gold">Walk the floors yourself.</span>
        </h3>
        <a
          href={inspectLink("Tour booking", "a private inspection of your featured estates")}
          target="_blank"
          rel="noopener"
          className="btn-gold mt-8 inline-flex"
        >
          Book Physical Inspection
        </a>
      </section>

      <Footer />
      <WhatsAppFAB />

      {/* LIGHTBOX */}
      {active && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-md flex flex-col p-4 sm:p-8 fade-up overflow-y-auto"
          onClick={() => setActiveIndex(null)}
        >
          <button
            aria-label="Close"
            className="fixed top-5 right-5 z-[101] w-11 h-11 rounded-full border border-white/15 text-ivory hover:bg-gold hover:text-ink hover:border-gold transition-all flex items-center justify-center bg-ink/50"
            onClick={() => setActiveIndex(null)}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev Button */}
          {activeIndex > 0 && (
            <button
              aria-label="Previous video"
              className="fixed left-4 top-1/2 -translate-y-1/2 z-[101] w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-white/15 text-ivory hover:bg-gold hover:text-ink hover:border-gold transition-all flex items-center justify-center bg-ink/50"
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}

          {/* Next Button */}
          {activeIndex < TOURS.length - 1 && (
            <button
              aria-label="Next video"
              className="fixed right-4 top-1/2 -translate-y-1/2 z-[101] w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-white/15 text-ivory hover:bg-gold hover:text-ink hover:border-gold transition-all flex items-center justify-center bg-ink/50"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}

          <div
            className="relative w-full max-w-6xl mx-auto my-4 sm:my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video sm:aspect-video bg-black border border-gold/20 shadow-[0_30px_80px_-20px_rgba(197,160,89,0.25)]">
              <video
                key={active.src}
                className="w-full h-full object-contain"
                src={active.src}
                poster={active.poster}
                controls
                autoPlay
                playsInline
              />
            </div>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <div className="text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-1">{active.ref}</div>
                <h4 className="font-serif text-2xl sm:text-3xl text-ivory">{active.title}</h4>
                <div className="flex items-center gap-1.5 mt-1 text-sm text-ivory/60">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  {active.location} · <span className="text-gold">{active.price}</span>
                </div>
              </div>
              <a
                href={inspectLink(active.ref, active.title)}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 bg-whatsapp text-ivory px-6 py-3.5 text-xs tracking-[0.2em] uppercase font-medium hover:brightness-110 transition shrink-0"
              >
                Book Inspection via WhatsApp
              </a>
            </div>

            {/* Video counter */}
            <div className="mt-4 text-center text-xs text-ivory/50 tracking-wider">
              {activeIndex + 1} / {TOURS.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
