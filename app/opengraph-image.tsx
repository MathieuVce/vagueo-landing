import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Vaguéo — Libérez vos clients, optimisez votre flux";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  let logoSrc: string | null = null;
  try {
    const buf = readFileSync(join(process.cwd(), "public", "vagueo-logo.png"));
    logoSrc = `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    // file not bundled → fallback to SVG wordmark
  }

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
          background: "linear-gradient(145deg, #050d1f 0%, #0a1a3d 45%, #0f2050 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div style={{ position: "absolute", top: -160, left: "50%", width: 1000, height: 700, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(42,90,200,0.28) 0%, transparent 68%)", transform: "translateX(-50%)", display: "flex" }} />

        {logoSrc ? (
          /* Real logo PNG */
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoSrc} width={260} height={260} style={{ objectFit: "contain", marginBottom: 32 }} />
        ) : (
          /* Fallback: inline wave + wordmark */
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 32 }}>
            <svg width="120" height="48" viewBox="0 0 120 48">
              <path d="M4 36 Q 20 8 40 28 Q 60 48 80 28 Q 100 8 116 36" stroke="rgba(255,255,255,0.18)" strokeWidth="9" fill="none" strokeLinecap="round"/>
              <path d="M4 36 Q 20 8 40 28 Q 60 48 80 28 Q 100 8 116 36" stroke="#3b7aff" strokeWidth="5" fill="none" strokeLinecap="round"/>
            </svg>
            <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 108, color: "#fff", letterSpacing: "-3px", lineHeight: 1, display: "flex", marginTop: 16 }}>Vaguéo</div>
          </div>
        )}

        {/* Tagline */}
        <div style={{ fontSize: 30, color: "rgba(255,255,255,0.55)", fontFamily: "Helvetica Neue, Arial, sans-serif", display: "flex" }}>
          La file d&apos;attente par vagues dynamiques
        </div>

        {/* Badge */}
        <div style={{ position: "absolute", bottom: 48, display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999, padding: "10px 24px", fontSize: 18, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f97316", display: "flex" }} />
          Bêta ouverte · 2026
        </div>
      </div>
    ),
    { ...size },
  );
}
