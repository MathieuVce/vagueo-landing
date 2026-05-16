"use client";

import { useState } from "react";
import { Palette, FONT, FONT_MONO, FONT_SERIF, SECURE_COLORS, FLOW_LABELS, VagueoLogo, VgButton, WaveBackground, SecureColorBg } from "./design";

// ── ScreenSplash ─────────────────────────────────────────────
export function ScreenSplash({ palette: p, onJoin, estimatedMin = 15, standName, isOpen = true, isPaused = false, isFull = false }: { palette: Palette; onJoin: () => void; estimatedMin?: number; standName?: string; isOpen?: boolean; isPaused?: boolean; isFull?: boolean }) {
  const unavail = !isOpen || isPaused || isFull;
  return (
    <div style={{ width: "100%", height: "100%", background: p.paper, color: p.ink, fontFamily: FONT, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", paddingTop: 54, animation: "vagueoFadeIn 0.4s ease" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.4 }}>
        <svg viewBox="0 0 400 800" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          {[0,1,2].map(i => <path key={i} d={`M-50 ${600 + i*40} Q 100 ${540 + i*40} 200 ${600 + i*40} T 450 ${600 + i*40}`} stroke={p.line} strokeWidth="1" fill="none"/>)}
        </svg>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", position: "relative" }}>
        <VagueoLogo size={64} color={p.ink} accent={p.wait}/>
        {standName ? (
          <>
            <div style={{ marginTop: 16, fontFamily: FONT_SERIF, fontStyle: "italic", fontSize: 28, letterSpacing: "-0.02em", textAlign: "center" }}>{standName}</div>
            <div style={{ marginTop: 4, fontSize: 11, color: p.mute, letterSpacing: "0.14em", textTransform: "uppercase" }}>File d&apos;attente · sans inscription</div>
          </>
        ) : (
          <div style={{ marginTop: 12, fontSize: 12, color: p.mute, letterSpacing: "0.16em", textTransform: "uppercase" }}>File d&apos;attente · sans inscription</div>
        )}
        {unavail ? (
          <div style={{ marginTop: 48, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 99, background: p.line, color: p.mute, fontSize: 13, fontWeight: 500 }}>
              <span style={{ fontSize: 15 }}>{isPaused ? "❚❚" : isFull ? "◉" : "×"}</span>
              {isPaused ? "Stand en pause" : isFull ? "File complète" : "La file est fermée"}
            </div>
            <div style={{ fontSize: 13, color: p.mute, lineHeight: 1.6, maxWidth: 260 }}>
              {isPaused ? "Le vendeur a momentanément suspendu la file. Revenez dans quelques instants." : isFull ? "La file a atteint sa capacité maximale." : "Le stand n'est pas encore disponible."}
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 48, textAlign: "center" }}>
            <div style={{ fontSize: 12, color: p.mute, textTransform: "uppercase", letterSpacing: "0.14em" }}>Temps d&apos;attente estimé</div>
            <div style={{ marginTop: 8, fontFamily: FONT_SERIF, fontStyle: "italic", fontSize: 56, lineHeight: 1 }}>
              {estimatedMin}<span style={{ fontSize: 22, color: p.mute, marginLeft: 6 }}>min</span>
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: "0 22px 40px", display: "flex", flexDirection: "column", gap: 10, position: "relative" }}>
        {!unavail ? (
          <>
            <VgButton onClick={onJoin} palette={p}>Rejoindre la file <span style={{ opacity: 0.6 }}>→</span></VgButton>
            <div style={{ fontSize: 11, color: p.mute, textAlign: "center", lineHeight: 1.5 }}>Pas d&apos;inscription, pas de compte.<br/>Votre place est conservée dans ce navigateur.</div>
          </>
        ) : (
          <div style={{ fontSize: 11, color: p.mute, textAlign: "center", lineHeight: 1.5 }}>Powered by <span style={{ fontStyle: "italic" }}>Vaguéo</span></div>
        )}
      </div>
    </div>
  );
}

