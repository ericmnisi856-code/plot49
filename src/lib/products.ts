export type Product = {
  id: string;
  name: string;
  price: number;
  category: "Package" | "Catering" | "Add-on";
  description: string;
  image: string;
};

import poolTent from "@/assets/pool-tent.jpg";
import poolUmbrellas from "@/assets/pool-umbrellas.jpg";
import hallWedding from "@/assets/hall-wedding.jpg";
import tableSetting from "@/assets/table-setting.jpg";
import decorStage from "@/assets/decor-stage.jpg";

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Signature Wedding Package", price: 28500, category: "Package", description: "Venue, decor, catering for 80 guests, DJ & coordinator.", image: hallWedding },
  { id: "p2", name: "Corporate Day Package", price: 9800, category: "Package", description: "Conference setup, AV, lunch & coffee station — up to 40 pax.", image: tableSetting },
  { id: "p3", name: "Pool Lounge Hire", price: 4500, category: "Package", description: "Half-day pool & deck hire with seating for 30.", image: poolUmbrellas },
  { id: "p4", name: "Garden Marquee Hire", price: 6200, category: "Package", description: "Premium tent setup with linen, lighting & service team.", image: poolTent },
  { id: "p5", name: "Plated 3-Course Dinner", price: 385, category: "Catering", description: "Per person · seasonal menu, plated service.", image: tableSetting },
  { id: "p6", name: "Buffet Brunch", price: 245, category: "Catering", description: "Per person · sweet & savoury buffet, coffee bar.", image: hallWedding },
  { id: "p7", name: "Cocktail Canapé Platter", price: 680, category: "Catering", description: "Serves 10 · chef's selection of 6 canapés.", image: tableSetting },
  { id: "p8", name: "Premium Decor Add-on", price: 3200, category: "Add-on", description: "Drapery, florals, charger plates & runners.", image: decorStage },
  { id: "p9", name: "DJ & Sound", price: 2800, category: "Add-on", description: "5-hour DJ set with full PA & uplighting.", image: decorStage },
  { id: "p10", name: "Photo Booth", price: 1500, category: "Add-on", description: "3-hour booth with props & instant prints.", image: poolTent },
];
