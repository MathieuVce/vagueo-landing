"use client";

import { useId } from "react";

// ── Tokens ──────────────────────────────────────────────────
export const COLORS = {
  paper: "#fbfaf7", ink: "#11141a", mute: "#6b6f78",
  line: "rgba(17,20,26,0.08)", lineMid: "rgba(17,20,26,0.15)",
  primary: "oklch(0.46 0.13 250)", primarySoft: "oklch(0.92 0.04 250)",
  accent: "oklch(0.74 0.18 55)", accentSoft: "oklch(0.95 0.06 70)",
  success: "oklch(0.42 0.16 142)", successMid: "oklch(0.68 0.15 142)",
  successBg: "oklch(0.94 0.07 142)",
  danger: "#c0392b", dangerBg: "rgba(192,57,43,0.05)",
};

export type Palette = {
  name: string; paper: string; ink: string; mute: string; line: string;
  wait: string; waitSoft: string; call: string; callSoft: string;
};

const BASE: Omit<Palette, "name"> = {
  paper: COLORS.paper, ink: COLORS.ink, mute: COLORS.mute, line: COLORS.line,
  wait: COLORS.primary, waitSoft: COLORS.primarySoft,
  call: COLORS.accent, callSoft: COLORS.accentSoft,
};

export const PALETTES: Record<string, Palette> = {
  classique: { name: "Classique", ...BASE },
  marine: { name: "Marine", ...BASE, paper: "#f6f7f4", ink: "#0a1620", mute: "#5f6b75", line: "rgba(10,22,32,0.08)", wait: "oklch(0.40 0.10 220)", waitSoft: "oklch(0.93 0.03 220)", call: "oklch(0.70 0.18 38)", callSoft: "oklch(0.95 0.06 50)" },
  chaleur: { name: "Chaleur", ...BASE, paper: "#fbf6ee", ink: "#1a1410", mute: "#75695b", line: "rgba(26,20,16,0.08)", wait: "oklch(0.50 0.10 280)", waitSoft: "oklch(0.93 0.03 280)", call: "oklch(0.72 0.20 35)", callSoft: "oklch(0.95 0.08 40)" },
};

export const SECURE_COLORS = [
  { name: "Rose",   hex: "#FF6B9D" },
  { name: "Orange", hex: "#FF9F43" },
  { name: "Citron", hex: "#FECA57" },
  { name: "Menthe", hex: "#1DD1A1" },
  { name: "Ciel",   hex: "#54A0FF" },
];

export const FLOW_LABELS = ["Forte affluence", "Assez chargé", "Flux normal", "Peu chargé", "Faible affluence"];
export const FONT       = '"Inter Tight", "Helvetica Neue", system-ui, -apple-system, sans-serif';
export const FONT_MONO  = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';
export const FONT_SERIF = '"Instrument Serif", "Cormorant Garamond", Georgia, serif';

// ── VagueoLogo ───────────────────────────────────────────────
export function VagueoLogo({ size = 28, color = "currentColor", accent }: { size?: number; color?: string; accent?: string }) {
  const ac = accent || color;
  return (
    <div style={{ display: "inline-flex", alignItems: "baseline", fontFamily: FONT_SERIF, fontStyle: "italic", fontWeight: 400, fontSize: size, lineHeight: 1, color, letterSpacing: "-0.01em" }}>
      <span>Vagu</span>
      <span style={{ position: "relative", display: "inline-block" }}>
        e
        <svg viewBox="0 0 20 8" width={size * 0.55} height={size * 0.22}
          style={{ position: "absolute", left: "50%", top: `-${size * 0.10}px`, transform: "translateX(-50%)", overflow: "visible" }}>
          <path d="M1 5 Q 6 0 10 5 T 19 5" fill="none" stroke={ac} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </span>
      <span>o</span>
    </div>
  );
}

