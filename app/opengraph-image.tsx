import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vaguéo — Libérez vos clients, optimisez votre flux";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a1530",
          fontFamily: "sans-serif",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div style={{ position: "absolute", top: -100, left: "50%", width: 800, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)", transform: "translateX(-50%)", display: "flex" }} />

        {/* Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 999, padding: "10px 22px", fontSize: 16, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f97316", display: "flex" }} />
          Bêta ouverte · 2026
        </div>

        {/* Wordmark */}
        <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 24, display: "flex" }}>
          Vaguéo
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 30, color: "rgba(255,255,255,0.65)", textAlign: "center", maxWidth: 700, lineHeight: 1.45, display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          La file d&apos;attente par vagues dynamiques.
          Libérez vos clients, optimisez votre flux.
        </div>

        {/* Bottom URL */}
        <div style={{ position: "absolute", bottom: 44, fontSize: 17, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", display: "flex" }}>
          vagueo-landing.vercel.app
        </div>
      </div>
    ),
    { ...size },
  );
}
