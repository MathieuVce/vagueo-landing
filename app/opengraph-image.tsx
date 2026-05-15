import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Vaguéo — Libérez vos clients, optimisez votre flux";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const logoBuffer = readFileSync(join(process.cwd(), "public", "vagueo-logo.png"));
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

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
          position: "relative",
        }}
      >
        {/* Glow */}
        <div style={{ position: "absolute", top: -120, left: "50%", width: 900, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)", transform: "translateX(-50%)", display: "flex" }} />

        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={240} height={240} style={{ objectFit: "contain", marginBottom: 36 }} />

        {/* Tagline */}
        <div style={{ fontSize: 30, color: "rgba(255,255,255,0.65)", textAlign: "center", maxWidth: 680, lineHeight: 1.5, display: "flex", flexWrap: "wrap", justifyContent: "center", fontFamily: "sans-serif" }}>
          La file d'attente par vagues dynamiques.
        </div>

        {/* Badge */}
        <div style={{ position: "absolute", bottom: 44, display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 999, padding: "10px 22px", fontSize: 16, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", fontFamily: "sans-serif" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f97316", display: "flex" }} />
          Bêta ouverte · 2026
        </div>
      </div>
    ),
    { ...size },
  );
}
