"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const NAV_LINKS: [string, string][] = [
  ["#probleme", "Le problème"],
  ["#solution", "La solution"],
  ["#securite", "Sécurité"],
  ["#roi", "ROI"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 760) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(id);
    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 60, behavior: "smooth" });
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        padding: scrolled ? "12px 0" : "18px 0",
        background: scrolled || menuOpen ? "rgba(5,10,26,0.90)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(14px) saturate(1.2)" : "none",
        WebkitBackdropFilter: scrolled || menuOpen ? "blur(14px) saturate(1.2)" : "none",
        transition: "backdrop-filter 0.3s, background 0.3s, padding 0.3s",
      }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>

          {/* Brand */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, color: "#fff", flexShrink: 0 }}>
            <span style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
              <Image src="/vagueo-logo.png" alt="Vaguéo" width={52} height={52} style={{ objectFit: "cover" }} />
            </span>
            <span style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontStyle: "italic", fontSize: 26, letterSpacing: "-0.02em", lineHeight: 1, color: "#fff" }}>Vaguéo</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px 4px 8px", borderRadius: 999, background: "oklch(0.72 0.20 50 / 0.18)", color: "oklch(0.78 0.18 55)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, border: "1px solid oklch(0.72 0.20 50 / 0.35)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "oklch(0.78 0.18 55)", animation: "pulse 1.5s ease-in-out infinite" }} />
              Beta
            </span>
          </a>

          {/* Desktop links */}
          <div className="nav-links" style={{ display: "flex", gap: 30 }}>
            {NAV_LINKS.map(([href, label]) => (
              <a key={href} href={href} onClick={scrollTo(href)}
                style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, fontWeight: 500, transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
                {label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a href="#contact" onClick={scrollTo("#contact")} className="nav-cta"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 999, fontSize: 14, fontWeight: 500, cursor: "pointer", background: "linear-gradient(160deg, oklch(0.65 0.16 240) 0%, oklch(0.50 0.16 240) 100%)", color: "#fff", boxShadow: "0 8px 22px -8px oklch(0.50 0.16 240 / 0.55), inset 0 0 0 1px oklch(0.70 0.14 240)", border: 0, whiteSpace: "nowrap", textDecoration: "none" }}>
            Devenir bêta testeur <span>→</span>
          </a>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(o => !o)} className="nav-burger" aria-label="Menu"
            style={{ display: "none", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 5, width: 40, height: 40, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, cursor: "pointer", flexShrink: 0, padding: 0 }}>
            <span style={{ display: "block", width: 18, height: 1.5, background: "#fff", borderRadius: 2, transition: "transform 0.2s, opacity 0.2s", transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: 18, height: 1.5, background: "#fff", borderRadius: 2, transition: "opacity 0.2s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 18, height: 1.5, background: "#fff", borderRadius: 2, transition: "transform 0.2s, opacity 0.2s", transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
          </button>
        </div>

        {/* Mobile menu */}
        <div className="nav-mobile-menu" style={{
          display: menuOpen ? "flex" : "none",
          flexDirection: "column",
          padding: "16px 24px 24px",
          gap: 4,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          marginTop: 8,
        }}>
          {NAV_LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={scrollTo(href)}
              style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, fontWeight: 500, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", textDecoration: "none" }}>
              {label}
            </a>
          ))}
          <a href="#contact" onClick={scrollTo("#contact")}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 16, padding: "14px 18px", borderRadius: 999, fontSize: 15, fontWeight: 500, cursor: "pointer", background: "linear-gradient(160deg, oklch(0.65 0.16 240) 0%, oklch(0.50 0.16 240) 100%)", color: "#fff", boxShadow: "0 8px 22px -8px oklch(0.50 0.16 240 / 0.55), inset 0 0 0 1px oklch(0.70 0.14 240)", border: 0, textDecoration: "none" }}>
            Devenir bêta testeur →
          </a>
        </div>
      </nav>

      <style>{`
        @media (max-width: 760px) {
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
