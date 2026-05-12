import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Users, Heart, Briefcase, Wifi, Tv, Waves, Baby, Music, ChefHat } from "lucide-react";
import { BookingDialog } from "@/components/site/BookingDialog";
import poolTent from "@/assets/pool-tent.jpg";
import poolUmbrellas from "@/assets/pool-umbrellas.jpg";
import hallWedding from "@/assets/hall-wedding.jpg";
import tableSetting from "@/assets/table-setting.jpg";
import decorStage from "@/assets/decor-stage.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Private Corporate Retreats & Garden Venues Midrand | Plot 49" },
      { name: "description", content: "Discover a secluded boutique venue in Midrand. Plot 49 offers private executive meeting spaces and tranquil garden breakout areas, far from the noise of big hotel crowds." },
      { property: "og:title", content: "Private Corporate Retreats & Garden Venues Midrand | Plot 49" },
      { property: "og:description", content: "Discover a secluded boutique venue in Midrand. Plot 49 offers private executive meeting spaces and tranquil garden breakout areas, far from the noise of big hotel crowds." },
      { property: "og:image", content: hallWedding },
      { name: "keywords", content: "Private meeting space, Boutique corporate venue, Garden conference Midrand, Executive retreats Gauteng, Corporate events Midrand, Privacy venue" },
    ],
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EventVenue",
          "name": "Plot 49",
          "description": "Exclusive boutique venue in Midrand offering private corporate retreats, executive meeting spaces, and tranquil garden breakout areas away from hotel crowds.",
          "url": "https://plot49.co.za",
          "telephone": "+27-123-456-7890",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Midrand",
            "addressRegion": "Gauteng",
            "addressCountry": "South Africa"
          },
          "areaServed": "Midrand, Johannesburg, Gauteng",
          "keywords": "Private meeting space, Boutique corporate venue, Garden conference Midrand, Executive retreats Gauteng, Corporate events Midrand",
          "amenityFeature": [
            "Swimming Pool",
            "Free WiFi",
            "Private Gardens",
            "Professional AV Equipment",
            "Catering Services",
            "DJ & Sound System"
          ],
          "offers": {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Corporate Venue Hire",
              "description": "Private boutique venue for corporate events, executive retreats, and strategy meetings"
            }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "25"
          }
        })
      }
    ]
  }),
  component: Home,
});

const SLIDES = [
  { img: hallWedding, kicker: "Weddings", title: "Romance, redefined." },
  { img: poolTent, kicker: "Garden Events", title: "Open-air elegance." },
  { img: tableSetting, kicker: "Fine Dining", title: "Crafted to delight." },
  { img: decorStage, kicker: "Decor", title: "Curated ambience." },
];

const HEADLINES = [
  "Exclusive Private Corporate Events in a Natural Midrand Setting",
  "Where Unforgettable Moments Come to Life.",
  "Corporate Events. Elevated.",
];

