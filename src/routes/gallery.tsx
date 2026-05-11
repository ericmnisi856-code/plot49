import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import poolTent from "@/assets/pool-tent.jpg";
import poolUmbrellas from "@/assets/pool-umbrellas.jpg";
import hallWedding from "@/assets/hall-wedding.jpg";
import tableSetting from "@/assets/table-setting.jpg";
import decorStage from "@/assets/decor-stage.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery & Facilities — Plot 49 Midrand" },
      { name: "description", content: "Tour the venue: hall, pool, gardens, decor and table settings. See empty-vs-decorated transformations." },
      { property: "og:title", content: "Gallery & Facilities — Plot 49" },
      { property: "og:description", content: "Inside the venue at Plot 49 Midrand." },
      { property: "og:image", content: poolTent },
    ],
  }),
  component: GalleryPage,
});

function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  };
  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] rounded-3xl overflow-hidden cursor-ew-resize select-none touch-none"
      onMouseMove={(e) => onMove(e.clientX)}
      onTouchMove={(e) => onMove(e.touches[0].clientX)}
    >
      <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt="Before" className="absolute inset-0 h-full w-[100vw] max-w-none object-cover" style={{ width: ref.current?.clientWidth }} />
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-glow" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-gradient-luxe grid place-items-center text-primary-foreground font-bold shadow-luxe">⇆</div>
      </div>
      <span className="absolute top-3 left-3 px-3 py-1 rounded-full glass text-xs">Before</span>
      <span className="absolute top-3 right-3 px-3 py-1 rounded-full glass text-xs">After</span>
    </div>
  );
}

function PanoramaTilt({ src, label }: { src: string; label: string }) {
  const x = useMotionValue(0);
  const bgX = useTransform(x, [-1, 1], ["75%", "25%"]);
  return (
    <div
      className="relative aspect-[16/9] rounded-3xl overflow-hidden group"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
      }}
    >
      <motion.div
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: `url(${src})`, backgroundPositionX: bgX, backgroundSize: "150% 100%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-6 left-6">
        <p className="text-xs uppercase tracking-widest text-primary">360° feel</p>
        <h3 className="font-display text-2xl">{label}</h3>
        <p className="text-xs text-muted-foreground mt-1">Move your cursor to pan</p>
      </div>
    </div>
  );
}

function GalleryPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-3">See the venue</p>
          <h1 className="font-display text-5xl sm:text-7xl text-gradient-gold">Gallery & Facilities</h1>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-2xl mt-16 mb-4">Before &amp; After</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">Drag the slider — the same hall, transformed.</p>
          <BeforeAfter before={poolTent} after={hallWedding} />
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <Reveal><PanoramaTilt src={poolUmbrellas} label="Relax by the Pool" /></Reveal>
          <Reveal delay={0.1}><PanoramaTilt src={poolTent} label="Garden & Marquee" /></Reveal>
        </div>

        <Reveal>
          <h2 className="font-display text-2xl mt-20 mb-6">Moments</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[hallWedding, tableSetting, decorStage, poolUmbrellas, poolTent, decorStage].map((src, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="group relative aspect-square overflow-hidden rounded-2xl">
                <img src={src} alt="" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </Layout>
  );
}
