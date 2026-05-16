"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// 3D anchor positions — all on the front hemisphere (sin(lon) > 0) so they're
// visible together at yaw=0, spread upper-left / right-center / lower-left.
const TAG_3D = [
  { lat:  0.50, lon: 2.09, dot: "oklch(0.75 0.18 145)", text: "3 places · 12 min" }, // upper-left
  { lat:  0.00, lon: 0.78, dot: "oklch(0.78 0.10 235)", text: "C'est à vous" },       // right-center
  { lat: -0.45, lon: 2.50, dot: "oklch(0.78 0.12 235)", text: "Couleur · Ciel" },     // lower-left
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbRef    = useRef<HTMLDivElement>(null);
  const bgRef     = useRef<HTMLDivElement>(null);
  const tagRefs   = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // Parallax — background waves only
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < window.innerHeight && bgRef.current)
        bgRef.current.style.transform = `translateY(${y * 0.32}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 3D canvas globe + tag projection
  useEffect(() => {
    const canvas = canvasRef.current;
    const orbEl  = orbRef.current;
    if (!canvas || !orbEl) return;

    const ctx = canvas.getContext("2d")!;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      canvas!.width  = Math.max(1, rect.width  * DPR);
      canvas!.height = Math.max(1, rect.height * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("resize", resize);

    let yaw = 0.0, pitch = -0.22;
    let velYaw = 0.0025, velPitch = 0;
    let dragging = false, lastX = 0, lastY = 0;

    function sph(lat: number, lon: number) {
      const cLat = Math.cos(lat);
      return { x: cLat * Math.cos(lon), y: Math.sin(lat), z: cLat * Math.sin(lon) };
    }
    function rot(p: { x: number; y: number; z: number }) {
      const cY = Math.cos(yaw), sY = Math.sin(yaw);
      const cX = Math.cos(pitch), sX = Math.sin(pitch);
      const x1 = p.x * cY + p.z * sY, z1 = -p.x * sY + p.z * cY;
      const y1 = p.y * cX - z1 * sX, z2 = p.y * sX + z1 * cX;
      return { x: x1, y: y1, z: z2 };
    }
    function buildLat(lat: number, seg = 96) {
      const pts = [];
      for (let i = 0; i <= seg; i++) pts.push(sph(lat, (i / seg) * Math.PI * 2));
      return pts;
    }
    function buildMer(lon: number, seg = 80) {
      const pts = [];
      for (let i = 0; i <= seg; i++) pts.push(sph(-Math.PI / 2 + (i / seg) * Math.PI, lon));
      return pts;
    }
    function buildWave(baseLat: number, amp: number, k: number, phase: number, seg = 220) {
      const pts = [];
      for (let i = 0; i <= seg; i++) {
        const lon = (i / seg) * Math.PI * 2;
        pts.push(sph(baseLat + amp * Math.sin(k * lon + phase), lon));
      }
      return pts;
    }

    type Pt = ReturnType<typeof sph>;
    const latitudes: Pt[][] = [];
    for (let i = -5; i <= 5; i++) { if (i !== 0) latitudes.push(buildLat((i * 15) * Math.PI / 180)); }
    const equator  = buildLat(0, 128);
    const meridians: Pt[][] = [];
    for (let i = 0; i < 12; i++) meridians.push(buildMer((i / 12) * Math.PI * 2));

    function strokePoly(points: Pt[], rgb: string, baseAlpha: number, lw: number) {
      const w = canvas!.clientWidth, h = canvas!.clientHeight;
      const cx = w / 2, cy = h / 2, R = Math.min(cx, cy) * 0.86;
      ctx.lineCap = "round";
      for (let i = 0; i < points.length - 1; i++) {
        const a = rot(points[i]), b = rot(points[i + 1]);
        const z = (a.z + b.z) / 2, t = (z + 1) / 2;
        const kk = t * t * (3 - 2 * t);
        const alpha = (0.06 + 0.94 * kk) * baseAlpha;
        ctx.beginPath();
        ctx.moveTo(cx + a.x * R, cy - a.y * R);
        ctx.lineTo(cx + b.x * R, cy - b.y * R);
        ctx.strokeStyle = `rgba(${rgb},${alpha.toFixed(3)})`;
        ctx.lineWidth = lw * (0.65 + 0.55 * kk);
        ctx.stroke();
      }
    }

    // Pre-compute the 3D sphere points for the tags
    const tagPts = TAG_3D.map(t => sph(t.lat, t.lon));

    let wt = 0, rafId: number;
    function frame() {
      const w = canvas!.clientWidth, h = canvas!.clientHeight;
      ctx.clearRect(0, 0, w, h);

      if (!dragging) {
        yaw   += velYaw;   pitch += velPitch;
        velYaw   *= 0.96;  velPitch *= 0.92;
        if (Math.abs(velYaw) < 0.0018) velYaw = 0.0018;
        pitch += (-0.22 - pitch) * 0.01;
      }
      pitch = Math.max(-Math.PI / 2 + 0.15, Math.min(Math.PI / 2 - 0.15, pitch));
      wt += 0.014;

      const cx = w / 2, cy = h / 2, R = Math.min(cx, cy) * 0.86;

      // Silhouette ring
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(180,210,255,0.14)";
      ctx.lineWidth = 1; ctx.stroke();

      // Wireframe
      for (const c of latitudes) strokePoly(c, "210,228,255", 0.22, 0.7);
      for (const m of meridians) strokePoly(m, "210,228,255", 0.22, 0.7);
      strokePoly(equator, "210,228,255", 0.34, 0.9);

      // Waves
      strokePoly(buildWave( 0.18,  0.14, 2,  wt * 0.6),  "180,220,255", 0.55, 1.0);
      strokePoly(buildWave(-0.10,  0.20, 4, -wt * 0.85), "200,225,255", 0.85, 1.3);
      strokePoly(buildWave( 0.05,  0.26, 3,  wt),        "230,240,255", 0.95, 1.5);

      // Project tags onto the canvas and update their DOM positions
      tagPts.forEach((p, i) => {
        const r  = rot(p);
        const sx = cx + r.x * R;
        const sy = cy - r.y * R;
        const el = tagRefs[i].current;
        if (!el) return;
        el.style.left    = `${(sx / w) * 100}%`;
        el.style.top     = `${(sy / h) * 100}%`;
        // Fade out when tag drifts to back of sphere
        el.style.opacity        = r.z > -0.15 ? "1" : "0";
        el.style.pointerEvents  = r.z > 0 ? "auto" : "none";
      });

      rafId = requestAnimationFrame(frame);
    }
    frame();

    // Drag interaction
    const stop = () => { velYaw = 0; velPitch = 0; };
    orbEl.addEventListener("pointerdown", (e) => {
      dragging = true; lastX = e.clientX; lastY = e.clientY;
      try { orbEl.setPointerCapture(e.pointerId); } catch (_) {}
      stop();
    });
    orbEl.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      yaw   += dx * 0.0085; pitch += dy * 0.0085;
      velYaw = dx * 0.0035; velPitch = dy * 0.0035;
      lastX = e.clientX; lastY = e.clientY;
    });
    const release = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      try { orbEl.releasePointerCapture(e.pointerId); } catch (_) {}
    };
    orbEl.addEventListener("pointerup",     release);
    orbEl.addEventListener("pointercancel", release);
    orbEl.addEventListener("pointerleave",  release);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const revealProps = {
    initial:    { opacity: 0, y: 28 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] as [number, number, number, number] },
  };

  return (
    <header className="hero-header" style={{
      position: "relative", minHeight: "100vh", color: "#fff",
      background: `
        radial-gradient(ellipse 80% 60% at 75% 30%, oklch(0.45 0.18 245 / 0.6), transparent 60%),
        radial-gradient(ellipse 60% 50% at 15% 80%, oklch(0.55 0.20 245 / 0.4), transparent 60%),
        linear-gradient(180deg, #050a1a 0%, #0a1530 50%, #142a5c 100%)`,
      overflow: "hidden", padding: "140px 0 120px", display: "flex", alignItems: "center",
    }}>
      {/* Background waves */}
      <div ref={bgRef} aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, opacity: 0.45 }}>
        {[
          { dur: "18s", d: "M0 460 Q 200 380 400 460 T 800 460 T 1200 460 T 1600 460 L 1600 600 L 0 600 Z", fill: "oklch(0.55 0.20 250 / 0.18)", delay: "0s" },
          { dur: "26s", d: "M0 500 Q 200 420 400 500 T 800 500 T 1200 500 T 1600 500 L 1600 600 L 0 600 Z", fill: "oklch(0.65 0.18 240 / 0.16)", delay: "-8s" },
          { dur: "36s", d: "M0 540 Q 200 460 400 540 T 800 540 T 1200 540 T 1600 540 L 1600 600 L 0 600 Z", fill: "oklch(0.45 0.15 250 / 0.18)", delay: "-14s" },
        ].map((w, i) => (
          <svg key={i} viewBox="0 0 1600 600" preserveAspectRatio="none"
            style={{ position: "absolute", left: 0, bottom: 0, width: "200%", height: "100%", willChange: "transform", animation: `waveLoop ${w.dur} linear infinite`, animationDelay: w.delay }}>
            <path d={w.d} fill={w.fill} />
          </svg>
        ))}
      </div>

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 64, alignItems: "center" }} className="hero-grid">

          {/* Left: text */}
          <div>
            <motion.div {...revealProps}
              style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "oklch(0.65 0.16 240)", animation: "pulse 1.8s ease-in-out infinite" }} />
              Bêta ouverte · Phase pilote 2026
            </motion.div>

            <motion.h1 {...revealProps} transition={{ ...revealProps.transition, delay: 0.08 }}
              style={{ fontFamily: "var(--font-inter-tight), sans-serif", fontWeight: 600, fontSize: "clamp(44px,6.4vw,86px)", lineHeight: 0.98, letterSpacing: "-0.035em", marginBottom: 26 }}>
              Libérez vos clients,<br />
              optimisez votre{" "}
              <span style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "oklch(0.78 0.10 235)", letterSpacing: "-0.025em" }}>flux.</span>
            </motion.h1>

            <motion.p {...revealProps} transition={{ ...revealProps.transition, delay: 0.16 }}
              style={{ fontSize: "clamp(16px,1.4vw,19px)", lineHeight: 1.6, color: "rgba(255,255,255,0.72)", maxWidth: 520, marginBottom: 36 }}>
              La première file d'attente par{" "}
              <em style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontStyle: "italic", color: "oklch(0.78 0.10 235)" }}>vagues dynamiques</em>.
              Vos clients ne piétinent plus : ils circulent, consomment, et reviennent quand c'est leur tour.
              <br /><br />
              <strong style={{ color: "#fff", fontWeight: 500 }}>On est en phase de prototypage, venez tester gratuitement.</strong> Vos retours façonnent directement le produit.
            </motion.p>

            <motion.div {...revealProps} transition={{ ...revealProps.transition, delay: 0.24 }}
              style={{ marginBottom: 56 }}>
              <div className="hero-ctas" style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                <a href="#contact" onClick={e => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 26px", borderRadius: 999, fontWeight: 500, fontSize: 16, cursor: "pointer", background: "linear-gradient(160deg, oklch(0.65 0.16 240) 0%, oklch(0.50 0.16 240) 100%)", color: "#fff", boxShadow: "0 8px 22px -8px oklch(0.50 0.16 240 / 0.55), inset 0 0 0 1px oklch(0.70 0.14 240)", border: 0, textDecoration: "none" }}>
                  Devenir bêta testeur <span>→</span>
                </a>
                <a href="#solution" onClick={e => { e.preventDefault(); document.querySelector("#solution")?.scrollIntoView({ behavior: "smooth" }); }}
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 26px", borderRadius: 999, fontWeight: 500, fontSize: 16, cursor: "pointer", background: "transparent", color: "#fff", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.22)", border: 0, textDecoration: "none" }}>
                  Voir la solution
                </a>
              </div>
            </motion.div>

            <motion.div {...revealProps} transition={{ ...revealProps.transition, delay: 0.32 }}
              style={{ display: "flex", gap: 28, flexWrap: "wrap", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              {["Gratuit pendant la bêta", "PWA · zéro install", "Anti-fraude intégré"].map(txt => (
                <span key={txt} style={{ display: "inline-flex", alignItems: "center", gap: 8, lineHeight: 1 }}>
                  <span style={{ width: 14, height: 14, borderRadius: "50%", background: "oklch(0.65 0.18 145 / 0.25)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ display: "block", width: 3, height: 6, borderRight: "1.5px solid oklch(0.75 0.18 145)", borderBottom: "1.5px solid oklch(0.75 0.18 145)", transform: "rotate(45deg) translate(-0.5px,-1px)" }} />
                  </span>
                  {txt}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: orb */}
          <motion.div className="hero-art-wrap" {...revealProps} transition={{ ...revealProps.transition, delay: 0.16 }}
            aria-hidden
            style={{ position: "relative", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", perspective: 1400 }}>

            {/* Halo */}
            <div style={{ position: "absolute", inset: "4%", borderRadius: "50%", background: "radial-gradient(circle at 50% 50%, oklch(0.65 0.16 240 / 0.45), transparent 60%), radial-gradient(circle at 30% 70%, oklch(0.55 0.18 250 / 0.55), transparent 65%)", filter: "blur(30px)", animation: "haloDrift 9s ease-in-out infinite", pointerEvents: "none" }} />
            {/* Rings */}
            {["0%", "8%", "16%"].map((inset, i) => (
              <div key={i} style={{ position: "absolute", inset, borderRadius: "50%", boxShadow: `inset 0 0 0 1px rgba(255,255,255,${0.06 - i * 0.015})`, pointerEvents: "none" }} />
            ))}

            {/* Orb — canvas + tags positioned relative to it */}
            <div ref={orbRef} style={{ position: "relative", width: "86%", aspectRatio: "1/1", cursor: "grab", animation: "orbFloat 8s ease-in-out infinite", willChange: "transform", userSelect: "none", touchAction: "none", filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.55)) drop-shadow(0 0 50px oklch(0.55 0.20 250 / 0.35))" }}>
              <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />

              {/* Tags — JS drives left/top each frame from 3D projection */}
              {TAG_3D.map((tag, i) => (
                <div key={i} ref={tagRefs[i]}
                  style={{
                    position: "absolute",
                    left: "50%", top: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: 14,
                    padding: "9px 13px",
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: 11,
                    letterSpacing: "0.04em",
                    color: "rgba(255,255,255,0.88)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    whiteSpace: "nowrap",
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                  }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: tag.dot, flexShrink: 0 }} />
                  {tag.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave transition */}
      <svg style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 140, pointerEvents: "none", zIndex: 3, width: "100%" }} viewBox="0 0 1600 140" preserveAspectRatio="none" aria-hidden>
        <path d="M0 60 Q 200 0 400 60 T 800 60 T 1200 60 T 1600 60 L 1600 140 L 0 140 Z" fill="#fbfaf7" />
      </svg>

      <style>{`
        @media (max-width: 920px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .hero-header { padding: 100px 0 80px !important; }
          .hero-art-wrap { max-width: 320px !important; margin: 0 auto !important; }
        }
        @media (max-width: 600px) {
          .hero-ctas { flex-direction: column !important; }
          .hero-ctas a { width: 100% !important; box-sizing: border-box !important; }
        }
        @media (max-width: 480px) {
          .hero-header { padding: 90px 0 60px !important; }
          .hero-art-wrap { max-width: 260px !important; }
        }
      `}</style>
    </header>
  );
}
