import { PROPERTIES, type Property, type PropertyType, type Intent } from "./properties";

export interface ParsedQuery {
  type: PropertyType | null;
  budgetMin: number | null;
  budgetMax: number | null;
  location: string | null;
  intent: Intent | null;
  raw: string;
}

const TYPE_SYNONYMS: Record<PropertyType, string[]> = {
  duplex: ["duplex", "semi-detached", "semidetached"],
  terrace: ["terrace", "terraced", "townhouse"],
  penthouse: ["penthouse"],
  apartment: ["apartment", "apartments", "flat", "flats", "condo"],
  land: ["land", "plot", "plots", "acre", "acres"],
  mansion: ["mansion", "villa", "estate"],
};

const LOCATIONS = [
  "Banana Island", "Lekki Phase 1", "Lekki Phase 2", "Victoria Island",
  "Lekki", "Ikoyi", "Ikate", "Ajah", "Chevron", "Magodo", "Ikeja",
  "Epe", "Yaba", "Surulere", "Maitama", "Asokoro", "Abuja",
];
// Longer first so multi-word areas beat substrings
const SORTED_LOCATIONS = [...LOCATIONS].sort((a, b) => b.length - a.length);

const ADJACENCY: Record<string, string[]> = {
  "Lekki": ["Ikate", "Chevron", "Ajah", "Lekki Phase 1", "Lekki Phase 2"],
  "Lekki Phase 1": ["Lekki", "Ikate", "Victoria Island"],
  "Ikoyi": ["Victoria Island", "Banana Island"],
  "Victoria Island": ["Ikoyi", "Lekki Phase 1"],
  "Ikate": ["Lekki", "Lekki Phase 1"],
  "Banana Island": ["Ikoyi"],
};

const FILLER = new Set([
  "i", "want", "need", "looking", "for", "a", "an", "the", "in", "around",
  "with", "please", "show", "me", "find", "any", "of", "to", "buy", "get",
  "near", "at", "my", "is", "are", "house", "home", "property",
]);

export function normalize(q: string): string {
  return q.toLowerCase().replace(/[^\w\s.,₦-]/g, " ").replace(/\s+/g, " ").trim();
}

function extractBudget(q: string): { min: number | null; max: number | null } {
  const text = q.replace(/₦|naira|ngn/gi, "").replace(/,/g, "");
  const unit = (u?: string) => {
    if (!u) return 1;
    const x = u.toLowerCase();
    if (x.startsWith("b")) return 1e9;
    if (x.startsWith("m")) return 1e6;
    if (x.startsWith("k") || x.startsWith("th")) return 1e3;
    return 1;
  };
  // Range: "50m - 80m" or "between 50m and 80m"
  const range = text.match(/(\d+(?:\.\d+)?)\s*(b|bn|billion|m|mil|million|k|thousand)?\s*(?:-|to|and)\s*(\d+(?:\.\d+)?)\s*(b|bn|billion|m|mil|million|k|thousand)?/i);
  if (range) {
    const a = parseFloat(range[1]) * unit(range[2] ?? range[4]);
    const b = parseFloat(range[3]) * unit(range[4] ?? range[2]);
    return { min: Math.min(a, b), max: Math.max(a, b) };
  }
  // Single with modifier: "under 150m", "below 200m", "above 50m"
  const single = text.match(/(under|below|less than|up to|max|above|over|min|from)?\s*(\d+(?:\.\d+)?)\s*(b|bn|billion|m|mil|million|k|thousand)/i);
  if (single) {
    const value = parseFloat(single[2]) * unit(single[3]);
    const mod = (single[1] ?? "").toLowerCase();
    if (/above|over|min|from/.test(mod)) return { min: value, max: null };
    return { min: null, max: value };
  }
  // Bare large number (50000000)
  const bare = text.match(/(\d{6,})/);
  if (bare) return { min: null, max: parseFloat(bare[1]) };
  return { min: null, max: null };
}

function extractType(q: string): PropertyType | null {
  for (const [type, syns] of Object.entries(TYPE_SYNONYMS) as [PropertyType, string[]][]) {
    if (syns.some(s => new RegExp(`\\b${s}\\b`, "i").test(q))) return type;
  }
  return null;
}

function extractLocation(q: string): string | null {
  for (const loc of SORTED_LOCATIONS) {
    if (new RegExp(`\\b${loc}\\b`, "i").test(q)) return loc;
  }
  return null;
}

function extractIntent(q: string): Intent | null {
  if (/\b(rent|lease|yield|roi|invest|investment|rental)\b/i.test(q)) return "investment";
  if (/\b(office|shop|warehouse|commercial|retail)\b/i.test(q)) return "commercial";
  if (/\b(live|family|residential|home)\b/i.test(q)) return "residential";
  return null;
}

export function parseQuery(raw: string): ParsedQuery {
  const n = normalize(raw);
  // Strip filler for the type/location pass; budget regex uses original.
  const stripped = n.split(" ").filter(w => !FILLER.has(w)).join(" ");
  const budget = extractBudget(n);
  return {
    raw,
    type: extractType(stripped),
    location: extractLocation(stripped) ?? extractLocation(n),
    budgetMin: budget.min,
    budgetMax: budget.max,
    intent: extractIntent(n),
  };
}