// ── ScreenAttente ────────────────────────────────────────────
export function ScreenAttente({ palette: p, waveVariant = "fluid", estimatedMin, waitingStatus, presentCount, isPaused = false, onLeave }: { palette: Palette; waveVariant?: "fluid" | "geometric" | "particles"; estimatedMin: number; waitingStatus: "red" | "orange"; presentCount: number; isPaused?: boolean; onLeave: () => void }) {
  const isOrange = waitingStatus === "orange";
  const accent = isOrange ? p.call : p.wait;
  const accentSoft = isOrange ? p.callSoft : p.waitSoft;

  if (isPaused) {
    return (
      <div style={{ width: "100%", height: "100%", background: isOrange ? "#fff8f0" : p.paper, color: p.ink, fontFamily: FONT, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", animation: "vagueoFadeIn 0.3s ease" }}>
        <div style={{ position: "relative", zIndex: 2, padding: "54px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <VagueoLogo size={20} color={p.ink} accent={p.wait}/>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px 5px 8px", borderRadius: 99, background: "rgba(211,47,47,0.08)", color: "#d32f2f", border: "1px solid rgba(211,47,47,0.2)", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: "#d32f2f", animation: "vagueoSlowPulse 1.4s ease-in-out infinite" }}/>
            En pause
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(211,47,47,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 20 }}>❚❚</div>
          <div style={{ fontFamily: FONT_SERIF, fontStyle: "italic", fontSize: 34, lineHeight: 1.1, letterSpacing: "-0.02em" }}>Stand en pause</div>
          <div style={{ marginTop: 14, fontSize: 14, color: p.mute, lineHeight: 1.6, maxWidth: 260 }}>
            {isOrange
              ? "C'était presque votre tour. Le vendeur reprend dans un instant, restez devant le stand."
              : "Le vendeur a momentanément suspendu la file. Votre place est conservée, restez dans les environs."}
          </div>
        </div>
        <div style={{ padding: "0 22px 38px" }}>
          <VgButton onClick={onLeave} variant="ghost" palette={p} style={{ fontSize: 14, fontWeight: 600, color: "#c0392b", border: "1.5px solid rgba(192,57,43,0.3)" }}>
            Quitter la file
          </VgButton>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%", background: p.paper, color: p.ink, fontFamily: FONT, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", animation: "vagueoFadeIn 0.4s ease" }}>
      <WaveBackground variant={waveVariant} progress={isOrange ? 0.82 : 0.35} color={accent} soft={accentSoft}/>
      <div style={{ position: "relative", zIndex: 2, padding: "54px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <VagueoLogo size={20} color={p.ink} accent={accent}/>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px 5px 8px", borderRadius: 99, background: isOrange ? p.call : "transparent", color: isOrange ? "#fff" : p.mute, border: isOrange ? "none" : `1px solid ${p.line}`, fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>
          <span style={{ width: 7, height: 7, borderRadius: 99, background: isOrange ? "#fff" : accent, animation: isOrange ? "vagueoSlowPulse 1.2s ease-in-out infinite" : undefined }}/>
          {isOrange ? "Préparez-vous" : "En attente"}
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 2, flex: 1, padding: "48px 24px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontSize: 12, color: p.mute, letterSpacing: "0.16em", textTransform: "uppercase" }}>Attente estimée</div>
        <div style={{ marginTop: 6, fontFamily: FONT_SERIF, fontStyle: "italic", fontSize: 108, lineHeight: 1, letterSpacing: "-0.04em" }}>
          ~{estimatedMin}<span style={{ fontSize: 40, letterSpacing: "-0.02em", marginLeft: 6, color: p.mute }}>min</span>
        </div>
        <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 10, padding: "12px 20px", border: `1px solid ${p.line}`, borderRadius: 14 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "oklch(0.55 0.18 142)", animation: "vagueoSlowPulse 2s ease-in-out infinite" }}/>
          <span style={{ fontFamily: FONT_MONO, fontSize: 18, fontVariantNumeric: "tabular-nums" }}>{presentCount}</span>
          <span style={{ fontSize: 13, color: p.mute }}>{presentCount === 1 ? "personne au stand" : "personnes au stand"}</span>
        </div>
        <div style={{ marginTop: 24, fontSize: 12, color: p.mute, textAlign: "center", lineHeight: 1.6, maxWidth: 260 }}>
          Vous pouvez verrouiller votre téléphone.<br/>Nous vous préviendrons quand c&apos;est votre tour.
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 2, padding: "0 22px 38px" }}>
        <VgButton onClick={onLeave} variant="ghost" palette={p} style={{ fontSize: 14, fontWeight: 600, color: "#c0392b", border: "1.5px solid rgba(192,57,43,0.3)", boxShadow: "0 2px 12px rgba(192,57,43,0.12)" }}>
          Quitter la file
        </VgButton>
      </div>
    </div>
  );
}

