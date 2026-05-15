"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function Reveal({ children, delay = 0, center = false }: { children: React.ReactNode; delay?: number; center?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay }}
      style={center ? { display: "flex", justifyContent: "center" } : {}}>
      {children}
    </motion.div>
  );
}

const schema = z.object({
  prenom: z.string().min(2, "Prénom requis"),
  email: z.email("Email invalide"),
  type: z.string().min(1, "Sélectionnez un type"),
  message: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  fontSize: 15,
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.15s",
  boxSizing: "border-box",
};

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-jetbrains-mono), monospace" }}>{label}</label>
      {children}
      {error && <span style={{ fontSize: 12, color: "oklch(0.78 0.12 25)", marginTop: 2 }}>{error}</span>}
    </div>
  );
}

export default function CtaFooter() {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Final CTA */}
      <section id="contact" style={{ position: "relative", padding: "120px 0", background: "linear-gradient(180deg, #142a5c 0%, #0a1530 60%, #050a1a 100%)", color: "#fff", overflow: "hidden" }}>
        {/* Background waves */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "60%", opacity: 0.3, pointerEvents: "none" }}>
          <svg viewBox="0 0 1600 400" preserveAspectRatio="none" style={{ position: "absolute", left: 0, bottom: 0, width: "200%", height: "100%", animation: "waveLoop 22s linear infinite" }}>
            <path d="M0 200 Q 200 120 400 200 T 800 200 T 1200 200 T 1600 200 L 1600 400 L 0 400 Z" fill="oklch(0.55 0.20 250 / 0.3)"/>
          </svg>
          <svg viewBox="0 0 1600 400" preserveAspectRatio="none" style={{ position: "absolute", left: 0, bottom: 0, width: "200%", height: "100%", animation: "waveLoop 32s linear infinite", animationDelay: "-10s", opacity: 0.6 }}>
            <path d="M0 260 Q 200 180 400 260 T 800 260 T 1200 260 T 1600 260 L 1600 400 L 0 400 Z" fill="oklch(0.45 0.18 250 / 0.4)"/>
          </svg>
        </div>

        <div style={{ position: "relative", maxWidth: 860, margin: "0 auto", padding: "0 32px" }}>
          {/* Header */}
          <Reveal center>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "oklch(0.65 0.16 240)", animation: "pulse 1.8s ease-in-out infinite" }} />
                Bêta ouverte · Test gratuit
              </div>
              <h2 style={{ fontFamily: "var(--font-inter-tight), sans-serif", fontWeight: 600, fontSize: "clamp(40px,5.5vw,70px)", lineHeight: 1.02, letterSpacing: "-0.035em", marginBottom: 16 }}>
                Toute file<br />
                mérite une{" "}
                <span style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "oklch(0.78 0.10 235)", letterSpacing: "-0.025em" }}>vague.</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, lineHeight: 1.55, maxWidth: 520, margin: "0 auto" }}>
                On installe en 5 minutes, on vous accompagne gratuitement pendant tout le pilote. En échange : vos retours terrain.
              </p>
            </div>
          </Reveal>

          {/* Form card */}
          <Reveal delay={0.1}>
            {status === "sent" ? (
              <div style={{ textAlign: "center", padding: "56px 40px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, backdropFilter: "blur(12px)" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontFamily: "var(--font-inter-tight), sans-serif", fontWeight: 600, fontSize: 26, letterSpacing: "-0.02em", marginBottom: 10 }}>
                  Message envoyé.
                </h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.6 }}>
                  On vous contacte rapidement.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 28, padding: "40px 40px", backdropFilter: "blur(12px)", display: "flex", flexDirection: "column", gap: 20 }}
                className="contact-form">

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="form-row">
                  <Field label="Prénom *" error={errors.prenom?.message}>
                    <input {...register("prenom")} placeholder="Sophie" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = "oklch(0.65 0.16 240)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.14)")} />
                  </Field>
                  <Field label="Email *" error={errors.email?.message}>
                    <input {...register("email")} type="email" placeholder="sophie@festival.fr" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = "oklch(0.65 0.16 240)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.14)")} />
                  </Field>
                </div>

                <Field label="Type d'établissement *" error={errors.type?.message}>
                  <select {...register("type")} style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                    onFocus={e => (e.target.style.borderColor = "oklch(0.65 0.16 240)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.14)")}>
                    <option value="" style={{ background: "#0a1530" }}>Sélectionnez…</option>
                    <option value="Festival / événement" style={{ background: "#0a1530" }}>Festival / événement</option>
                    <option value="Food-truck / street food" style={{ background: "#0a1530" }}>Food-truck / street food</option>
                    <option value="Restaurant / boutique" style={{ background: "#0a1530" }}>Restaurant / boutique</option>
                    <option value="Drop / pop-up store" style={{ background: "#0a1530" }}>Drop / pop-up store</option>
                    <option value="Autre" style={{ background: "#0a1530" }}>Autre</option>
                  </select>
                </Field>

                <Field label="Message (optionnel)">
                  <textarea {...register("message")} rows={3} placeholder="Dites-nous en plus sur votre contexte…"
                    style={{ ...inputStyle, resize: "vertical", minHeight: 88 }}
                    onFocus={e => (e.target.style.borderColor = "oklch(0.65 0.16 240)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.14)")} />
                </Field>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 4 }}>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-jetbrains-mono), monospace", letterSpacing: "0.08em" }}>
                    Aucun engagement · Gratuit pendant la bêta
                  </p>
                  <button type="submit" disabled={status === "sending"}
                    style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", borderRadius: 999, fontWeight: 500, fontSize: 16, cursor: status === "sending" ? "wait" : "pointer", background: "linear-gradient(160deg, oklch(0.65 0.16 240) 0%, oklch(0.50 0.16 240) 100%)", color: "#fff", boxShadow: "0 8px 22px -8px oklch(0.50 0.16 240 / 0.55), inset 0 0 0 1px oklch(0.70 0.14 240)", border: 0, opacity: status === "sending" ? 0.7 : 1, transition: "opacity 0.15s" }}>
                    {status === "sending" ? "Envoi…" : <>Réserver mon créneau <span>→</span></>}
                  </button>
                </div>

                {status === "error" && (
                  <p style={{ fontSize: 13, color: "oklch(0.78 0.12 25)", textAlign: "center" }}>
                    Une erreur s&apos;est produite. Réessayez ou écrivez à <a href="mailto:contact@vagueo.fr" style={{ color: "inherit", textDecoration: "underline" }}>contact@vagueo.fr</a>.
                  </p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#050a1a", color: "rgba(255,255,255,0.55)", padding: "60px 0 40px", fontSize: 14 }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, color: "#fff" }}>
              <span style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                <Image src="/vagueo-logo.png" alt="Vaguéo" width={46} height={46} style={{ objectFit: "cover" }} />
              </span>
              <span style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontStyle: "italic", fontSize: 22, letterSpacing: "-0.02em", lineHeight: 1 }}>Vaguéo</span>
            </a>
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              {[["#probleme", "Problème"], ["#solution", "Solution"], ["#securite", "Sécurité"], ["#roi", "ROI"]].map(([href, label]) => (
                <a key={href} href={href} onClick={scrollTo(href)} style={{ color: "rgba(255,255,255,0.55)", transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 32, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.08)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <span>© 2026 Vaguéo · Tous droits réservés</span>
            <span>Conçu sur la côte · Made with waves</span>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr !important; }
          .contact-form { padding: 28px 20px !important; }
        }
      `}</style>
    </>
  );
}
