import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { useState } from "react";
import { Building2, ChefHat, Sparkles, Mic, Cake, Users } from "lucide-react";
import { BookingDialog } from "@/components/site/BookingDialog";
import hallWedding from "@/assets/hall-wedding.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Bookings — Plot 49 Midrand" },
      { name: "description", content: "Venue hire, catering, decor, AV and full-service event packages at Plot 49 Midrand. Book in seconds via WhatsApp." },
      { property: "og:title", content: "Services & Bookings — Plot 49" },
      { property: "og:description", content: "Venue hire, catering, decor, AV and event packages." },
      { property: "og:image", content: hallWedding },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  { icon: Building2, title: "Venue Hire", text: "Indoor hall, garden marquee and pool deck — flexible layouts for 20 to 250 guests." },
  { icon: ChefHat, title: "Catering", text: "Plated, buffet or canapé menus crafted by our in-house chef using seasonal produce." },
  { icon: Sparkles, title: "Decor & Florals", text: "Drapery, lighting, florals and tablescapes designed around your colour palette." },
  { icon: Mic, title: "AV & Entertainment", text: "DJ, live sound, microphones, projector & uplighting — full technical run." },
  { icon: Cake, title: "Weddings", text: "End-to-end wedding planning from ceremony to reception, with a dedicated coordinator." },
  { icon: Users, title: "Corporate", text: "Conferences, launches and team off-sites with breakouts, lunch and AV." },
];

function ServicesPage() {
  const [open, setOpen] = useState(false);
  const [pre, setPre] = useState<string | undefined>();

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-3">What we do</p>
          <h1 className="font-display text-5xl sm:text-7xl text-gradient-gold">Services & Bookings</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Six core offerings, infinite possibilities. Pick a service to start a tailored quote — confirmed in minutes via WhatsApp.
          </p>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="group relative h-full p-8 rounded-3xl glass overflow-hidden hover:shadow-luxe transition-all">
                {/* bubble morph */}
                <div className="absolute -top-12 -left-12 h-40 w-40 rounded-[44%_56%_61%_39%/45%_43%_57%_55%] bg-gradient-luxe opacity-20 blur-xl group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" />
                <div className="relative">
                  <s.icon className="text-primary mb-4" size={40} />
                  <h3 className="font-display text-2xl mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{s.text}</p>
                  <button
                    onClick={() => { setPre(s.title); setOpen(true); }}
                    className="text-sm font-semibold text-primary hover:text-primary-glow transition"
                  >
                    Book this →
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-20 p-10 rounded-3xl bg-gradient-emerald text-center shadow-luxe">
            <h2 className="font-display text-3xl sm:text-4xl">Not sure which package fits?</h2>
            <p className="mt-3 text-foreground/80">Start a booking and our team will help you tailor it.</p>
            <button onClick={() => { setPre(undefined); setOpen(true); }} className="mt-6 px-7 py-3 rounded-full bg-gradient-luxe text-primary-foreground font-semibold shadow-luxe">
              Open Booking Form
            </button>
          </div>
        </Reveal>
      </section>

      <BookingDialog open={open} onClose={() => setOpen(false)} defaultService={pre} />
    </Layout>
  );
}
