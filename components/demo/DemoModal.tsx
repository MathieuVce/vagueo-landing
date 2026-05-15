"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { PALETTES, SECURE_COLORS, FLOW_LABELS, FONT, FONT_MONO, FONT_SERIF, VagueoLogo } from "./design";
import { IOSDevice } from "./IOSFrame";
import { ScreenSplash, ScreenAttente, ScreenCheckin, ScreenValidation, ScreenMerci, ScreenVendor } from "./screens";

// ── State ────────────────────────────────────────────────────
type ClientStep = "splash" | "attente" | "checkin" | "validation" | "merci";
type WaitStatus = "red" | "orange";

interface DemoState {
  stand: { name: string; secure_color: string; is_paused: boolean; is_open: boolean; flow_rate: number; flow_slow: number; flow_sprint: number };
  clientStep: ClientStep;
  waitingStatus: WaitStatus;
  delayUsed: boolean;
  presentCount: number;
  waitingCount: number;
}

const INIT: DemoState = {
  stand: { name: "Churros Mathieu", secure_color: "#FF6B9D", is_paused: false, is_open: true, flow_rate: 3, flow_slow: 5, flow_sprint: 1 },
  clientStep: "splash", waitingStatus: "red",
  delayUsed: false, presentCount: 2, waitingCount: 7,
};

function useDemoState() {
  const [s, set] = useState<DemoState>(INIT);

  useEffect(() => {
    const id = setInterval(() => set(p => {
      const i = SECURE_COLORS.findIndex(c => c.hex === p.stand.secure_color);
      const next = SECURE_COLORS[(i + 1) % SECURE_COLORS.length];
      return { ...p, stand: { ...p.stand, secure_color: next.hex } };
    }), 12000);
    return () => clearInterval(id);
  }, []);

  const estimatedMin = useMemo(() => {
    const { flow_rate, flow_slow, flow_sprint } = s.stand;
    const mpp = +(flow_slow + (flow_sprint - flow_slow) * (flow_rate - 1) / 4).toFixed(2);
    return Math.max(1, Math.round(s.waitingCount * mpp));
  }, [s.stand, s.waitingCount]);

  const actions = {
    join:            () => set(p => ({ ...p, clientStep: "attente", waitingStatus: "red", waitingCount: p.waitingCount + 1 })),
    leave:           () => set(p => ({ ...p, clientStep: "splash", waitingCount: Math.max(0, p.waitingCount - 1) })),
    callMe:          () => set(p => ({ ...p, waitingStatus: "orange" })),
    goToCheckin:     () => set(p => ({ ...p, clientStep: "checkin" })),
    confirmPresence: () => set(p => ({ ...p, clientStep: "validation", presentCount: p.presentCount + 1, waitingCount: Math.max(0, p.waitingCount - 1) })),
    delay:           () => set(p => ({ ...p, delayUsed: true, clientStep: "attente", waitingStatus: "red" })),
    done:            () => set(p => ({ ...p, clientStep: "merci", presentCount: Math.max(0, p.presentCount - 1) })),
    restart:         () => set(p => ({ ...INIT, stand: p.stand })),
    togglePause:     () => set(p => ({ ...p, stand: { ...p.stand, is_paused: !p.stand.is_paused } })),
    toggleOpen:      () => set(p => ({ ...p, stand: { ...p.stand, is_open: !p.stand.is_open } })),
    setFlowRate:     (d: number) => set(p => ({ ...p, stand: { ...p.stand, flow_rate: Math.max(1, Math.min(5, p.stand.flow_rate + d)) } })),
    addWaiting:      () => set(p => ({ ...p, waitingCount: p.waitingCount + 1 })),
    removeWaiting:   () => set(p => ({ ...p, waitingCount: Math.max(0, p.waitingCount - 1) })),
  };

  return [{ ...s, estimatedMin }, actions] as const;
}

function useClock() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id); }, []);
  return t;
}

