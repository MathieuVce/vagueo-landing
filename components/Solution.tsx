"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";

const DemoModal = dynamic(() => import("./demo/DemoModal"), { ssr: false });

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

const steps = [
  { n: "1", title: "Scan", body: "Le client scanne le QR code affiché au stand. Aucune application à installer, ça s'ouvre dans le navigateur.", ember: false },
  { n: "2", title: "Liberté", body: "Il garde son temps d'attente estimé en poche et fait ce qu'il veut : s'asseoir, flâner dans la rue, visiter d'autres stands, finir son café.", ember: false },
  { n: "3", title: "Notification", body: "Quand c'est son tour, son téléphone vibre : «C'est à vous, préparez-vous.» 5 minutes pour rejoindre le stand. Tout est calculé côté serveur.", ember: true },
  { n: "4", title: "Service", body: "Il arrive, montre sa couleur de validation, vous servez. Zéro friction, zéro tension dans la queue.", ember: true },
];

export default function Solution() {
  const [demoOpen, setDemoOpen] = useState(false);
  return (
    <section id="solution" style={{ position: "relative", padding: "120px 0", background: "linear-gradient(180deg, #fbfaf7 0%, oklch(0.95 0.035 235) 100%)", overflow: "hidden" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 64 }}>
            <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#5b6478", display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "oklch(0.65 0.16 240)", animation: "pulse 1.8s ease-in-out infinite" }} />
              La solution Vaguéo
            </div>
            <h2 style={{ fontFamily: "var(--font-inter-tight), sans-serif", fontWeight: 600, fontSize: "clamp(34px,4.5vw,60px)", lineHeight: 1.02, letterSpacing: "-0.03em", marginTop: 18, marginBottom: 18 }}>
              Une{" "}
              <span style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "oklch(0.65 0.16 240)" }}>vague</span>{" "}
              à la fois,<br />jamais une foule.
            </h2>
            <p style={{ fontSize: 19, color: "#5b6478", lineHeight: 1.55, maxWidth: 620 }}>
              Vos clients rejoignent la file en scannant un QR, puis ils sont libres de circuler. Vous, vous continuez à servir : l'algorithme calcule tout seul les groupes à rappeler en fonction de votre cadence.
            </p>
          </div>
        </Reveal>

        {/* Flow steps */}
        <div style={{ position: "relative", marginTop: 40 }}>
          {/* Connector line */}
          <svg style={{ position: "absolute", left: 0, right: 0, top: 60, width: "100%", height: 80, zIndex: 1, pointerEvents: "none" }} viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden className="flow-connect">
            <path d="M40 40 Q 200 0 400 40 T 800 40 T 1160 40" stroke="oklch(0.65 0.16 240 / 0.4)" strokeWidth="2" strokeDasharray="2 6" fill="none"/>
          </svg>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28, position: "relative", zIndex: 2, alignItems: "stretch" }} className="flow-steps">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08} stretch>
                <div style={{ background: "#fff", borderRadius: 20, padding: 26, boxShadow: "0 1px 0 rgba(10,18,36,0.05), 0 16px 40px -20px rgba(10,18,36,0.18)", border: "1px solid rgba(10,18,36,0.05)", flex: 1 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: s.ember ? "linear-gradient(155deg, oklch(0.78 0.10 235) 0%, oklch(0.65 0.16 240) 100%)" : "linear-gradient(155deg, #0a1530 0%, #142a5c 100%)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-instrument-serif), Georgia, serif", fontStyle: "italic", fontSize: 22, marginBottom: 18, boxShadow: s.ember ? "0 8px 18px -8px oklch(0.65 0.16 240)" : "0 8px 18px -8px #142a5c" }}>
                    {s.n}
                  </div>
                  <h3 style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "#5b6478", lineHeight: 1.55 }}>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Tech callout */}
        <div style={{ marginTop: 64 }}>
          <Reveal delay={0.1}>
            <div style={{ background: "linear-gradient(155deg, oklch(0.55 0.14 235) 0%, oklch(0.42 0.13 240) 100%)", color: "#fff", borderRadius: 28, padding: 40, position: "relative", overflow: "hidden" }}>
              {/* Grid bg */}
              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px", maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 80%)", pointerEvents: "none" }} />
              <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", marginBottom: 18, position: "relative" }}>// Pour le client</div>
              <h3 style={{ fontFamily: "var(--font-inter-tight), sans-serif", fontWeight: 600, fontSize: 28, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 14, position: "relative" }}>
                L'attente devient<br/>
                <span style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.95)" }}>une parenthèse,</span>
                <br/>plus une contrainte.
              </h3>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, lineHeight: 1.6, maxWidth: 560, position: "relative" }}>
                Une interface épurée, en français, qui dit l'essentiel : combien de temps il reste, ce qu'il doit faire maintenant. Rien de plus.
              </p>
              <div style={{ display: "flex", gap: 32, marginTop: 28, position: "relative", flexWrap: "wrap" }}>
                {[["< 5", "sec", "Du scan à la file"], ["0", "install", "Tout dans le navigateur"], ["∞", "clients", "Aucune limite de file"]].map(([v, unit, lbl]) => (
                  <div key={lbl}>
                    <div style={{ fontFamily: "var(--font-inter-tight), sans-serif", fontWeight: 600, fontSize: 36, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1 }}>
                      {v}<span style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.75)" }}>&nbsp;{unit}</span>
                    </div>
                    <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", marginTop: 6 }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Demo CTA */}
        <div style={{ marginTop: 48, display: "flex", justifyContent: "center" }}>
          <Reveal delay={0.15}>
            <button
              onClick={() => setDemoOpen(true)}
              style={{
                display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6,
                background: "linear-gradient(155deg, oklch(0.55 0.14 235) 0%, oklch(0.42 0.13 240) 100%)",
                border: 0,
                color: "#fff",
                fontFamily: "var(--font-inter-tight), sans-serif",
                cursor: "pointer",
                padding: "20px 48px", borderRadius: 20,
                boxShadow: "0 8px 32px -8px oklch(0.45 0.16 240 / 0.55), inset 0 1px 0 rgba(255,255,255,0.12)",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 14px 40px -8px oklch(0.45 0.16 240 / 0.65), inset 0 1px 0 rgba(255,255,255,0.12)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px -8px oklch(0.45 0.16 240 / 0.55), inset 0 1px 0 rgba(255,255,255,0.12)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em" }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                  <circle cx="11" cy="11" r="10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
                  <path d="M9 7.5l6 3.5-6 3.5V7.5z" fill="#fff"/>
                </svg>
                Voir la démo interactive
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", letterSpacing: "0.04em" }}>
                2 téléphones · état partagé en temps réel
              </div>
            </button>
          </Reveal>
        </div>
      </div>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />

      <style>{`
        @media (max-width: 860px) { .flow-steps { grid-template-columns: 1fr 1fr !important; } .flow-connect { display: none !important; } }
        @media (max-width: 480px) { .flow-steps { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
