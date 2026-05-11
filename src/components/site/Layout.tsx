import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { CartDrawer } from "./CartDrawer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24">{children}</main>
      <Footer />
      <WhatsAppButton />
      <CartDrawer />
    </div>
  );
}