// ---------- Match score ----------

function locationScore(p: Property, q: ParsedQuery): number {
  if (!q.location) return 0.6; // neutral when unspecified
  if (p.location.toLowerCase() === q.location.toLowerCase()) return 1;
  const adj = ADJACENCY[q.location] ?? [];
  if (adj.some(a => a.toLowerCase() === p.location.toLowerCase())) return 0.6;
  if (p.city.toLowerCase() === "lagos" && /lagos|lekki|ikoyi|ajah|ikate|epe|victoria|banana/i.test(q.location)) return 0.3;
  return 0;
}

function budgetScore(p: Property, q: ParsedQuery): number {
  if (q.budgetMax === null && q.budgetMin === null) return 0.6;
  const max = q.budgetMax ?? Infinity;
  const min = q.budgetMin ?? 0;
  if (p.price >= min && p.price <= max) return 1;
  if (q.budgetMax && p.price <= q.budgetMax * 1.1) return 0.7;
  if (q.budgetMax && p.price <= q.budgetMax * 1.25) return 0.4;
  if (q.budgetMin && p.price >= q.budgetMin * 0.9) return 0.6;
  return 0;
}

function typeScore(p: Property, q: ParsedQuery): number {
  if (!q.type) return 0.6;
  if (p.type === q.type) return 1;
  const related: Record<PropertyType, PropertyType[]> = {
    duplex: ["terrace", "mansion"],
    terrace: ["duplex"],
    penthouse: ["apartment"],
    apartment: ["penthouse"],
    mansion: ["duplex"],
    land: [],
  };
  return related[q.type]?.includes(p.type) ? 0.5 : 0;
}

function intentScore(p: Property, q: ParsedQuery): number {
  if (!q.intent) return 0.6;
  return p.intent.includes(q.intent) ? 1 : 0.5;
}

export interface ScoredProperty {
  property: Property;
  score: number;
  checklist: { label: string; passed: boolean }[];
}

export function scoreProperty(p: Property, q: ParsedQuery): ScoredProperty {
  const ls = locationScore(p, q);
  const bs = budgetScore(p, q);
  const ts = typeScore(p, q);
  const is = intentScore(p, q);
  const score = Math.round(100 * (0.35 * ls + 0.30 * bs + 0.20 * ts + 0.15 * is));

  const checklist: { label: string; passed: boolean }[] = [];
  if (q.budgetMax || q.budgetMin) checklist.push({ label: "Within budget", passed: bs >= 1 });
  if (q.location) checklist.push({ label: `Preferred location (${q.location})`, passed: ls >= 1 });
  if (q.type) checklist.push({ label: `Exact property type (${q.type})`, passed: ts >= 1 });
  if (q.intent) checklist.push({ label: `${q.intent[0].toUpperCase()}${q.intent.slice(1)} intent`, passed: is >= 1 });
  if (checklist.length === 0) checklist.push({ label: "Premium verified listing", passed: true });

  return { property: p, score, checklist };
}

export interface SearchResult {
  parsed: ParsedQuery;
  results: ScoredProperty[];
  fallback: boolean;
  fallbackNote?: string;
}

export function search(raw: string): SearchResult {
  const parsed = parseQuery(raw);
  let scored = PROPERTIES.map(p => scoreProperty(p, parsed)).sort((a, b) => b.score - a.score);
  let above = scored.filter(s => s.score >= 60);
  if (above.length > 0) return { parsed, results: above, fallback: false };

  // Fallback: relax budget +20%
  const relaxed: ParsedQuery = {
    ...parsed,
    budgetMax: parsed.budgetMax ? parsed.budgetMax * 1.25 : null,
  };
  scored = PROPERTIES.map(p => scoreProperty(p, relaxed)).sort((a, b) => b.score - a.score);
  const top = scored.slice(0, 4);

  const note = buildFallbackNote(parsed, top[0]?.property);
  return { parsed, results: top, fallback: true, fallbackNote: note };
}

function buildFallbackNote(q: ParsedQuery, suggestion?: Property): string {
  const parts: string[] = ["We couldn't find an exact match"];
  const bits: string[] = [];
  if (q.type) bits.push(`a ${q.type}`);
  if (q.location) bits.push(`in ${q.location}`);
  if (q.budgetMax) bits.push(`under ${formatNaira(q.budgetMax)}`);
  if (bits.length) parts[0] = `We couldn't find ${bits.join(" ")}`;
  if (suggestion) {
    parts.push(`but here is a ${suggestion.type} in ${suggestion.location} our advisors recommend.`);
  }
  return parts.join(" ");
}

export function formatNaira(n: number): string {
  if (n >= 1e9) return `₦${(n / 1e9).toFixed(n % 1e9 === 0 ? 0 : 2)}B`;
  if (n >= 1e6) return `₦${(n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 1)}M`;
  return `₦${n.toLocaleString()}`;
}

export function formatNairaFull(n: number): string {
  return `₦${n.toLocaleString("en-NG")}`;
}
