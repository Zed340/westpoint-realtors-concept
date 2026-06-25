import prop1 from "@/assets/huz 1.jpg";
import prop2 from "@/assets/4.jpeg";
import prop3 from "@/assets/huz 3.jpg";
import prop4 from "@/assets/huz 4.jpg";
import prop5 from "@/assets/huz 5.jpg";
import prop6 from "@/assets/huz6.jpg";

export type PropertyType = "duplex" | "terrace" | "penthouse" | "apartment" | "land" | "mansion";
export type Intent = "residential" | "commercial" | "investment";

export interface Property {
  id: string;
  ref: string;
  title: string;
  type: PropertyType;
  location: string;       // canonical area
  city: string;
  price: number;          // in Naira
  bedrooms?: number;
  intent: Intent[];
  tags: string[];
  image: string;
  description: string;
}

export const PROPERTIES: Property[] = [
  {
    id: "1", ref: "NR-LEK-0421",
    title: "The Aurelius Residences",
    type: "duplex",
    location: "Lekki Phase 1", city: "Lagos",
    price: 185_000_000, bedrooms: 5,
    intent: ["residential", "investment"],
    tags: ["Smart Home Automation", "24/7 Power", "Fully Furnished"],
    image: prop1,
    description: "A 5-bedroom architectural duplex with private cinema and rooftop lounge.",
  },
  {
    id: "2", ref: "NR-IKY-0188",
    title: "Skyline Penthouse, Ikoyi",
    type: "penthouse",
    location: "Ikoyi", city: "Lagos",
    price: 420_000_000, bedrooms: 4,
    intent: ["residential"],
    tags: ["Infinity Pool", "Concierge", "Private Lift"],
    image: prop2,
    description: "Top-floor penthouse with panoramic Atlantic views and private infinity pool.",
  },
  {
    id: "3", ref: "NR-IKT-0072",
    title: "Palm Court Terraces",
    type: "terrace",
    location: "Ikate", city: "Lagos",
    price: 135_000_000, bedrooms: 4,
    intent: ["residential", "investment"],
    tags: ["Gated Estate", "Smart Home", "Finished"],
    image: prop3,
    description: "Boutique 4-bedroom terrace in a 12-unit gated community.",
  },
  {
    id: "4", ref: "NR-BAN-0009",
    title: "Private Island Villa",
    type: "mansion",
    location: "Banana Island", city: "Lagos",
    price: 1_250_000_000, bedrooms: 7,
    intent: ["residential"],
    tags: ["Waterfront", "Private Dock", "Helipad"],
    image: prop4,
    description: "Bespoke 7-bedroom waterfront estate with private dock and concierge.",
  },
  {
    id: "5", ref: "NR-EPE-0301",
    title: "Heritage Land Banking — Epe",
    type: "land",
    location: "Epe", city: "Lagos",
    price: 18_000_000,
    intent: ["investment"],
    tags: ["C of O", "Dry Land", "Gazetted"],
    image: prop5,
    description: "600sqm plots with full C of O in a fast-appreciating corridor.",
  },
  {
    id: "6", ref: "NR-VI-0144",
    title: "Marina View Apartments",
    type: "apartment",
    location: "Victoria Island", city: "Lagos",
    price: 95_000_000, bedrooms: 3,
    intent: ["residential", "investment"],
    tags: ["Serviced", "Gym & Pool", "24/7 Power"],
    image: prop6,
    description: "3-bedroom serviced apartments with marina views and short-let yield.",
  },
];
