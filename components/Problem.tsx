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

export default function Problem() {
  return (
    <section id="probleme" style={{ position: "relative", padding: "120px 0", background: "#fbfaf7" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 64 }}>
            <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#5b6478", display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "oklch(0.65 0.16 240)", animation: "pulse 1.8s ease-in-out infinite" }} />
              Le problème
            </div>
            <h2 style={{ fontFamily: "var(--font-inter-tight), sans-serif", fontWeight: 600, fontSize: "clamp(34px,4.5vw,60px)", lineHeight: 1.02, letterSpacing: "-0.03em", marginTop: 18, marginBottom: 18 }}>
              L'attente{" "}
              <span style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "oklch(0.65 0.16 240)" }}>statique</span>{" "}
              tue<br />le panier moyen.
            </h2>
            <p style={{ fontSize: 19, color: "#5b6478", lineHeight: 1.55, maxWidth: 620 }}>
              La file d'attente classique fige tout : vos clients, votre trottoir, votre stand, et leur envie d'acheter ailleurs. Chaque minute debout est une minute perdue pour vous comme pour eux.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "stretch" }} className="problem-grid">
          {/* BAD card */}
          <Reveal delay={0} stretch>
            <div style={{ borderRadius: 28, padding: 40, position: "relative", overflow: "hidden", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", background: "oklch(0.96 0.004 245)", boxShadow: "inset 0 0 0 1px rgba(10,18,36,0.05)", color: "#0a1224" }}>
              <div>
                <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#5b6478", display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#5b6478" }} />
                  Avant · file statique
                </div>
                <div style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontStyle: "italic", fontSize: 32, letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: 14, color: "#5b6478" }}>
                  Ils <span style={{ fontFamily: "var(--font-inter-tight), sans-serif", fontStyle: "normal", fontWeight: 600, color: "#0a1224", letterSpacing: "-0.025em" }}>piétinent</span>, vous perdez.
                </div>
                <p style={{ color: "#5b6478", fontSize: 15, lineHeight: 1.55, maxWidth: 380 }}>
                  Une seule colonne, une seule direction, aucune flexibilité. Le client immobile ne consomme rien d'autre. L'espace est saturé, l'attente paraît interminable.
                </p>
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 0" }}>
                <div style={{ width: "100%", height: 240, position: "relative", borderRadius: 14, overflow: "hidden", background: "radial-gradient(ellipse at 50% 60%, oklch(0.97 0.003 245) 0%, oklch(0.94 0.003 245) 100%)", boxShadow: "inset 0 0 0 1px rgba(10,18,36,0.06)" }}>
                  <svg viewBox="0 0 400 240" style={{ width: "100%", height: "100%", display: "block" }}>
                    <defs>
                      <filter id="sdb">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="1"/><feOffset dx="0" dy="1.5" result="off"/>
                        <feComponentTransfer><feFuncA type="linear" slope="0.35"/></feComponentTransfer>
                        <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                    </defs>
                    <g filter="url(#sdb)">
                      <rect x="172" y="14" width="96" height="24" rx="4" fill="rgba(10,18,36,0.08)" stroke="rgba(10,18,36,0.30)" strokeWidth="1"/>
                      <text x="220" y="33" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#5b6478" letterSpacing="0.12em">STAND</text>
                    </g>
                    <g filter="url(#sdb)">
                      {[56,76,96,116,136,156,176,196].map((y, i) => (
                        <g key={i}>
                          <ellipse cx="220" cy={y + 4} rx="7" ry="3" fill="rgba(10,18,36,0.18)" opacity={i < 2 ? 1 : 0.75}/>
                          <circle cx="220" cy={y} r="5.5" fill={i < 2 ? "#7a7163" : "#9c9486"}/>
                        </g>
                      ))}
                    </g>
                    <line x1="205" y1="45" x2="205" y2="215" stroke="rgba(10,18,36,0.16)" strokeWidth="1" strokeDasharray="2 4"/>
                    <line x1="235" y1="45" x2="235" y2="215" stroke="rgba(10,18,36,0.16)" strokeWidth="1" strokeDasharray="2 4"/>
                    <text x="80" y="130" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="rgba(10,18,36,0.30)" letterSpacing="0.14em">× vide</text>
                    <text x="310" y="130" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="rgba(10,18,36,0.30)" letterSpacing="0.14em">× vide</text>
                  </svg>
                  <div style={{ position: "absolute", bottom: 10, left: 12, fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, color: "#5b6478", letterSpacing: "0.12em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5b6478" }} />
                    8 en file · 28 min d'attente
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* GOOD card */}
          <Reveal delay={0.08} stretch>
            <div style={{ borderRadius: 28, padding: 40, position: "relative", overflow: "hidden", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", background: "linear-gradient(155deg, oklch(0.95 0.035 240) 0%, oklch(0.93 0.045 245) 100%)", boxShadow: "inset 0 0 0 1px oklch(0.80 0.06 245 / 0.30)", color: "#0a1224" }}>
              <div>
                <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.65 0.16 240)", display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "oklch(0.65 0.16 240)", animation: "pulse 1.4s ease-in-out infinite" }} />
                  Avec Vaguéo · flux libre
                </div>
                <div style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontStyle: "italic", fontSize: 32, letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: 14, color: "#5b6478" }}>
                  Ils <span style={{ fontFamily: "var(--font-inter-tight), sans-serif", fontStyle: "normal", fontWeight: 600, color: "#0a1224", letterSpacing: "-0.025em" }}>circulent</span>, vous gagnez.
                </div>
                <p style={{ color: "#5b6478", fontSize: 15, lineHeight: 1.55, maxWidth: 380 }}>
                  Le client scanne le QR, garde son téléphone, et est libre. Le système déclenche les notifications tout seul au bon moment. L'attente devient une opportunité de consommation.
                </p>
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 0" }}>
                <div style={{ width: "100%", height: 240, position: "relative", borderRadius: 14, overflow: "hidden", background: "radial-gradient(ellipse at 50% 60%, oklch(0.95 0.03 235) 0%, oklch(0.93 0.04 240) 100%)", boxShadow: "inset 0 0 0 1px oklch(0.55 0.14 235 / 0.18)" }}>
                  <svg viewBox="0 0 400 240" style={{ width: "100%", height: "100%", display: "block" }}>
                    <defs>
                      <path id="walk1" d="M -10 70 C 60 50, 130 50, 200 80 S 340 110, 410 90"/>
                      <path id="walk2" d="M 410 160 C 320 160, 260 160, 180 155 C 100 150, 30 110, -10 80"/>
                      <path id="walk3" d="M 40 -10 C 40 40, 25 90, 25 135 C 25 185, 60 215, 110 250"/>
                      <path id="walk4" d="M 200 -10 C 295 30, 300 95, 295 160 C 290 215, 350 220, 410 220"/>
                      <filter id="sd"><feGaussianBlur in="SourceAlpha" stdDeviation="1"/><feOffset dx="0" dy="1.5" result="off"/><feComponentTransfer><feFuncA type="linear" slope="0.35"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    </defs>
                    {/* Stand */}
                    <g filter="url(#sd)">
                      <rect x="284" y="14" width="96" height="24" rx="4" fill="oklch(0.55 0.14 235 / 0.18)" stroke="oklch(0.45 0.14 235 / 0.6)" strokeWidth="1"/>
                      <text x="332" y="33" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="oklch(0.35 0.14 240)" letterSpacing="0.12em">STAND</text>
                    </g>
                    {/* Mini queue 2 */}
                    <g filter="url(#sd)">
                      <ellipse cx="332" cy="58" rx="7" ry="3" fill="oklch(0.20 0.10 250 / 0.20)"/>
                      <circle cx="332" cy="54" r="5.5" fill="oklch(0.22 0.10 250)"/>
                      <ellipse cx="332" cy="78" rx="7" ry="3" fill="oklch(0.20 0.10 250 / 0.20)"/>
                      <circle cx="332" cy="74" r="5.5" fill="oklch(0.22 0.10 250)"/>
                    </g>
                    {/* Table */}
                    <g filter="url(#sd)">
                      <ellipse cx="100" cy="128" rx="30" ry="15" fill="oklch(0.55 0.14 235 / 0.10)" stroke="oklch(0.45 0.14 235 / 0.55)" strokeWidth="1"/>
                      <ellipse cx="100" cy="126" rx="22" ry="10" fill="oklch(0.92 0.04 235)" stroke="oklch(0.45 0.14 235 / 0.4)" strokeWidth="0.5"/>
                    </g>
                    {/* Seated */}
                    <g filter="url(#sd)">
                      <ellipse cx="68" cy="126" rx="5" ry="2" fill="oklch(0.45 0.14 235 / 0.20)"/>
                      <circle cx="68" cy="124" r="4.5" fill="oklch(0.45 0.14 235 / 0.7)"/>
                      <ellipse cx="134" cy="132" rx="5" ry="2" fill="oklch(0.45 0.14 235 / 0.20)"/>
                      <circle cx="134" cy="130" r="4.5" fill="oklch(0.45 0.14 235 / 0.7)"/>
                    </g>
                    {/* Bench */}
                    <g filter="url(#sd)">
                      <rect x="180" y="185" width="72" height="8" rx="2" fill="oklch(0.55 0.14 235 / 0.30)" stroke="oklch(0.45 0.14 235 / 0.5)" strokeWidth="0.5"/>
                    </g>
                    <g filter="url(#sd)">
                      <ellipse cx="204" cy="180" rx="5" ry="2" fill="oklch(0.45 0.14 235 / 0.18)"/>
                      <circle cx="204" cy="178" r="4.5" fill="oklch(0.45 0.14 235 / 0.7)"/>
                      <ellipse cx="228" cy="180" rx="5" ry="2" fill="oklch(0.45 0.14 235 / 0.18)"/>
                      <circle cx="228" cy="178" r="4.5" fill="oklch(0.45 0.14 235 / 0.7)"/>
                    </g>
                    {/* Moving people */}
                    <g filter="url(#sd)">
                      <g><ellipse cx="0" cy="6" rx="7" ry="2.5" fill="oklch(0.20 0.10 250 / 0.22)"/><circle r="5.5" fill="oklch(0.22 0.10 250)"/>
                        <animateMotion dur="15s" repeatCount="indefinite" rotate="auto"><mpath href="#walk1"/></animateMotion>
                      </g>
                      <g><ellipse cx="0" cy="6" rx="7" ry="2.5" fill="oklch(0.45 0.14 235 / 0.22)"/><circle r="5" fill="oklch(0.40 0.14 240 / 0.85)"/>
                        <animateMotion dur="19s" repeatCount="indefinite" rotate="auto" begin="-3s"><mpath href="#walk2"/></animateMotion>
                      </g>
                      <g><ellipse cx="0" cy="6" rx="7" ry="2.5" fill="oklch(0.20 0.10 250 / 0.22)"/><circle r="5" fill="oklch(0.22 0.10 250 / 0.85)"/>
                        <animateMotion dur="22s" repeatCount="indefinite" rotate="auto" begin="-9s"><mpath href="#walk3"/></animateMotion>
                      </g>
                      <g><ellipse cx="0" cy="6" rx="6" ry="2" fill="oklch(0.45 0.14 235 / 0.22)"/><circle r="4.5" fill="oklch(0.50 0.14 240 / 0.8)"/>
                        <animateMotion dur="17s" repeatCount="indefinite" rotate="auto" begin="-6s"><mpath href="#walk4"/></animateMotion>
                      </g>
                    </g>
                  </svg>
                  <div style={{ position: "absolute", bottom: 10, left: 12, fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, color: "oklch(0.65 0.16 240)", letterSpacing: "0.12em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "oklch(0.65 0.16 240)", animation: "pulse 1.4s ease-in-out infinite" }} />
                    2 en file · le reste circule
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) { .problem-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 760px) { section { padding: 80px 0 !important; } }
      `}</style>
    </section>
  );
}
