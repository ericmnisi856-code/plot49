import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { useCart } from "@/lib/cart-store";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/store", label: "Store" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const count = useCart((s) => s.count());
  const toggleCart = useCart((s) => s.toggle);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [loc.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`glass rounded-2xl flex items-center justify-between px-4 transition-all duration-500 ${
            scrolled ? "py-2 shadow-luxe" : "py-3"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Plot 49" className={`transition-all ${scrolled ? "h-9" : "h-11"} w-auto`} />
            <span className="hidden sm:block font-display text-lg tracking-wide text-gradient-gold">
              Plot 49
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => {
              const active = loc.pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    active ? "text-primary" : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {n.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-gradient-luxe rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleCart(true)}
              aria-label="Open cart"
              className="relative h-10 w-10 grid place-items-center rounded-full glass hover:bg-primary/20 transition"
            >
              <ShoppingBag size={18} />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 min-w-5 h-5 px-1 grid place-items-center rounded-full bg-gradient-luxe text-[10px] font-bold text-primary-foreground"
                >
                  {count}
                </motion.span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden h-10 w-10 grid place-items-center rounded-full glass"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 glass rounded-2xl p-2"
            >
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="block px-4 py-3 rounded-xl hover:bg-primary/10 text-sm font-medium"
                >
                  {n.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
