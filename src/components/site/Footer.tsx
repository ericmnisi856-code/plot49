import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 py-16 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="Plot 49" className="h-12 w-auto" />
            <span className="font-display text-xl text-gradient-gold">Plot 49</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Where unforgettable moments come to life — Midrand's premium venue for weddings, corporate &amp; celebrations.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/store" className="hover:text-primary">Catering Store</Link></li>
            <li><Link to="/gallery" className="hover:text-primary">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Visit</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin size={16} className="text-primary mt-0.5" />Plot 49 Plantation Rd,<br/>Blue Hills AH, Midrand</li>
            <li className="flex gap-2"><Phone size={16} className="text-primary mt-0.5" />011 046 9483</li>
            <li className="flex gap-2"><Mail size={16} className="text-primary mt-0.5" />hello@plot49.co.za</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Follow</h4>
          <div className="flex gap-3">
            {[Instagram, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-10 w-10 grid place-items-center rounded-full glass hover:scale-110 hover:shadow-glow transition-all duration-300"
                aria-label="Social"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border/50 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Plot 49 Midrand. All rights reserved.
      </div>
    </footer>
  );
}
