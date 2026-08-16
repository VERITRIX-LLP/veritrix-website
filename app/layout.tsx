import type { Metadata } from "next";
import { Cinzel_Decorative, Merriweather, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteShell } from "./ui/site-shell";
const bodyFont = Merriweather({ variable: "--font-body", subsets: ["latin"], weight: ["300", "400", "700"] });
const displayFont = Playfair_Display({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"] });
const wordmarkFont = Cinzel_Decorative({ variable: "--font-wordmark", subsets: ["latin"], weight: ["400", "700"] });
export const metadata: Metadata = { title: { default: "VERITRIX — Thoughtful technology, built with purpose", template: "%s | VERITRIX" }, description: "VERITRIX TEK-STUDIO LLP designs and develops thoughtful digital products, software, and automation for growing organisations.", icons: { icon: "/veritrix-symbol-ivory-1024.png", apple: "/veritrix-symbol-ivory-1024.png" } };
export default function RootLayout({ children }: LayoutProps<"/">) { return <html lang="en" suppressHydrationWarning className={`${bodyFont.variable} ${displayFont.variable} ${wordmarkFont.variable}`}><body><SiteShell>{children}</SiteShell></body></html>; }
