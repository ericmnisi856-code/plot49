import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { PRODUCTS } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { useState } from "react";
import { Plus } from "lucide-react";
import tableSetting from "@/assets/table-setting.jpg";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "Catering Store — Plot 49 Midrand" },
      { name: "description", content: "Order catering packages, event extras and decor add-ons. Checkout via WhatsApp — no card required." },
      { property: "og:title", content: "Catering & Packages Store — Plot 49" },
      { property: "og:description", content: "Build your event basket and checkout on WhatsApp." },
      { property: "og:image", content: tableSetting },
    ],
  }),
  component: StorePage,
});

const CATS = ["All", "Package", "Catering", "Add-on"] as const;

function StorePage() {
  const add = useCart((s) => s.add);
  const toggle = useCart((s) => s.toggle);
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");

  const items = cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-3">Shop</p>
          <h1 className="font-display text-5xl sm:text-7xl text-gradient-gold">Packages & Catering</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Build your event basket. Checkout sends your order straight to our team on WhatsApp — we confirm pricing and dates.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                cat === c ? "bg-gradient-luxe text-primary-foreground shadow-luxe" : "glass hover:bg-primary/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.04}>
              <div className="group relative rounded-3xl glass overflow-hidden hover:shadow-luxe transition-all">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:contrast-110 transition-all duration-700"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[10px] uppercase tracking-widest text-primary">{p.category}</p>
                  <h3 className="font-display text-xl mt-1">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2 min-h-[40px]">{p.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-2xl text-gradient-gold">R{p.price.toLocaleString()}</span>
                    <button
                      onClick={() => { add({ id: p.id, name: p.name, price: p.price, image: p.image }); toggle(true); }}
                      className="h-10 w-10 grid place-items-center rounded-full bg-gradient-luxe text-primary-foreground hover:shadow-glow transition"
                      aria-label="Add to cart"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </Layout>
  );
}
