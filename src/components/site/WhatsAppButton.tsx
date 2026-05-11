import { buildWhatsAppUrl } from "@/lib/cart-store";

export function WhatsAppButton() {
  const url = buildWhatsAppUrl("Hi Plot 49, I'm interested in...");
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 h-14 w-14 grid place-items-center rounded-full bg-[oklch(0.6_0.18_145)] text-white shadow-luxe pulse-ring hover:scale-110 transition-transform"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden>
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 01-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 01-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.873 2.722.873.36 0 2.27-.53 2.27-1.404 0-.13-.014-.244-.043-.345-.13-.42-1.46-.94-1.6-.94zM16 28C9.373 28 4 22.627 4 16S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12zm0-2c5.523 0 10-4.477 10-10S21.523 6 16 6 6 10.477 6 16s4.477 10 10 10z"/>
      </svg>
    </a>
  );
}