function Home() {
  const [slide, setSlide] = useState(0);
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const target = HEADLINES[headlineIdx];
    let i = 0;
    setTyped("");
    const tick = setInterval(() => {
      i++;
      setTyped(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(tick);
        setTimeout(() => setHeadlineIdx((h) => (h + 1) % HEADLINES.length), 2800);
      }
    }, 45);
    return () => clearInterval(tick);
  }, [headlineIdx]);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative -mt-24 h-screen min-h-[640px] w-full overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img src={SLIDES[slide].img} alt={SLIDES[slide].kicker === "Garden Events" ? "Secluded outdoor corporate meeting area with pool and gardens in Midrand" : SLIDES[slide].kicker === "Weddings" ? "Luxury wedding venue with elegant decor and ambiance in Midrand" : SLIDES[slide].kicker === "Fine Dining" ? "Premium dining setup for corporate events and private functions at Plot 49" : "Sophisticated event decor and staging for exclusive corporate gatherings"} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.16_0.02_60/0.4),oklch(0.16_0.02_60/0.92))]" />
          </motion.div>
        </AnimatePresence>

        {/* particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-primary/40"
              style={{
                width: 2 + Math.random() * 4,
                height: 2 + Math.random() * 4,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -40, 0], opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 6 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 4 }}
            />
          ))}
        </div>

        <div className="relative z-10 h-full mx-auto max-w-7xl px-6 flex flex-col justify-end pb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.4em] text-primary mb-4 flex items-center gap-2"
          >
            <Sparkles size={14} /> {SLIDES[slide].kicker} · {SLIDES[slide].title}
          </motion.p>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[1.05] max-w-4xl">
            <span className="text-gradient-gold">{typed}</span>
            <span className="inline-block w-[3px] h-[0.9em] align-middle bg-primary ml-1 animate-pulse" />
          </h1>
          <p className="mt-6 max-w-xl text-lg text-foreground/80">
            Plot 49 — a private venue in Blue Hills, Midrand. Lush gardens, a sparkling pool, refined interiors and a team that handles every detail.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => setBookingOpen(true)} className="group px-7 py-4 rounded-full bg-gradient-luxe text-primary-foreground font-semibold shadow-luxe hover:shadow-glow transition-all flex items-center gap-2">
              Book Your Date <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
            </button>
            <Link to="/gallery" className="px-7 py-4 rounded-full glass font-semibold hover:bg-primary/10 transition">
              Explore Venue
            </Link>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)} className={`h-1.5 rounded-full transition-all ${i === slide ? "w-8 bg-primary" : "w-3 bg-foreground/30"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-3">Why Plot 49</p>
          <h2 className="font-display text-4xl sm:text-5xl max-w-2xl">A Tranquil Boutique Alternative to Midrand Hotels</h2>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {[
            { icon: Heart, title: "Weddings", text: "From intimate ceremonies to grand celebrations — every detail tailored to your love story." },
            { icon: Briefcase, title: "Corporate", text: "Conferences, launches and team retreats with seamless AV, catering and coordination." },
            { icon: Users, title: "Team Building", text: "Pool, gardens, games and chef-curated menus — productivity meets play." },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div className="group relative h-full p-8 rounded-3xl glass overflow-hidden hover:shadow-luxe transition-all">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-luxe opacity-20 blur-2xl group-hover:opacity-40 transition" />
                <c.icon className="text-primary mb-4" size={36} />
                <h3 className="font-display text-2xl mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PARALLAX FACILITIES */}
      <section
        className="relative py-32 parallax-bg"
        style={{ backgroundImage: `url(${poolUmbrellas})` }}
        aria-label="Private garden venue for executive retreats Gauteng with pool and outdoor meeting spaces"
      >
        <div className="absolute inset-0 bg-background/85" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.4em] text-primary mb-3">Amenities</p>
            <h2 className="font-display text-4xl sm:text-5xl mb-12">Secluded Meeting Spaces for Strategy & Planning</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Wifi, label: "Free WiFi" },
              { icon: Tv, label: "TV / Sports" },
              { icon: Waves, label: "Swimming Pool" },
              { icon: Baby, label: "Kids Playground" },
              { icon: ChefHat, label: "Pro Waitstaff" },
              { icon: Music, label: "DJ & Sound" },
            ].map((a, i) => (
              <Reveal key={a.label} delay={i * 0.05}>
                <div className="aspect-square glass rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-primary/10 hover:scale-105 transition-all">
                  <a.icon className="text-primary" size={28} />
                  <span className="text-xs text-center">{a.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* THE ANTI-HOTEL EXPERIENCE */}
      <section className="py-24 mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-3">The Plot 49 Difference</p>
          <h2 className="font-display text-4xl sm:text-5xl mb-12">The Anti-Hotel Experience</h2>
          <div className="prose prose-lg max-w-4xl text-foreground/80 leading-relaxed">
            <p className="mb-6">
              Escape the corporate hotel chains and discover a truly exclusive-use estate where your privacy is paramount. At Plot 49, we specialize in <strong>discreet business strategy sessions</strong> and executive retreats that demand confidentiality and focus.
            </p>
            <p className="mb-6">
              Our <strong>exclusive-use estate</strong> ensures your team has complete privacy for sensitive discussions, brainstorming sessions, and strategic planning. Unlike crowded hotel conference centers, you'll find <strong>lush green breakout zones</strong> where ideas flow naturally amid tranquil gardens and sparkling pool views.
            </p>
            <p className="mb-8">
              Experience the perfect blend of professional sophistication and natural serenity—where productive meetings seamlessly transition into relaxed networking in our private outdoor spaces. This is boutique corporate hospitality redefined for discerning teams who value privacy, nature, and exceptional service.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">100%</span>
                </div>
                <h3 className="font-semibold mb-2">Exclusive Use</h3>
                <p className="text-sm text-muted-foreground">Your event gets complete privacy—no sharing with other guests</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">0</span>
                </div>
                <h3 className="font-semibold mb-2">Hotel Crowds</h3>
                <p className="text-sm text-muted-foreground">Just your team in a peaceful, focused environment</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">∞</span>
                </div>
                <h3 className="font-semibold mb-2">Natural Serenity</h3>
                <p className="text-sm text-muted-foreground">Lush gardens and tranquil spaces for creative thinking</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SOCIAL */}
      <section className="py-24 mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-3">@plot49midrand</p>
          <h2 className="font-display text-4xl sm:text-5xl mb-12">Moments from our venue.</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { src: hallWedding, alt: "Elegant wedding hall setup at Plot 49 boutique venue in Midrand" },
            { src: tableSetting, alt: "Fine dining table setting for corporate events at exclusive Midrand venue" },
            { src: decorStage, alt: "Professional event decor and staging for private corporate functions" },
            { src: poolUmbrellas, alt: "Secluded outdoor corporate meeting area with pool and gardens in Midrand" },
            { src: poolTent, alt: "Private garden venue for executive retreats Gauteng with marquee setup" },
            { src: hallWedding, alt: "Luxury venue interior for exclusive corporate events in Midrand" },
            { src: tableSetting, alt: "Gourmet catering setup for private business meetings at Plot 49" },
            { src: decorStage, alt: "Sophisticated event decor for boutique corporate gatherings" }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="group relative aspect-square overflow-hidden rounded-2xl">
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl p-12 sm:p-20 text-center bg-gradient-emerald shadow-luxe">
            <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: `url(${decorStage})`, backgroundSize: "cover" }} />
            <div className="relative">
              <h2 className="font-display text-4xl sm:text-6xl">Let's plan something extraordinary.</h2>
              <p className="mt-4 text-lg text-foreground/80 max-w-xl mx-auto">Tell us your date and vision — our team replies on WhatsApp within the hour.</p>
              <button onClick={() => setBookingOpen(true)} className="mt-8 px-8 py-4 rounded-full bg-gradient-luxe text-primary-foreground font-semibold shadow-luxe hover:shadow-glow transition">
                Start Your Booking
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      <BookingDialog open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </Layout>
  );
}
