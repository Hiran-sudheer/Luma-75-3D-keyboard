import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PurchasePreview } from "@/components/PurchasePreview";

const robotoFlex = localFont({
  src: "../public/fonts/roboto-flex.woff2",
  variable: "--font-roboto-flex",
  display: "swap",
  weight: "100 1000",
});

export const metadata: Metadata = {
  title: "Luma 75 | A little more in your element",
  description: "Meet Luma 75. A considered mechanical keyboard with sculpted keycaps, a satisfying feel, and a finish that feels like you.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="en"><body className={`${robotoFlex.variable} antialiased`}><Navbar /><main id="main">{children}</main><Footer /><PurchasePreview /></body></html>;
}
