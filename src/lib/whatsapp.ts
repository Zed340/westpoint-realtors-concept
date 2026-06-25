export const WHATSAPP_NUMBER = "2348012345678"; // Replace with real West Point line

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function inspectLink(ref: string, title: string): string {
  return waLink(`Hi West Point Realtors, I'd like to book an inspection for ${ref} — ${title}.`);
}

export function advisorLink(): string {
  return waLink("Hi West Point Realtors, I'd like to speak with an advisor about your portfolio.");
}
