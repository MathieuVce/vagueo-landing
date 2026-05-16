import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { prenom, email, type, message } = await req.json();

  if (!prenom || !email || !type) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Vaguéo <onboarding@resend.dev>",
      to: ["mathieu.vacance@epitech.eu"],
      replyTo: email,
      subject: `[Bêta] Nouvelle candidature: ${prenom} (${type})`,
      text: `Prénom : ${prenom}\nEmail : ${email}\nType d'établissement : ${type}\n\nMessage :\n${message || "—"}`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur envoi. Réessayez." }, { status: 500 });
  }
}
