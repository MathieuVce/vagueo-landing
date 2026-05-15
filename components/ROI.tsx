"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

function Reveal({ children, delay = 0, stretch = false }: { children: React.ReactNode; delay?: number; stretch?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay }}
      style={stretch ? { height: "100%", display: "flex", flexDirection: "column" } : {}}>
      {children}
    </motion.div>
  );
}

const stats = [
  { val: "+38", sym: "%", lbl: "Panier moyen", desc: "Libéré de la file, le client garde son envie d'acheter intacte — et la dépense ailleurs en attendant son tour.", src: "Estimé", warm: true, delay: 0 },
  { val: "−72", sym: "%", lbl: "Abandon de file", desc: "Plus de «j'attends 40 minutes, je laisse tomber.» Le client connaît son temps d'attente exact en permanence.", src: "Mesuré", warm: false, delay: 0.08 },
  { val: "4,8", sym: "/5", lbl: "Satisfaction équipe", desc: "Vos vendeurs ne gèrent plus la frustration de la queue. Ils servent, plus vite, plus calmement.", src: "Terrain", warm: true, delay: 0.16 },
];

const perks = [
  ["Accompagnement gratuit", "de A à Z, sur place ou à distance."],
  ["Installation en 5 minutes", "-> un QR à imprimer, c'est tout."],
  ["Formation incluse", "pour vous et votre équipe."],
  ["Aucun engagement", "-> vous arrêtez quand vous voulez."],
];

export default function ROI() {
  return (
    <section id="roi" style={{ position: "relative", padding: "120px 0", background: "#fbfaf7" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 64 }}>
            <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#5b6478", display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "oklch(0.65 0.16 240)", animation: "pulse 1.8s ease-in-out infinite" }} />
              Business ROI
            </div>
            <h2 style={{ fontFamily: "var(--font-inter-tight), sans-serif", fontWeight: 600, fontSize: "clamp(34px,4.5vw,60px)", lineHeight: 1.02, letterSpacing: "-0.03em", marginTop: 18, marginBottom: 18 }}>
              Un client qui ne piétine pas<br />
              <span style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "oklch(0.78 0.10 235)" }}>consomme ailleurs.</span>
            </h2>
            <p style={{ fontSize: 19, color: "#5b6478", lineHeight: 1.55, maxWidth: 620 }}>
              Festival, food-truck, restaurant de rue, boutique, drop sneakers, pop-up store… Partout où une file se forme, chaque minute libérée est une minute pendant laquelle votre client peut acheter ailleurs, revenir une autre fois, ou simplement repartir content.
            </p>
          </div>
        </Reveal>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginBottom: 40, alignItems: "stretch" }} className="roi-grid">
          {stats.map(s => (
            <Reveal key={s.lbl} delay={s.delay} stretch>
              <div style={{ padding: "36px 32px", borderRadius: 28, position: "relative", overflow: "hidden", flex: 1, background: s.warm ? "linear-gradient(155deg, oklch(0.95 0.035 235) 0%, #fff 100%)" : "linear-gradient(155deg, oklch(0.97 0.025 240) 0%, #fff 100%)", border: `1px solid ${s.warm ? "oklch(0.85 0.06 240)" : "oklch(0.88 0.05 240)"}` }}>
                <div style={{ position: "absolute", top: 32, right: 32, fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, color: "#5b6478", letterSpacing: "0.12em", textTransform: "uppercase" }}>// {s.src}</div>
                <div style={{ fontFamily: "var(--font-inter-tight), sans-serif", fontWeight: 600, fontSize: 64, letterSpacing: "-0.04em", lineHeight: 1, color: s.warm ? "oklch(0.65 0.16 240)" : "#142a5c" }}>
                  {s.val}<span style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontStyle: "italic", fontWeight: 400, color: s.warm ? "oklch(0.78 0.10 235)" : "oklch(0.65 0.16 240)" }}>{s.sym}</span>
                </div>
                <div style={{ fontFamily: "var(--font-inter-tight), sans-serif", fontSize: 15, fontWeight: 500, marginTop: 14, letterSpacing: "-0.01em" }}>{s.lbl}</div>
                <div style={{ fontSize: 13, color: "#5b6478", marginTop: 6, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Beta card */}
        <Reveal delay={0.1}>
          <div style={{ padding: 48, background: "linear-gradient(155deg, #fff 0%, oklch(0.97 0.03 240) 100%)", borderRadius: 28, border: "1px solid rgba(10,18,36,0.05)", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48, alignItems: "center", position: "relative", overflow: "hidden" }} className="beta-card">
            <div style={{ position: "absolute", top: "-40%", right: "-10%", width: "50%", height: "180%", background: "radial-gradient(ellipse at 50% 50%, oklch(0.65 0.16 240 / 0.10), transparent 60%)", pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px 6px 10px", borderRadius: 999, background: "oklch(0.95 0.035 235)", color: "oklch(0.65 0.16 240)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, marginBottom: 18, border: "1px solid oklch(0.82 0.07 240)" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "oklch(0.65 0.16 240)", animation: "pulse 1.4s ease-in-out infinite" }} />
                Beta ouverte
              </div>
              <div style={{ fontFamily: "var(--font-inter-tight), sans-serif", fontWeight: 600, fontSize: 32, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: 14, position: "relative" }}>
                On démarre.<br />
                <span style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "oklch(0.65 0.16 240)" }}>Testez avant tout le monde.</span>
              </div>
              <p style={{ color: "#5b6478", fontSize: 15, lineHeight: 1.6, maxWidth: 460, marginBottom: 24, position: "relative" }}>
                Vaguéo ouvre son programme pilote en 2026. Les 10 premiers partenaires sont accompagnés gratuitement : votre retour terrain façonne directement le produit.
              </p>
              <a href="#contact" onClick={e => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 26px", borderRadius: 999, fontWeight: 500, fontSize: 16, cursor: "pointer", background: "linear-gradient(160deg, oklch(0.65 0.16 240) 0%, oklch(0.50 0.16 240) 100%)", color: "#fff", boxShadow: "0 8px 22px -8px oklch(0.50 0.16 240 / 0.55), inset 0 0 0 1px oklch(0.70 0.14 240)", border: 0, textDecoration: "none" }}>
                Réserver mon créneau de test <span>→</span>
              </a>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14, position: "relative" }}>
              {perks.map(([strong, rest]) => (
                <li key={strong} style={{ display: "flex", gap: 12, fontSize: 14, lineHeight: 1.5, color: "#0a1224" }}>
                  <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "oklch(0.95 0.035 235)", color: "oklch(0.65 0.16 240)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, marginTop: 1 }}>✓</span>
                  <span><strong style={{ fontWeight: 600 }}>{strong}</strong> {rest}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 860px) { .roi-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 760px) { .beta-card { grid-template-columns: 1fr !important; padding: 36px !important; gap: 32px !important; } }
      `}</style>
    </section>
  );
}
