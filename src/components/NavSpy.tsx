"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement only: marks the section currently in view so the
 * header link and the section's rail label turn accent. Content never
 * depends on this running.
 */
export default function NavSpy() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-section]"));
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const setCurrent = (id: string | null) => {
      document.querySelectorAll<HTMLAnchorElement>("a[data-nav]").forEach((a) => {
        if (a.dataset.nav === id) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
      sections.forEach((s) => s.toggleAttribute("data-current", s.id === id));
    };

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setCurrent((hit.target as HTMLElement).id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return null;
}