// ── VgButton ─────────────────────────────────────────────────
type VgBtnVariant = "primary" | "ghost" | "danger" | "call";
export function VgButton({ children, onClick, variant = "primary", big = false, blink = false, style = {}, disabled = false, palette }: {
  children: React.ReactNode; onClick?: () => void; variant?: VgBtnVariant;
  big?: boolean; blink?: boolean; style?: React.CSSProperties; disabled?: boolean; palette?: Palette;
}) {
  const p = palette || (BASE as Palette);
  const base: React.CSSProperties = {
    border: 0, outline: "none", cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: FONT, fontWeight: 500, letterSpacing: "-0.01em",
    width: "100%", minHeight: big ? 80 : 56, fontSize: big ? 22 : 17,
    borderRadius: big ? 22 : 16, padding: big ? "20px 24px" : "14px 20px",
    transition: "transform 0.1s ease, background 0.15s",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
    opacity: disabled ? 0.5 : 1,
    animation: blink ? "vagueoBlink 1.6s ease-in-out infinite" : undefined,
  };
  const variants: Record<VgBtnVariant, React.CSSProperties> = {
    primary: { background: p.ink, color: p.paper },
    ghost:   { background: "transparent", color: p.ink, border: `1px solid ${p.line}` },
    danger:  { background: "transparent", color: p.mute, border: `1px solid ${p.line}` },
    call:    { background: p.call, color: "#fff" },
  };
  return <button onClick={disabled ? undefined : onClick} style={{ ...base, ...variants[variant], ...style }}>{children}</button>;
}

