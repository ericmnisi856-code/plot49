import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { BookingDialog } from "@/components/site/BookingDialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & FAQs — Plot 49 Midrand" },
      { name: "description", content: "Visit Plot 49 in Blue Hills, Midrand. Call 011 046 9483 or message us on WhatsApp." },
      { property: "og:title", content: "Contact Plot 49" },
      { property: "og:description", content: "Visit, call or WhatsApp us — we reply fast." },
    ],
  }),
  component: ContactPage,
});

const FAQ = [
  { q: "What's the maximum capacity?", a: "Up to 250 guests indoors, plus garden and pool deck overflow for larger events." },
  { q: "Do you offer in-house catering?", a: "Yes — plated, buffet and canapé menus crafted by our chef. Custom menus on request." },
  { q: "Is parking available?", a: "Free secure on-site parking for over 80 vehicles." },
  { q: "Can we bring our own decor or DJ?", a: "Absolutely — or use our trusted in-house team for a fully managed experience." },
  { q: "What's the booking deposit?", a: "A 30% deposit secures your date. The balance is due 14 days before the event." },
];

function ContactPage() {
  const [open, setOpen] = useState(false);
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-3">Get in touch</p>
          <h1 className="font-display text-5xl sm:text-7xl text-gradient-gold">Visit Plot 49</h1>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-2 gap-10">
          <Reveal>
            <div className="space-y-6">
              {[
                { icon: MapPin, title: "Address", text: "Plot 49 Plantation Rd, Blue Hills AH, Midrand" },
                { icon: Phone, title: "Phone", text: "011 046 9483" },
                { icon: Mail, title: "Email", text: "hello@plot49.co.za" },
                { icon: Clock, title: "Hours", text: "Mon–Sun · By appointment" },
              ].map((c) => (
                <div key={c.title} className="flex gap-4 p-5 rounded-2xl glass">
                  <div className="h-12 w-12 grid place-items-center rounded-xl bg-gradient-luxe text-primary-foreground shrink-0">
                    <c.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{c.title}</p>
                    <p className="font-display text-lg mt-0.5">{c.text}</p>
                  </div>
                </div>
              ))}
              <button onClick={() => setOpen(true)} className="w-full py-4 rounded-2xl bg-gradient-luxe text-primary-foreground font-semibold shadow-luxe hover:shadow-glow transition">
                Start a Booking
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="aspect-square lg:aspect-auto lg:h-full rounded-3xl overflow-hidden glass">
              <iframe
                title="Plot 49 location"
                className="w-full h-full min-h-[400px]"
                src="https://www.google.com/maps?q=Plantation+Rd,+Blue+Hills,+Midrand&output=embed"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>

        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl mt-24 mb-6">Frequently asked</h2>
        </Reveal>
        <Reveal>
          <Accordion type="single" collapsible className="glass rounded-2xl px-6">
            {FAQ.map((f, i) => (
              <AccordionItem key={i} value={`i${i}`} className="border-border">
                <AccordionTrigger className="text-left font-display text-lg">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      <BookingDialog open={open} onClose={() => setOpen(false)} />
    </Layout>
  );
}
