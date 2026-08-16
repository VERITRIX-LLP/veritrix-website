"use client";

import { useEffect } from "react";

export function HomeLanding() {
  useEffect(() => {
    const requestedSection = window.sessionStorage.getItem("veritrix-section-navigation");
    window.sessionStorage.removeItem("veritrix-section-navigation");
    if (requestedSection === "about" || requestedSection === "services") return;

    window.history.scrollRestoration = "manual";
    window.history.replaceState(null, "", "#home");
    window.requestAnimationFrame(() => window.scrollTo(0, 0));
  }, []);

  return null;
}
