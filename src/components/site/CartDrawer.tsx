import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { buildWhatsAppUrl, useCart } from "@/lib/cart-store";

export function CartDrawer() {
  const { items, isOpen, toggle, setQty, remove, total } = useCart();
  const sum = total();

  const checkout = () => {
    if (!items.length) return;
    const lines = items
      .map((i) => `• ${i.qty}× ${i.name} — R${(i.price * i.qty).toFixed(2)}`)
      .join("\n");
    const msg = `Hi Plot 49, I'd like to order:\n${lines}\n\nTotal: R${sum.toFixed(2)}`;
    window.open(buildWhatsAppUrl(msg), "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggle(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] z-[61] glass border-l border-border flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-display text-xl">Your Cart</h3>
              <button onClick={() => toggle(false)} className="h-9 w-9 grid place-items-center rounded-full hover:bg-muted">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.length === 0 && (
                <p className="text-center text-muted-foreground py-12">Your cart is empty.</p>
              )}
              {items.map((i) => (
                <div key={i.id} className="flex gap-3 p-3 rounded-xl bg-card/60 border border-border">
                  {i.image && <img src={i.image} alt={i.name} className="h-16 w-16 rounded-lg object-cover" />}
                  <div className="flex-1">
                    <div className="flex justify-between gap-2">
                      <p className="font-medium text-sm">{i.name}</p>
                      <button onClick={() => remove(i.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">R{i.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => setQty(i.id, i.qty - 1)} className="h-7 w-7 grid place-items-center rounded-md bg-muted">
                        <Minus size={12} />
                      </button>
                      <span className="text-sm w-6 text-center">{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} className="h-7 w-7 grid place-items-center rounded-md bg-muted">
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-border space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-display text-2xl text-gradient-gold">R{sum.toFixed(2)}</span>
              </div>
              <button
                disabled={!items.length}
                onClick={checkout}
                className="w-full py-3 rounded-xl bg-gradient-luxe text-primary-foreground font-semibold shadow-luxe disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-glow transition-all"
              >
                Checkout via WhatsApp
              </button>
              <p className="text-[11px] text-center text-muted-foreground">No card needed — confirm your order over WhatsApp.</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
