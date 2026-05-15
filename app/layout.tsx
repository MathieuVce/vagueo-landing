import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Vaguéo — Libérez vos clients, optimisez votre flux",
  icons: { icon: "/icon.png", apple: "/icon.png" },
  description:
    "La première file d'attente par vagues dynamiques. Vos clients ne piétinent plus : ils circulent, consomment, et reviennent quand c'est leur tour.",
  openGraph: {
    title: "Vaguéo — Libérez vos clients, optimisez votre flux",
    description:
      "File d'attente intelligente par vagues dynamiques. Bêta gratuite 2026.",
    type: "website",
    locale: "fr_FR",
    siteName: "Vaguéo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaguéo — Libérez vos clients, optimisez votre flux",
    description: "File d'attente intelligente par vagues dynamiques.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
