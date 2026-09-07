"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "../data";
import { Chat, Moon, Sun } from "./icons";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function BrandLogo({ footer = false }: { footer?: boolean }) {
  return (
    <span className={`brand-logo ${footer ? "brand-logo-footer" : ""}`}>
      <span className="brand-symbol">
        <Image className="logo-light" src={`${basePath}/veritrix-symbol-light.svg`} alt="" width={1040} height={697} priority={!footer} />
        <Image className="logo-dark" src={`${basePath}/veritrix-symbol-dark.svg`} alt="" width={1040} height={697} priority={!footer} />
      </span>
      <span className="brand-name">VERITRIX</span>
    </span>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const saved = localStorage.getItem("veritrix-theme") as "light" | "dark" | null;
    const initial = saved ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = initial;
    queueMicrotask(() => setTheme(initial));
  }, []);

  useEffect(() => {
    if (path !== "/") {
      queueMicrotask(() => setActiveSection(path.slice(1)));
      return;
    }

    const anchors = ["home", "about", "services", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    let frame = 0;
    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const headerHeight = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
        const marker = headerHeight + Math.min(96, window.innerHeight * 0.1);
        const current = anchors.find((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= marker && bounds.bottom > marker;
        });
        if (current) setActiveSection(current.id);
      });
    };
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [path]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("#main > section"));
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      sections.forEach((section) => section.classList.add("scroll-section", "is-visible"));
      return;
    }
    sections.forEach((section) => section.classList.add("scroll-section"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)),
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [path]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("veritrix-theme", next);
    setTheme(next);
  }

  function isActive(label: string) {
    return activeSection === label.toLowerCase();
  }

  function handleNavigation(href: string) {
    setOpen(false);
    const section = href.split("#")[1];
    if (section) window.sessionStorage.setItem("veritrix-section-navigation", section);
    const target = section ? document.getElementById(section) : null;
    if (section === "home") {
      document.getElementById("about")?.classList.remove("is-visible");
      document.getElementById("services")?.classList.remove("is-visible");
      document.getElementById("contact")?.classList.remove("is-visible");
    }
    if (section !== "home" && target?.classList.contains("is-visible")) {
      target.classList.remove("is-visible");
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => target.classList.add("is-visible")));
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <Link className="wordmark" href="/#home" aria-label="VERITRIX home"><BrandLogo /></Link>
        <nav id="mobile-navigation" className={`nav ${open ? "nav-open" : ""}`} aria-label="Primary navigation">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} aria-current={isActive(label) ? "page" : undefined} onClick={() => handleNavigation(href)}>{label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>{theme === "dark" ? <Sun /> : <Moon />}</button>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open} aria-controls="mobile-navigation"><span /><span /></button>
        </div>
      </header>
      <main id="main" key={path} className="page-enter">{children}</main>
      <footer className="site-footer">
        <div><Link className="wordmark footer-mark" href="/#home" aria-label="VERITRIX home"><BrandLogo footer /></Link><p>Thoughtful technology, built with purpose.</p></div>
        <div className="footer-nav"><p className="eyebrow">Navigate</p>{nav.map(([label, href]) => <Link key={href} href={href} onClick={() => handleNavigation(href)}>{label}</Link>)}</div>
        <div className="footer-nav"><p className="eyebrow">Legal</p><Link href="/legal/privacy">Privacy Policy</Link><Link href="/legal/cookies">Cookie Policy</Link><Link href="/legal/terms">Terms of Use</Link><Link href="/legal">Legal Information</Link></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} VERITRIX TEK-STUDIO LLP</span><span>Built with care.</span></div>
      </footer>
      {/* Foundation milestone only: interactive explanation; no chatbot service is connected. */}
      <div className={`chat-placeholder ${chatOpen ? "chat-placeholder-open" : ""}`} id="chat-placeholder" role="status">
        <button onClick={() => setChatOpen(false)} aria-label="Close chat notice">×</button><p className="eyebrow">Chat assistant</p><h3>Coming in a future milestone.</h3><p>No chat service is connected yet. For now, please use the project enquiry form.</p><Link href="/#contact" onClick={() => setChatOpen(false)}>Go to contact →</Link>
      </div>
      <button className="chat-button" onClick={() => setChatOpen(!chatOpen)} aria-expanded={chatOpen} aria-controls="chat-placeholder" aria-label="Open chat assistant information"><Chat /></button>
    </>
  );
}