// ── WaveBackground ───────────────────────────────────────────
function WaveFluid({ progress = 0.5, color = "#0f1e44", soft = "rgba(15,30,68,0.12)", speed = 1 }: { progress?: number; color?: string; soft?: string; speed?: number }) {
  const uid = useId().replace(/:/g, "");
  const wid = `wv${uid}`;
  const fillY = 800 - 800 * progress;
  const svgBase: React.CSSProperties = { position: "absolute", top: 0, left: 0, width: "200%", height: "100%", willChange: "transform" };
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <svg viewBox="0 0 400 800" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <rect x="0" y={fillY} width="400" height={800 * progress} fill={soft}/>
      </svg>
      <svg viewBox="0 0 800 800" preserveAspectRatio="none" style={{ ...svgBase, animation: `vagueoWaveLoop ${10 / speed}s linear infinite` }}>
        <defs>
          <linearGradient id={`${wid}a`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.10"/>
            <stop offset="100%" stopColor={color} stopOpacity="0.22"/>
          </linearGradient>
        </defs>
        <g transform={`translate(0,${fillY})`}>
          <path fill={`url(#${wid}a)`} d="M0 40 Q 100 0 200 40 T 400 40 T 600 40 T 800 40 L 800 800 L 0 800 Z"/>
        </g>
      </svg>
      <svg viewBox="0 0 800 800" preserveAspectRatio="none" style={{ ...svgBase, animation: `vagueoWaveLoop ${13 / speed}s linear infinite`, animationDelay: "-3s" }}>
        <defs>
          <linearGradient id={`${wid}b`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18"/>
            <stop offset="100%" stopColor={color} stopOpacity="0.32"/>
          </linearGradient>
        </defs>
        <g transform={`translate(0,${fillY + 14})`}>
          <path fill={`url(#${wid}b)`} d="M0 32 Q 100 64 200 32 T 400 32 T 600 32 T 800 32 L 800 800 L 0 800 Z"/>
        </g>
      </svg>
    </div>
  );
}

function WaveGeometric({ progress = 0.5, color = "#0f1e44", soft = "rgba(15,30,68,0.12)", speed = 1 }: { progress?: number; color?: string; soft?: string; speed?: number }) {
  const peaks = 8, w = 400, pw = w / peaks;
  const pts = ["M0 30"];
  for (let i = 0; i <= peaks; i++) pts.push(`L ${i * pw} ${i % 2 === 0 ? 30 : 0}`);
  pts.push(`L ${w} 800 L 0 800 Z`);
  const d = pts.join(" ");
  const fillY = 800 - 800 * progress;
  return (
    <svg viewBox="0 0 400 800" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <rect x="0" y={fillY} width="400" height={800 * progress} fill={soft}/>
      <g style={{ transform: `translateY(${fillY + 12}px)` }}>
        <path d={d} fill={color} opacity="0.16" style={{ animation: `vagueoWaveX ${9 / speed}s linear infinite` }}/>
      </g>
      <g style={{ transform: `translateY(${fillY - 4}px)` }}>
        <path d={d} fill={color} opacity="0.28" style={{ animation: `vagueoWaveX ${6 / speed}s linear infinite reverse` }}/>
      </g>
    </svg>
  );
}

function WaveParticles({ progress = 0.5, color = "#0f1e44", soft = "rgba(15,30,68,0.12)", speed = 1 }: { progress?: number; color?: string; soft?: string; speed?: number }) {
  const fillTop = 800 - 800 * progress;
  const cols = 14;
  const dots: React.ReactNode[] = [];
  const rand = (i: number) => { const x = Math.sin((i + 1) * 12.9898) * 43758.5453; return x - Math.floor(x); };
  for (let row = 0; row < 20; row++) for (let col = 0; col < cols; col++) {
    const baseY = 800 - row * 32 - 20;
    if (baseY < fillTop - 60) continue;
    const r = 3 + rand(row * cols + col) * 3;
    const delay = (rand(row * cols + col + 99) * 4).toFixed(2);
    const op = baseY < fillTop ? 0.35 : 0.7;
    dots.push(<circle key={`${row}-${col}`} cx={(col + 0.5) * (400 / cols)} cy={baseY} r={r} fill={color} opacity={op} style={{ animation: `vagueoFloat ${4 / speed}s ease-in-out ${delay}s infinite` }}/>);
  }
  return (
    <svg viewBox="0 0 400 800" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <rect x="0" y={fillTop} width="400" height={800 - fillTop} fill={soft}/>
      {dots}
    </svg>
  );
}

export function WaveBackground({ variant = "fluid", ...props }: { variant?: "fluid" | "geometric" | "particles"; progress?: number; color?: string; soft?: string; speed?: number }) {
  if (variant === "geometric") return <WaveGeometric {...props}/>;
  if (variant === "particles") return <WaveParticles {...props}/>;
  return <WaveFluid {...props}/>;
}

// ── SecureColorBg ────────────────────────────────────────────
export function SecureColorBg({ bg = "#FF6B9D" }: { bg?: string }) {
  const svgStyle: React.CSSProperties = { position: "absolute", top: 0, left: 0, width: "200%", height: "100%", willChange: "transform" };
  return (
    <div style={{ position: "absolute", inset: 0, background: bg, overflow: "hidden" }}>
      <svg viewBox="0 0 800 800" preserveAspectRatio="none" style={{ ...svgStyle, animation: "vagueoWaveLoop 7s linear infinite" }}>
        <path d="M0 200 Q 100 140 200 200 T 400 200 T 600 200 T 800 200" stroke="rgba(0,0,0,0.18)" strokeWidth="60" fill="none"/>
        <path d="M0 560 Q 100 500 200 560 T 400 560 T 600 560 T 800 560" stroke="rgba(0,0,0,0.14)" strokeWidth="50" fill="none"/>
      </svg>
      <svg viewBox="0 0 800 800" preserveAspectRatio="none" style={{ ...svgStyle, animation: "vagueoWaveLoop 11s linear infinite", animationDelay: "-4s" }}>
        <path d="M0 380 Q 100 320 200 380 T 400 380 T 600 380 T 800 380" stroke="rgba(0,0,0,0.10)" strokeWidth="80" fill="none"/>
        <path d="M0 720 Q 100 660 200 720 T 400 720 T 600 720 T 800 720" stroke="rgba(255,255,255,0.22)" strokeWidth="30" fill="none"/>
      </svg>
    </div>
  );
}
