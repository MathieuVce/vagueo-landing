"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 60, behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? "12px 0" : "18px 0",
        background: scrolled ? "rgba(5,10,26,0.65)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(1.2)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(1.2)" : "none",
        transition: "backdrop-filter 0.3s, background 0.3s, padding 0.3s",
      }}
    >
      <div className="nav-row" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        {/* Brand */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, color: "#fff" }}>
          <span style={{
            width: 40, height: 40, borderRadius: 12,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden", flexShrink: 0,
          }}>
            <Image src="/vagueo-logo.png" alt="Vaguéo" width={52} height={52} style={{ objectFit: "cover" }} />
          </span>
          <span style={{
            fontFamily: "var(--font-instrument-serif), Georgia, serif",
            fontStyle: "italic",
            fontSize: 26,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            color: "#fff",
          }}>Vaguéo</span>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "4px 10px 4px 8px",
            borderRadius: 999,
            background: "oklch(0.72 0.20 50 / 0.18)",
            color: "oklch(0.78 0.18 55)",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 500,
            border: "1px solid oklch(0.72 0.20 50 / 0.35)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "oklch(0.78 0.18 55)", animation: "pulse 1.5s ease-in-out infinite" }} />
            Beta
          </span>
        </a>

        {/* Links */}
        <div className="nav-links" style={{ display: "flex", gap: 30 }}>
          {[["#probleme", "Le problème"], ["#solution", "La solution"], ["#securite", "Sécurité"], ["#roi", "ROI"]].map(([href, label]) => (
            <a key={href} href={href} onClick={scrollTo(href)} style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, fontWeight: 500, transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#contact" onClick={scrollTo("#contact")}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 18px", borderRadius: 999, fontSize: 14, fontWeight: 500, cursor: "pointer",
            background: "linear-gradient(160deg, oklch(0.65 0.16 240) 0%, oklch(0.50 0.16 240) 100%)",
            color: "#fff",
            boxShadow: "0 8px 22px -8px oklch(0.50 0.16 240 / 0.55), inset 0 0 0 1px oklch(0.70 0.14 240)",
            border: 0,
            whiteSpace: "nowrap",
          }}>
          Devenir bêta testeur <span>→</span>
        </a>
      </div>

      <style>{`
        @media (max-width: 760px) { .nav-links { display: none !important; } }
      `}</style>
    </nav>
  );
}
