import { ImageResponse } from "next/og";

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
          background: "linear-gradient(145deg, #050d1f 0%, #0a1a3d 45%, #0f2050 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow blob */}
        <div style={{ position: "absolute", top: -160, left: "50%", width: 1000, height: 700, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(42,90,200,0.28) 0%, transparent 68%)", transform: "translateX(-50%)", display: "flex" }} />

        {/* Wave mark */}
        <svg width="120" height="48" viewBox="0 0 120 48" style={{ marginBottom: 28 }}>
          <path d="M4 36 Q 20 8 40 28 Q 60 48 80 28 Q 100 8 116 36" stroke="#3b7aff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 36 Q 20 8 40 28 Q 60 48 80 28 Q 100 8 116 36" stroke="rgba(255,255,255,0.18)" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* Wordmark */}
        <div
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 108,
            color: "#ffffff",
            letterSpacing: "-3px",
            lineHeight: 1,
            display: "flex",
          }}
        >
          Vaguéo
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            color: "rgba(255,255,255,0.55)",
            fontFamily: "Helvetica Neue, Arial, sans-serif",
            fontWeight: 400,
            letterSpacing: "0px",
            display: "flex",
          }}
        >
          La file d&apos;attente par vagues dynamiques
        </div>

        {/* Badge */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 999,
            padding: "10px 24px",
            fontSize: 18,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
            fontFamily: "Helvetica Neue, Arial, sans-serif",
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f97316", display: "flex" }} />
          Bêta ouverte · 2026
        </div>
      </div>
    ),
    { ...size },
  );
}
