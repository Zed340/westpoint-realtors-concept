import { advisorLink } from "@/lib/whatsapp";

export function WhatsAppFAB() {
  return (
    <a
      href={advisorLink()}
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-40 group"
    >
      <span className="absolute inset-0 rounded-full bg-whatsapp/40 animate-ping opacity-60" style={{ animationDuration: "3s" }} />
      <span className="relative grid place-items-center h-14 w-14 rounded-full bg-whatsapp text-white shadow-lg ring-2 ring-gold/60 transition-transform group-hover:scale-105">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9s-.5-.1-.7.1-.8.9-1 1.1-.4.2-.7.1c-.8-.4-1.7-.9-2.5-1.8-.7-.7-1.2-1.5-1.6-2.4-.2-.3 0-.5.1-.7.1-.1.3-.4.4-.5.1-.1.2-.3.2-.4.1-.2 0-.3 0-.4 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4S5 7.4 5 8.9s1.1 3 1.2 3.2c.1.2 2.1 3.3 5.1 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.1-1.4-.1-.1-.3-.2-.5-.2zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.5.8 3.2 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
        </svg>
      </span>
    </a>
  );
}