// ── ScreenCheckin ────────────────────────────────────────────
export function ScreenCheckin({ palette: p, onConfirm, onDelay, delayUsed = false, delayMin = 10 }: { palette: Palette; onConfirm: () => void; onDelay: () => void; delayUsed?: boolean; delayMin?: number }) {
  return (
    <div style={{ width: "100%", height: "100%", background: p.call, color: "#fff", fontFamily: FONT, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", animation: "vagueoFadeIn 0.3s ease" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.15 }}><WaveBackground progress={1} color="#fff" soft="transparent"/></div>
      <div style={{ position: "relative", zIndex: 2, padding: "54px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <VagueoLogo size={20} color="#fff" accent="#fff"/>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", textTransform: "uppercase", letterSpacing: "0.14em", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: 99, background: "#fff", animation: "vagueoSlowPulse 0.9s ease-in-out infinite" }}/>
          C&apos;est à vous
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 2, flex: 1, padding: "0 24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ fontFamily: FONT_SERIF, fontStyle: "italic", fontSize: 64, lineHeight: 0.95, letterSpacing: "-0.03em" }}>Approchez<br/>du stand</div>
        <div style={{ marginTop: 18, fontSize: 14, color: "rgba(255,255,255,0.88)", maxWidth: 280, lineHeight: 1.5 }}>Confirmez votre présence pour recevoir votre commande.</div>
      </div>
      <div style={{ position: "relative", zIndex: 2, padding: "0 22px 38px" }}>
        <button onClick={onConfirm} style={{ width: "100%", minHeight: 112, border: 0, outline: 0, cursor: "pointer", background: "#fff", color: p.call, borderRadius: 28, fontFamily: FONT, fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, animation: "vagueoBlink 1.4s ease-in-out infinite" }}>
          <span>JE SUIS DEVANT</span><span>LE STAND</span>
        </button>
        <div style={{ marginTop: 10, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: "0.04em" }}>Appuyez uniquement lorsque vous êtes devant le vendeur</div>
        {!delayUsed && (
          <button onClick={onDelay} style={{ marginTop: 16, width: "100%", border: "1.5px solid rgba(255,255,255,0.28)", borderRadius: 16, padding: "13px 16px", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.82)", fontFamily: FONT, fontSize: 13, cursor: "pointer", letterSpacing: "-0.01em" }}>
            Pas encore là ? Décaler d&apos;environ {delayMin} min
          </button>
        )}
      </div>
    </div>
  );
}

// ── ScreenValidation ─────────────────────────────────────────
export function ScreenValidation({ secureColor = "#FF6B9D", colorName = "Rose", clock, onDone, isPaused = false }: { secureColor?: string; colorName?: string; clock: Date; onDone: () => void; isPaused?: boolean }) {
  const ink = "#0a0a0a";
  const hh = String(clock.getHours()).padStart(2, "0");
  const mm = String(clock.getMinutes()).padStart(2, "0");
  const ss = String(clock.getSeconds()).padStart(2, "0");

  if (isPaused) {
    return (
      <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", fontFamily: FONT, color: ink, display: "flex", flexDirection: "column", animation: "vagueoFadeIn 0.3s ease" }}>
        <SecureColorBg bg={secureColor}/>
        <div style={{ position: "relative", zIndex: 2, padding: "54px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <VagueoLogo size={20} color={ink} accent={ink}/>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px 5px 8px", borderRadius: 99, background: "rgba(0,0,0,0.75)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: "#fff", animation: "vagueoSlowPulse 1.4s ease-in-out infinite" }}/>
            En pause
          </div>
        </div>
        <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 20 }}>❚❚</div>
          <div style={{ fontFamily: FONT_SERIF, fontStyle: "italic", fontSize: 34, lineHeight: 1.1, letterSpacing: "-0.02em" }}>Stand en pause</div>
          <div style={{ marginTop: 14, fontSize: 14, color: "rgba(0,0,0,0.6)", lineHeight: 1.6, maxWidth: 260 }}>
            Votre présence est validée. Le vendeur reprend dans un instant, restez devant le stand.
          </div>
        </div>
        <div style={{ position: "relative", zIndex: 2, padding: "0 22px 38px" }}>
          <button onClick={onDone} style={{ width: "100%", minHeight: 56, border: 0, outline: 0, cursor: "pointer", background: "rgba(0,0,0,0.75)", color: "#fff", borderRadius: 16, fontFamily: FONT, fontSize: 17, fontWeight: 500 }}>
            C&apos;est fait, merci ! ✓
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", fontFamily: FONT, color: ink, display: "flex", flexDirection: "column", animation: "vagueoFadeIn 0.3s ease" }}>
      <SecureColorBg bg={secureColor}/>
      <div style={{ position: "relative", zIndex: 2, padding: "54px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <VagueoLogo size={20} color={ink} accent={ink}/>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px 5px 10px", borderRadius: 99, background: "rgba(0,0,0,0.8)", color: "#fff", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", flexShrink: 0, animation: "vagueoPulse 1s ease-in-out infinite" }}/>
          Présence validée
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 2, flex: 1, padding: "24px 22px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, opacity: 0.85 }}>Montrez cet écran au vendeur</div>
        <div style={{ marginTop: 16, fontFamily: FONT_MONO, fontWeight: 600, fontSize: 80, lineHeight: 1, letterSpacing: "-0.05em", fontVariantNumeric: "tabular-nums", display: "flex", alignItems: "baseline" }}>
          <span>{hh}</span>
          <span style={{ opacity: 0.35, animation: "vagueoSlowPulse 1s ease-in-out infinite" }}>:</span>
          <span>{mm}</span>
          <span style={{ opacity: 0.35, fontSize: 46, marginLeft: 3 }}>:{ss}</span>
        </div>
        <div style={{ marginTop: 20, fontSize: 12, lineHeight: 1.5, textAlign: "center", maxWidth: 280, color: "rgba(0,0,0,0.55)" }}>
          La couleur {colorName} et l&apos;heure changent en direct.<br/>Une capture d&apos;écran ne fonctionnera pas.
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 2, padding: "0 22px 38px" }}>
        <button onClick={onDone} style={{ width: "100%", minHeight: 56, border: 0, outline: 0, cursor: "pointer", background: "rgba(0,0,0,0.85)", color: "#fff", borderRadius: 16, fontFamily: FONT, fontSize: 17, fontWeight: 500 }}>
          C&apos;est fait, merci ! ✓
        </button>
      </div>
    </div>
  );
}

// ── ScreenMerci ──────────────────────────────────────────────
export function ScreenMerci({ palette: p, onRestart }: { palette: Palette; onRestart: () => void }) {
  return (
    <div style={{ width: "100%", height: "100%", background: p.paper, color: p.ink, fontFamily: FONT, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", paddingTop: 54, animation: "vagueoFadeIn 0.4s ease" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
        <svg viewBox="0 0 400 800" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          {[0,1,2,3,4].map(i => <path key={i} d={`M-50 ${500 + i*28} Q 100 ${440 + i*28} 200 ${500 + i*28} T 450 ${500 + i*28}`} stroke={p.line} strokeWidth="1" fill="none"/>)}
        </svg>
      </div>
      <div style={{ flex: 1, padding: "0 32px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: p.ink, color: p.paper, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>✓</div>
        <div style={{ marginTop: 28, fontFamily: FONT_SERIF, fontStyle: "italic", fontSize: 48, lineHeight: 1, letterSpacing: "-0.02em" }}>À bientôt !</div>
        <div style={{ marginTop: 14, fontSize: 14, color: p.mute, maxWidth: 280, lineHeight: 1.5 }}>Votre session est terminée.<br/>Vous pouvez fermer cette page.</div>
      </div>
      <div style={{ padding: "0 22px 40px", position: "relative" }}>
        <VgButton onClick={onRestart} variant="ghost" palette={p} style={{ fontSize: 14 }}>Rejoindre une nouvelle file</VgButton>
      </div>
    </div>
  );
}

// ── ScreenVendor ─────────────────────────────────────────────
export function ScreenVendor({ palette: p, stand, presentCount, waitingCount, clock, onTogglePause, onToggleOpen, onSetFlowRate }: {
  palette: Palette; stand: { secure_color: string; is_paused: boolean; is_open: boolean; flow_rate: number; name: string };
  presentCount: number; waitingCount: number; clock: Date;
  onTogglePause?: () => void; onToggleOpen?: () => void; onSetFlowRate?: (d: number) => void;
}) {
  const { secure_color, is_paused, is_open, flow_rate, name } = stand;
  const hh = String(clock.getHours()).padStart(2, "0");
  const mm = String(clock.getMinutes()).padStart(2, "0");
  const colorName = SECURE_COLORS.find(c => c.hex.toUpperCase() === (secure_color || "").toUpperCase())?.name ?? "—";
  const flowLabel = FLOW_LABELS[(flow_rate ?? 3) - 1];
  const iconBtn: React.CSSProperties = { border: `1px solid ${p.line}`, borderRadius: 10, width: 32, height: 32, cursor: "pointer", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: p.mute };

  return (
    <div style={{ width: "100%", height: "100%", background: p.paper, color: p.ink, fontFamily: FONT, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      <div style={{ background: secure_color, padding: "58px 22px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: "rgba(0,0,0,0.75)" }}>Couleur en cours</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#000" }}>
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#000", animation: "vagueoPulse 1s ease-in-out infinite" }}/>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>{colorName}</span>
        </div>
      </div>
      <div style={{ padding: "8px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <VagueoLogo size={18} color={p.ink} accent={p.wait}/>
          {name && <div style={{ fontSize: 11, color: p.mute, marginTop: 1, letterSpacing: "0.04em" }}>{name}</div>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ fontSize: 11, color: p.mute, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: FONT_MONO }}>{hh}:{mm}</div>
          <button style={iconBtn}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></button>
          <button style={iconBtn}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></button>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 22px" }}>
        <div style={{ fontFamily: FONT_SERIF, fontStyle: "italic", fontSize: 52, lineHeight: 1, letterSpacing: "-0.02em", color: !is_open ? p.mute : is_paused ? "#d32f2f" : p.ink }}>
          {!is_open ? "File fermée" : is_paused ? "En pause" : "En service"}
        </div>
        <div style={{ marginTop: 28, display: "flex", width: "100%", maxWidth: 320, border: `1px solid ${p.line}`, borderRadius: 18, overflow: "hidden" }}>
          <div style={{ flex: 1, padding: "14px 12px", textAlign: "center", borderRight: `1px solid ${p.line}` }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 28, fontWeight: 600, color: p.call }}>{presentCount}</div>
            <div style={{ fontSize: 10, color: p.mute, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.1em" }}>devant le stand</div>
          </div>
          <div style={{ flex: 1, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 28, fontWeight: 600 }}>{waitingCount}</div>
            <div style={{ fontSize: 10, color: p.mute, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.1em" }}>en attente</div>
          </div>
        </div>
      </div>
      <div style={{ padding: "0 22px 38px", display: "flex", flexDirection: "column", gap: 10 }}>
        <button onClick={onToggleOpen} style={{ border: 0, outline: 0, cursor: "pointer", width: "100%", minHeight: is_open ? 44 : 64, background: is_open ? p.line : "oklch(0.38 0.18 142)", color: is_open ? p.mute : "#fff", borderRadius: 16, fontFamily: FONT, fontSize: is_open ? 13 : 17, fontWeight: is_open ? 400 : 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" }}>
          {is_open ? <><span style={{ fontSize: 12 }}>×</span> Fermer la file</> : <><span style={{ fontSize: 20 }}>↑</span> Ouvrir la file d&apos;attente</>}
        </button>
        <div style={{ display: "flex", alignItems: "center", border: `1px solid ${p.line}`, borderRadius: 20, overflow: "hidden" }}>
          <button onClick={() => onSetFlowRate?.(-1)} disabled={flow_rate <= 1} style={{ border: 0, outline: 0, cursor: flow_rate <= 1 ? "not-allowed" : "pointer", width: 60, minHeight: 60, fontSize: 24, fontWeight: 300, background: "transparent", color: flow_rate <= 1 ? p.mute : p.ink, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>−</button>
          <div style={{ flex: 1, textAlign: "center", borderLeft: `1px solid ${p.line}`, borderRight: `1px solid ${p.line}`, padding: "10px 8px" }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: p.mute, textTransform: "uppercase", letterSpacing: "0.12em" }}>Affluence</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>{flowLabel}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 6 }}>
              {[1,2,3,4,5].map(n => <div key={n} style={{ width: 6, height: 6, borderRadius: "50%", background: n <= flow_rate ? p.ink : p.line, transition: "background 0.2s" }}/>)}
            </div>
          </div>
          <button onClick={() => onSetFlowRate?.(+1)} disabled={flow_rate >= 5} style={{ border: 0, outline: 0, cursor: flow_rate >= 5 ? "not-allowed" : "pointer", width: 60, minHeight: 60, fontSize: 24, fontWeight: 300, background: "transparent", color: flow_rate >= 5 ? p.mute : p.ink, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>+</button>
        </div>
        <button onClick={onTogglePause} style={{ border: `1px solid ${is_paused ? "#d32f2f" : p.line}`, outline: 0, cursor: "pointer", width: "100%", minHeight: 52, background: is_paused ? "#d32f2f" : "transparent", color: is_paused ? "#fff" : p.ink, borderRadius: 16, fontFamily: FONT, fontSize: 15, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {is_paused ? <><span style={{ fontSize: 14 }}>▶</span> Reprendre</> : <><span style={{ fontSize: 13 }}>❚❚</span> Mettre en pause</>}
        </button>
      </div>
    </div>
  );
}

// ── FakeQR ───────────────────────────────────────────────────
function FakeQR({ size = 200 }: { size?: number }) {
  const cells = 21, cell = size / cells;
  const r = (i: number) => { const x = Math.sin((i + 1) * 13.91) * 4321.5; return x - Math.floor(x); };
  const blocks: React.ReactNode[] = [];
  for (let y = 0; y < cells; y++) for (let x = 0; x < cells; x++) {
    if ((x < 7 && y < 7) || (x >= cells-7 && y < 7) || (x < 7 && y >= cells-7)) continue;
    if (r(y * cells + x) > 0.55) blocks.push(<rect key={`${x}-${y}`} x={x*cell} y={y*cell} width={cell} height={cell} fill="#11141a"/>);
  }
  const Marker = ({ x, y }: { x: number; y: number }) => (
    <g>
      <rect x={x*cell} y={y*cell} width={cell*7} height={cell*7} fill="#11141a"/>
      <rect x={(x+1)*cell} y={(y+1)*cell} width={cell*5} height={cell*5} fill="#fff"/>
      <rect x={(x+2)*cell} y={(y+2)*cell} width={cell*3} height={cell*3} fill="#11141a"/>
    </g>
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      <rect width={size} height={size} fill="#fff"/>
      {blocks}
      <Marker x={0} y={0}/><Marker x={cells-7} y={0}/><Marker x={0} y={cells-7}/>
    </svg>
  );
}

// ── ScreenQRCode ─────────────────────────────────────────────
export function ScreenQRCode({ palette: p, standName = "Mon stand", isOpen = true }: { palette: Palette; standName?: string; isOpen?: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%", background: p.paper, fontFamily: FONT, display: "flex", flexDirection: "column", overflow: "hidden", animation: "vagueoFadeIn 0.25s ease" }}>
      <div style={{ padding: "58px 22px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <VagueoLogo size={16} color={p.ink} accent={p.wait}/>
          <div style={{ fontSize: 11, color: p.mute, marginTop: 1, letterSpacing: "0.1em", textTransform: "uppercase" }}>QR Code</div>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 99, marginBottom: 24, background: isOpen ? "oklch(0.94 0.07 142)" : p.line, color: isOpen ? "oklch(0.35 0.14 142)" : p.mute, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: isOpen ? "oklch(0.48 0.18 142)" : p.mute, animation: isOpen ? "vagueoSlowPulse 1.5s ease-in-out infinite" : "none" }}/>
          {isOpen ? "File ouverte" : "File fermée"}
        </div>
        <div style={{ padding: 20, borderRadius: 24, background: "#fff", boxShadow: "0 4px 32px rgba(0,0,0,0.10)", opacity: isOpen ? 1 : 0.45, transition: "opacity 0.2s" }}>
          <FakeQR size={200}/>
        </div>
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>{standName}</div>
          <div style={{ marginTop: 6, fontFamily: FONT_MONO, fontSize: 10, color: p.mute, letterSpacing: "0.02em" }}>vagueo.app/?stand=stand_01</div>
        </div>
      </div>
      <div style={{ padding: "0 22px 44px", display: "flex", flexDirection: "column", gap: 10 }}>
        <button style={{ width: "100%", minHeight: 54, border: 0, outline: 0, cursor: "pointer", background: p.ink, color: p.paper, borderRadius: 16, fontFamily: FONT, fontSize: 16, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          Partager le lien
        </button>
      </div>
    </div>
  );
}

// ── ScreenStats ──────────────────────────────────────────────
export function ScreenStats({ palette: p }: { palette: Palette }) {
  const [period, setPeriod] = useState<"today"|"week"|"month">("today");
  const stats = period === "today"
    ? { total: 47, served: 38, left: 6, timeout: 3, avgWait: 8, avgService: 4, delayUsed: 5 }
    : period === "week"
    ? { total: 312, served: 271, left: 24, timeout: 17, avgWait: 11, avgService: 4, delayUsed: 32 }
    : { total: 1248, served: 1102, left: 96, timeout: 50, avgWait: 9, avgService: 4, delayUsed: 138 };
  const hourlyCounts = [0,0,1,3,4,2,5,8,7,4,2,3,1,0];
  const maxH = Math.max(...hourlyCounts);
  const tabBtn = (active: boolean): React.CSSProperties => ({ flex: 1, border: 0, cursor: "pointer", borderRadius: 9, padding: "7px 4px", background: active ? p.paper : "transparent", color: active ? p.ink : p.mute, fontFamily: FONT, fontSize: 13, fontWeight: active ? 600 : 400, boxShadow: active ? "0 1px 4px rgba(0,0,0,0.1)" : "none" });
  const card = (val: string|number, lbl: string, color?: string) => (
    <div style={{ flex: 1, padding: "14px 10px", border: `1px solid ${p.line}`, borderRadius: 16, textAlign: "center" }}>
      <div style={{ fontFamily: FONT_MONO, fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", color: color || p.ink }}>{val}</div>
      <div style={{ fontSize: 9, color: p.mute, marginTop: 3, textTransform: "uppercase", letterSpacing: "0.1em" }}>{lbl}</div>
    </div>
  );
  return (
    <div style={{ width: "100%", height: "100%", background: p.paper, fontFamily: FONT, display: "flex", flexDirection: "column", overflow: "hidden", animation: "vagueoFadeIn 0.25s ease" }}>
      <div style={{ padding: "58px 22px 0" }}>
        <VagueoLogo size={16} color={p.ink} accent={p.wait}/>
        <div style={{ fontSize: 11, color: p.mute, marginTop: 1, letterSpacing: "0.1em", textTransform: "uppercase" }}>Statistiques</div>
      </div>
      <div style={{ margin: "14px 22px 0", display: "flex", gap: 5, background: "rgba(17,20,26,0.05)", borderRadius: 12, padding: 4 }}>
        {(["today","week","month"] as const).map(k => (
          <button key={k} onClick={() => setPeriod(k)} style={tabBtn(period === k)}>
            {k === "today" ? "Aujourd'hui" : k === "week" ? "Semaine" : "Mois"}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px 48px" }}>
        <div style={{ display: "flex", gap: 10 }}>
          {card(stats.total, "Passages")}
          {card(stats.served, "Servis", "oklch(0.42 0.16 142)")}
          {card(stats.total - stats.served, "Absences", p.mute)}
        </div>
        <div style={{ marginTop: 12, display: "flex", borderRadius: 8, overflow: "hidden", height: 7 }}>
          <div style={{ flex: stats.served, background: "oklch(0.68 0.15 142)" }}/>
          <div style={{ flex: stats.left, background: p.call }}/>
          <div style={{ flex: stats.timeout, background: p.line }}/>
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
          {card(`~${stats.avgWait}`, "min d'attente")}
          {card(`~${stats.avgService}`, "min au stand")}
        </div>
        {period === "today" && (
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 11, color: p.mute, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>Passages par heure</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 56 }}>
              {hourlyCounts.map((c, i) => {
                const h = c > 0 ? Math.max(6, Math.round(c / maxH * 56)) : 2;
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: 56 }}>
                    {c > 0 && <div style={{ fontSize: 8, color: p.mute, marginBottom: 2 }}>{c}</div>}
                    <div style={{ width: "100%", height: h, background: c > 0 ? p.wait : p.line, borderRadius: "3px 3px 0 0" }}/>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
