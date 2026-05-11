import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/cart-store";

const SERVICES = ["Wedding", "Corporate Event", "Birthday", "Conference", "Team Building", "Private Dining"];

export function BookingDialog({ open, onClose, defaultService }: { open: boolean; onClose: () => void; defaultService?: string }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    service: defaultService ?? "Wedding",
    date: "",
    guests: 50,
    name: "",
    phone: "",
    notes: "",
  });

  const next = () => setStep((s) => Math.min(2, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const submit = () => {
    const msg = `Hi Plot 49, I'd like to book:\n\n• Service: ${data.service}\n• Date: ${data.date}\n• Guests: ${data.guests}\n• Name: ${data.name}\n• Phone: ${data.phone}\n• Notes: ${data.notes || "—"}`;
    window.open(buildWhatsAppUrl(msg), "_blank");
    onClose();
    setStep(0);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[70]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[71] grid place-items-center p-4 pointer-events-none"
          >
            <div className="glass rounded-3xl w-full max-w-lg p-6 sm:p-8 pointer-events-auto shadow-luxe">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary">Booking · Step {step + 1} of 3</p>
                  <h3 className="font-display text-2xl mt-1">Reserve Your Date</h3>
                </div>
                <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-full hover:bg-muted">
                  <X size={18} />
                </button>
              </div>

              <div className="h-1.5 rounded-full bg-muted mb-6 overflow-hidden">
                <motion.div className="h-full bg-gradient-luxe" animate={{ width: `${((step + 1) / 3) * 100}%` }} />
              </div>

              <div className="min-h-[220px]">
                {step === 0 && (
                  <div className="space-y-4">
                    <Field label="Service">
                      <select value={data.service} onChange={(e) => setData({ ...data, service: e.target.value })} className={inputCls}>
                        {SERVICES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </Field>
                  </div>
                )}
                {step === 1 && (
                  <div className="space-y-4">
                    <Field label="Event Date">
                      <input type="date" value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} className={inputCls} />
                    </Field>
                    <Field label={`Guests: ${data.guests}`}>
                      <input type="range" min={10} max={300} step={10} value={data.guests} onChange={(e) => setData({ ...data, guests: +e.target.value })} className="w-full accent-[oklch(0.72_0.16_55)]" />
                    </Field>
                  </div>
                )}
                {step === 2 && (
                  <div className="space-y-4">
                    <Field label="Full Name">
                      <input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className={inputCls} placeholder="John Dlamini" />
                    </Field>
                    <Field label="Phone / WhatsApp">
                      <input value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} className={inputCls} placeholder="+27..." />
                    </Field>
                    <Field label="Notes (optional)">
                      <textarea value={data.notes} onChange={(e) => setData({ ...data, notes: e.target.value })} className={`${inputCls} h-20 resize-none`} />
                    </Field>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-6">
                {step > 0 && (
                  <button onClick={prev} className="flex-1 py-3 rounded-xl border border-border hover:bg-muted flex items-center justify-center gap-1">
                    <ChevronLeft size={16} /> Back
                  </button>
                )}
                {step < 2 ? (
                  <button onClick={next} className="flex-1 py-3 rounded-xl bg-gradient-luxe text-primary-foreground font-semibold flex items-center justify-center gap-1 shadow-luxe">
                    Next <ChevronRight size={16} />
                  </button>
                ) : (
                  <button onClick={submit} disabled={!data.name || !data.phone || !data.date} className="flex-1 py-3 rounded-xl bg-gradient-luxe text-primary-foreground font-semibold flex items-center justify-center gap-1 shadow-luxe disabled:opacity-50">
                    <Check size={16} /> Send via WhatsApp
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const inputCls = "w-full px-4 py-3 rounded-xl bg-card/60 border border-border focus:border-primary outline-none transition";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}