// ── Styled Demo Controls ─────────────────────────────────────
const STEP_META: Record<ClientStep, { label: string; color: string; bg: string }> = {
  splash:     { label: "Splash",     color: "#94a3b8", bg: "rgba(148,163,184,0.12)" },
  attente:    { label: "Attente",    color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
  checkin:    { label: "Check-in",   color: "#fb923c", bg: "rgba(251,146,60,0.15)" },
  validation: { label: "Validation", color: "#34d399", bg: "rgba(52,211,153,0.12)" },
  merci:      { label: "Merci",      color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
};

function DemoControls({ state, actions }: { state: DemoState; actions: ReturnType<typeof useDemoState>[1] }) {
  const { clientStep, waitingStatus, delayUsed, stand } = state;
  const stepMeta = STEP_META[clientStep];
  const colorName = SECURE_COLORS.find(c => c.hex === stand.secure_color)?.name ?? "—";

  const PrimaryBtn = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button onClick={onClick} style={{ width: "100%", padding: "10px 16px", border: 0, borderRadius: 12, cursor: "pointer", background: "linear-gradient(135deg, oklch(0.55 0.16 240) 0%, oklch(0.42 0.15 245) 100%)", color: "#fff", fontFamily: FONT, fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em", boxShadow: "0 4px 16px -6px oklch(0.45 0.16 240 / 0.6), inset 0 1px 0 rgba(255,255,255,0.12)", transition: "opacity 0.15s" }}>
      {label}
    </button>
  );

  const GhostBtn = ({ label, onClick, danger }: { label: string; onClick: () => void; danger?: boolean }) => (
    <button onClick={onClick} style={{ width: "100%", padding: "9px 14px", border: `1px solid ${danger ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.1)"}`, borderRadius: 10, cursor: "pointer", background: danger ? "rgba(239,68,68,0.08)" : "rgba(255,255,255,0.04)", color: danger ? "#f87171" : "rgba(255,255,255,0.7)", fontFamily: FONT, fontSize: 12, fontWeight: 500, transition: "background 0.15s" }}>
      {label}
    </button>
  );

  const Section = ({ title, icon }: { title: string; icon: string }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 20, marginBottom: 10 }}>
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>{title}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }}/>
    </div>
  );

  return (
    <div style={{ height: "100%", background: "linear-gradient(180deg, #0d1829 0%, #0a1220 100%)", borderRadius: 24, border: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 0 0 1px rgba(255,255,255,0.03) inset, 0 32px 64px -16px rgba(0,0,0,0.5)" }}>

      {/* Header */}
      <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <VagueoLogo size={20} color="rgba(255,255,255,0.9)" accent="oklch(0.65 0.16 240)"/>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 99, background: stepMeta.bg, border: `1px solid ${stepMeta.color}22` }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: stepMeta.color, animation: "vagueoSlowPulse 1.4s ease-in-out infinite" }}/>
            <span style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.1em", color: stepMeta.color, fontWeight: 600 }}>{stepMeta.label}</span>
          </div>
        </div>
        <div style={{ marginTop: 6, fontFamily: FONT_MONO, fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}>Contrôles démo · État partagé</div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "4px 20px 20px" }}>

        {/* Client section */}
        <Section title="Client" icon="📱"/>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {clientStep === "splash" && <PrimaryBtn label="Rejoindre la file →" onClick={actions.join}/>}
          {clientStep === "attente" && waitingStatus === "red" && <PrimaryBtn label="Simuler l'appel (orange)" onClick={actions.callMe}/>}
          {clientStep === "attente" && waitingStatus === "orange" && <PrimaryBtn label="Passer au check-in →" onClick={actions.goToCheckin}/>}
          {clientStep === "checkin" && <PrimaryBtn label="Confirmer présence ✓" onClick={actions.confirmPresence}/>}
          {clientStep === "checkin" && !delayUsed && <GhostBtn label="Demander un délai +10 min" onClick={actions.delay}/>}
          {clientStep === "validation" && <PrimaryBtn label="C'est fait, merci !" onClick={actions.done}/>}
          {clientStep === "merci" && <PrimaryBtn label="Rejoindre une autre file" onClick={actions.restart}/>}
          {clientStep !== "splash" && clientStep !== "merci" && <GhostBtn label="Quitter la file" onClick={actions.leave} danger/>}
        </div>

        {/* Vendor section */}
        <Section title="Vendeur" icon="🏪"/>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <GhostBtn label={stand.is_open ? "Fermer la file" : "Ouvrir la file ↑"} onClick={actions.toggleOpen}/>
          <GhostBtn label={stand.is_paused ? "▶ Reprendre" : "❚❚ Mettre en pause"} onClick={actions.togglePause} danger={stand.is_paused}/>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => actions.setFlowRate(-1)} disabled={stand.flow_rate <= 1} style={{ flex: 1, padding: "9px 0", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, cursor: stand.flow_rate <= 1 ? "not-allowed" : "pointer", background: "rgba(255,255,255,0.04)", color: stand.flow_rate <= 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)", fontFamily: FONT, fontSize: 12, opacity: stand.flow_rate <= 1 ? 0.5 : 1 }}>− affluence</button>
            <button onClick={() => actions.setFlowRate(+1)} disabled={stand.flow_rate >= 5} style={{ flex: 1, padding: "9px 0", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, cursor: stand.flow_rate >= 5 ? "not-allowed" : "pointer", background: "rgba(255,255,255,0.04)", color: stand.flow_rate >= 5 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)", fontFamily: FONT, fontSize: 12, opacity: stand.flow_rate >= 5 ? 0.5 : 1 }}>+ affluence</button>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={actions.removeWaiting} style={{ flex: 1, padding: "9px 0", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, cursor: "pointer", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.7)", fontFamily: FONT, fontSize: 12 }}>− client</button>
            <button onClick={actions.addWaiting} style={{ flex: 1, padding: "9px 0", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, cursor: "pointer", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.7)", fontFamily: FONT, fontSize: 12 }}>+ client</button>
          </div>
        </div>

        {/* Color indicator */}
        <Section title="Anti-fraude" icon="🎨"/>
        <div style={{ display: "flex", gap: 6 }}>
          {SECURE_COLORS.map(c => (
            <div key={c.name} title={c.name} style={{ flex: 1, height: 8, borderRadius: 99, background: c.hex, opacity: c.hex === stand.secure_color ? 1 : 0.2, transition: "opacity 0.4s", boxShadow: c.hex === stand.secure_color ? `0 0 10px ${c.hex}88` : "none" }}/>
          ))}
        </div>
        <div style={{ marginTop: 8, fontFamily: FONT_MONO, fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textAlign: "center" }}>
          Couleur active : <span style={{ color: stand.secure_color, fontWeight: 600 }}>{colorName}</span> · change toutes les 12s
        </div>
      </div>

      {/* Footer reset */}
      <div style={{ padding: "12px 20px 16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <button onClick={actions.restart} style={{ width: "100%", padding: "9px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, cursor: "pointer", background: "transparent", color: "rgba(255,255,255,0.3)", fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.15s, border-color 0.15s" }}
          onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
          ↺ Réinitialiser la démo
        </button>
      </div>
    </div>
  );
}

// ── ClientApp + VendorApp ────────────────────────────────────
function ClientApp({ state, actions, clock }: { state: DemoState & { estimatedMin: number }; actions: ReturnType<typeof useDemoState>[1]; clock: Date }) {
  const p = PALETTES.classique;
  if (state.clientStep === "splash")     return <ScreenSplash palette={p} standName={state.stand.name} estimatedMin={state.estimatedMin} isOpen={state.stand.is_open} isPaused={state.stand.is_paused} onJoin={actions.join}/>;
  if (state.clientStep === "attente")    return <ScreenAttente palette={p} waveVariant="fluid" estimatedMin={state.waitingStatus === "orange" ? 1 : state.estimatedMin} waitingStatus={state.waitingStatus} presentCount={state.presentCount} isPaused={state.stand.is_paused} onLeave={actions.leave}/>;
  if (state.clientStep === "checkin")    return <ScreenCheckin palette={p} delayUsed={state.delayUsed} onConfirm={actions.confirmPresence} onDelay={actions.delay}/>;
  if (state.clientStep === "validation") return <ScreenValidation secureColor={state.stand.secure_color} colorName={SECURE_COLORS.find(c => c.hex === state.stand.secure_color)?.name} clock={clock} onDone={actions.done} isPaused={state.stand.is_paused}/>;
  if (state.clientStep === "merci")      return <ScreenMerci palette={p} onRestart={actions.restart}/>;
  return null;
}

function VendorApp({ state, actions, clock }: { state: DemoState; actions: ReturnType<typeof useDemoState>[1]; clock: Date }) {
  return <ScreenVendor palette={PALETTES.classique} stand={state.stand} presentCount={state.presentCount} waitingCount={state.waitingCount} clock={clock} onTogglePause={actions.togglePause} onToggleOpen={actions.toggleOpen} onSetFlowRate={actions.setFlowRate}/>;
}

type MobileTab = "client" | "vendor";

function ClientNextAction({ state, actions }: { state: DemoState & { estimatedMin: number }; actions: ReturnType<typeof useDemoState>[1] }) {
  const { clientStep, waitingStatus, delayUsed, stand } = state;
  const paused = stand.is_paused;
  const unavail = !stand.is_open || paused;

  let label: string | null = null;
  let onClick: (() => void) | null = null;

  if (clientStep === "splash" && !unavail)                                      { label = "Rejoindre →";   onClick = actions.join; }
  else if (clientStep === "attente" && !paused && waitingStatus === "red")     { label = "Simuler appel"; onClick = actions.callMe; }
  else if (clientStep === "attente" && !paused && waitingStatus === "orange")  { label = "Check-in →";    onClick = actions.goToCheckin; }
  else if (clientStep === "checkin")                                           { label = "Confirmer ✓";   onClick = actions.confirmPresence; }
  else if (clientStep === "validation")                                        { label = "Terminer ✓";    onClick = actions.done; }
  else if (clientStep === "merci")                                             { label = "Recommencer";   onClick = actions.restart; }

  if (!label || !onClick) return <div style={{ flex: 1 }}/>;

  return (
    <button onClick={onClick} style={{ flex: 1, padding: "9px 12px", border: 0, borderRadius: 10, cursor: "pointer", background: "linear-gradient(135deg, oklch(0.55 0.16 240) 0%, oklch(0.42 0.15 245) 100%)", color: "#fff", fontFamily: FONT, fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em", boxShadow: "0 4px 16px -6px oklch(0.45 0.16 240 / 0.6)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, lineHeight: 1.2 }}>
      <span style={{ fontSize: 15 }}>▶</span>
      <span>{label}</span>
    </button>
  );
}

// ── DemoModal ────────────────────────────────────────────────
export default function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [state, actions] = useDemoState();
  const clock = useClock();
  const [mounted, setMounted] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>("client");

  useEffect(() => { setMounted(true); }, []);

  const handleKey = useCallback((e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }, [onClose]);
  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [open, handleKey]);

  if (!mounted || !open) return null;

  const PHONE_W = 320, PHONE_H = 640;

  const tabs: { id: MobileTab; label: string; icon: string }[] = [
    { id: "client", label: "Client",  icon: "📱" },
    { id: "vendor", label: "Vendeur", icon: "🏪" },
  ];

  return createPortal(
    <>
      {/* ── Desktop ───────────────────────────────────────────── */}
      <div className="demo-overlay demo-desktop" style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 24px" }}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(5,10,26,0.88)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}/>
        <div style={{ position: "relative", width: "100%", maxWidth: 1100, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>// Prototype interactif</div>
              <h3 style={{ fontFamily: FONT_SERIF, fontStyle: "italic", fontSize: 28, fontWeight: 400, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>
                Client & vendeur partagent le même état.
              </h3>
            </div>
            <button onClick={onClose} style={{ width: 40, height: 40, borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", cursor: "pointer", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>×</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `${PHONE_W}px 1fr ${PHONE_W}px`, gap: 24, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>📱 Client</div>
              <IOSDevice width={PHONE_W} height={PHONE_H}>
                <ClientApp state={{ ...state, estimatedMin: state.estimatedMin }} actions={actions} clock={clock}/>
              </IOSDevice>
            </div>
            <div style={{ height: PHONE_H + 24 }}>
              <DemoControls state={state} actions={actions}/>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>🏪 Vendeur</div>
              <IOSDevice width={PHONE_W} height={PHONE_H}>
                <VendorApp state={state} actions={actions} clock={clock}/>
              </IOSDevice>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile ────────────────────────────────────────────── */}
      <div className="demo-overlay demo-mobile" style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", flexDirection: "column", background: "#080f1e" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Prototype interactif</div>
            <div style={{ fontFamily: FONT_SERIF, fontStyle: "italic", fontSize: 18, color: "#fff", lineHeight: 1.1, marginTop: 2 }}>État partagé en temps réel</div>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", cursor: "pointer", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>×</button>
        </div>

        {/* Tab bar + next client action */}
        <div style={{ display: "flex", padding: "10px 16px", gap: 8, flexShrink: 0, borderBottom: "1px solid rgba(255,255,255,0.06)", alignItems: "stretch" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setMobileTab(t.id)} style={{ width: 72, padding: "9px 4px", border: "1px solid", borderColor: mobileTab === t.id ? "rgba(100,160,255,0.4)" : "rgba(255,255,255,0.08)", borderRadius: 10, cursor: "pointer", background: mobileTab === t.id ? "rgba(100,160,255,0.12)" : "rgba(255,255,255,0.03)", color: mobileTab === t.id ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)", fontFamily: FONT, fontSize: 12, fontWeight: mobileTab === t.id ? 600 : 400, transition: "all 0.15s", flexShrink: 0 }}>
              <div style={{ fontSize: 16, marginBottom: 2 }}>{t.icon}</div>
              {t.label}
            </button>
          ))}
          <ClientNextAction state={{ ...state, estimatedMin: state.estimatedMin }} actions={actions}/>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ padding: "20px 0 32px", display: "flex", justifyContent: "center", width: "100%" }}>
            <div style={{ transformOrigin: "top center" }} className="demo-phone-scale">
              <IOSDevice width={PHONE_W} height={PHONE_H}>
                {mobileTab === "client"
                  ? <ClientApp state={{ ...state, estimatedMin: state.estimatedMin }} actions={actions} clock={clock}/>
                  : <VendorApp state={state} actions={actions} clock={clock}/>
                }
              </IOSDevice>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .demo-mobile  { display: none !important; }
        .demo-desktop { display: flex !important; }
        @media (max-width: 820px) {
          .demo-mobile  { display: flex !important; }
          .demo-desktop { display: none !important; }
        }
        @media (max-width: 360px) {
          .demo-phone-scale { transform: scale(0.88); margin-bottom: -50px; }
        }
      `}</style>
    </>,
    document.body
  );
}
