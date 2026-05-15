"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Shield, Clock, CheckSquare } from "lucide-react";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay }}>
      {children}
    </motion.div>
  );
}

const COLORS = [
  { name: "Rose",   hex: "#FF6B9D" },
  { name: "Orange", hex: "#FF9F43" },
  { name: "Citron", hex: "#FECA57" },
  { name: "Menthe", hex: "#1DD1A1" },
  { name: "Ciel",   hex: "#54A0FF" },
];

export default function Security() {
  const [idx, setIdx] = useState(0);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % COLORS.length), 3200);
    return () => clearInterval(id);
  }, []);

  const current = COLORS[idx];

  return (
    <section id="securite" style={{ position: "relative", padding: "120px 0", background: "#0a1530", color: "#fff", overflow: "hidden" }}>
      {/* Radial glows */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 50% 40% at 20% 30%, oklch(0.55 0.20 250 / 0.35), transparent 60%), radial-gradient(ellipse 40% 40% at 90% 80%, oklch(0.62 0.18 60 / 0.18), transparent 60%)" }} />

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px", position: "relative" }}>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 64 }}>
            <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "oklch(0.65 0.16 240)", animation: "pulse 1.8s ease-in-out infinite" }} />
              Sécurité & confiance
            </div>
            <h2 style={{ fontFamily: "var(--font-inter-tight), sans-serif", fontWeight: 600, fontSize: "clamp(34px,4.5vw,60px)", lineHeight: 1.02, letterSpacing: "-0.03em", marginTop: 18, marginBottom: 18, color: "#fff" }}>
              Cinq couleurs.<br />
              Impossible à{" "}
              <span style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "oklch(0.78 0.12 235)" }}>falsifier.</span>
            </h2>
            <p style={{ fontSize: 19, color: "rgba(255,255,255,0.65)", lineHeight: 1.55, maxWidth: 620 }}>
              Notre système anti-fraude tourne sur 5 couleurs qui changent automatiquement à chaque vague. Une capture d'écran est inutile : la couleur d'il y a deux minutes ne marche déjà plus.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 48, alignItems: "center" }} className="security-grid">
          {/* Features */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {[
              { icon: Shield, title: "Rotation automatique", body: "La couleur change automatiquement toutes les minutes. Pas de génération aléatoire côté client : tout vient du serveur, en temps réel.", delay: 0.08 },
              { icon: Clock, title: "Heure live + vague animée", body: "L'écran de validation affiche l'heure réelle et une animation continue. Une capture statique est immédiatement reconnaissable.", delay: 0.16 },
              { icon: CheckSquare, title: "Validation d'un coup d'œil", body: "Votre vendeur compare la couleur de son bandeau avec celle de l'écran client. Si ça correspond, c'est bon. Sinon, c'est non.", delay: 0.24 },
            ].map((f, i) => (
              <Reveal key={i} delay={f.delay}>
                <div style={{ display: "flex", gap: 16, padding: "18px 0" }}>
                  <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <f.icon size={22} color="oklch(0.78 0.12 235)" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.015em", marginBottom: 6 }}>{f.title}</h4>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.55 }}>{f.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Color strip */}
            <div style={{ display: "flex", gap: 10, marginTop: 26, flexWrap: "wrap" }}>
              {COLORS.map((c, i) => (
                <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px 8px 10px", borderRadius: 999, background: i === idx ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)", border: `1px solid ${i === idx ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.10)"}`, fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, letterSpacing: "0.06em", color: i === idx ? "#fff" : "rgba(255,255,255,0.85)", transition: "all 0.3s" }}>
                  <span style={{ width: 14, height: 14, borderRadius: "50%", background: c.hex, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)" }} />
                  {c.name}
                </div>
              ))}
            </div>
          </div>

          {/* Live demo */}
          <Reveal delay={0.12}>
            <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: 32, overflow: "hidden", boxShadow: "0 30px 80px -30px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.08)", background: current.hex, transition: "background 0.8s cubic-bezier(.4,0,.2,1)" }}>
              {/* Animated waves inside demo */}
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <svg viewBox="0 0 800 800" preserveAspectRatio="none" style={{ position: "absolute", left: 0, top: 0, width: "200%", height: "100%", willChange: "transform", animation: "waveLoop 7s linear infinite" }}>
                  <path d="M0 200 Q 100 140 200 200 T 400 200 T 600 200 T 800 200" stroke="rgba(0,0,0,0.18)" strokeWidth="60" fill="none"/>
                  <path d="M0 560 Q 100 500 200 560 T 400 560 T 600 560 T 800 560" stroke="rgba(0,0,0,0.14)" strokeWidth="50" fill="none"/>
                </svg>
                <svg viewBox="0 0 800 800" preserveAspectRatio="none" style={{ position: "absolute", left: 0, top: 0, width: "200%", height: "100%", willChange: "transform", animation: "waveLoop 11s linear infinite", animationDelay: "-4s" }}>
                  <path d="M0 380 Q 100 320 200 380 T 400 380 T 600 380 T 800 380" stroke="rgba(0,0,0,0.10)" strokeWidth="80" fill="none"/>
                </svg>
              </div>
              <div style={{ position: "absolute", top: 18, right: 18, width: 12, height: 12, borderRadius: "50%", background: "rgba(0,0,0,0.6)", animation: "pulse 1s ease-in-out infinite" }} />
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", color: "rgba(0,0,0,0.78)" }}>
                <div style={{ fontFamily: "var(--font-inter-tight), sans-serif", fontWeight: 600, fontSize: 72, letterSpacing: "-0.04em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{clock}</div>
                <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 10, opacity: 0.7 }}>Couleur de validation</div>
              </div>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-end", color: "rgba(0,0,0,0.78)" }}>
                <div style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontStyle: "italic", fontSize: 30, letterSpacing: "-0.02em", lineHeight: 1, transition: "all 0.5s" }}>{current.name}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 920px) { .security-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }
      `}</style>
    </section>
  );
}
