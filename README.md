# Vaguéo — Landing Page

Landing page de présentation pour **Vaguéo**, un système de file d'attente virtuelle par vagues dynamiques.

## Concept

Vaguéo permet aux clients de rejoindre une file d'attente via QR code, puis de circuler librement en attendant leur tour. L'algorithme calcule les vagues à rappeler en fonction de la cadence du stand et notifie chaque client au bon moment.

**Cibles :** festivals, food-trucks, restaurants de rue, boutiques, pop-up stores, drops sneakers.

## Stack technique

| Outil | Rôle |
|---|---|
| Next.js 16 (App Router) | Framework React, SSG + API routes |
| TypeScript | Typage statique |
| Framer Motion | Animations scroll-reveal |
| Canvas 2D API | Globe 3D wireframe interactif |
| React Hook Form + Zod v4 | Formulaire de contact validé |
| Resend | Envoi d'emails transactionnels |
| Vercel Analytics | Suivi des visites |
| Vercel | Déploiement et hosting |

## Fonctionnalités

### Landing page
- **Hero** — Globe 3D interactif canvas, headline animée, CTA bêta
- **Problème** — Scènes SVG avant/après illustrant la friction des files classiques
- **Solution** — 4 étapes du parcours client + carte tech
- **Sécurité** — Démo live de rotation des couleurs anti-fraude
- **ROI** — Statistiques d'impact + carte bêta
- **Contact** — Formulaire (prénom, email, type d'établissement, message) avec envoi par Resend
- **Nav mobile** — Menu hamburger avec accès aux sections

### Prototype interactif (démo)
Accessible via le bouton **"Voir la démo interactive"** dans la section Solution et au-dessus du formulaire de contact.

- **État partagé en temps réel** entre le téléphone client et le téléphone vendeur
- **Écrans client :** Splash (QR), Attente (vague animée, timer), Check-in (présence), Validation (couleur anti-fraude live + horloge), Merci
- **Écran vendeur :** couleur en cours, stats présents/attente, contrôle affluence, pause/ouverture de file
- **Gestion de la pause :** si le stand est mis en pause, le client en file voit un écran dédié ("Stand en pause, votre place est conservée"), y compris depuis l'écran orange et depuis la présence validée
- **Desktop :** layout 3 colonnes (téléphone client · panneau de contrôle · téléphone vendeur)
- **Mobile :** plein écran avec 2 onglets (Client / Vendeur) + bouton d'avancement de l'étape client dans la barre d'onglets

## Lancer en local

```bash
npm install
```

Créez un fichier `.env.local` à la racine :

```
RESEND_API_KEY=re_xxxxxxxxxxxx
```

Puis :

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Clé API Resend pour l'envoi des candidatures bêta |

## Structure du projet

```
app/
  api/contact/route.ts   # Endpoint envoi email (Resend)
  layout.tsx             # Fonts, metadata OG, Analytics
  page.tsx               # Assemblage des sections
  globals.css            # Design tokens, animations CSS
  icon.png               # Favicon (auto-détecté par Next.js)
  opengraph-image.tsx    # Image OG générée au build (logo PNG + tagline)

components/
  Nav.tsx                # Navigation fixe + menu hamburger mobile
  Hero.tsx               # Globe 3D interactif + headline
  Problem.tsx            # Scènes SVG avant/après
  Solution.tsx           # 4 étapes du parcours client + CTA démo
  Security.tsx           # Démo couleurs anti-fraude live
  ROI.tsx                # Stats + carte bêta
  CtaFooter.tsx          # Formulaire de contact + footer
  demo/
    DemoModal.tsx        # Modal prototype : état partagé, layout desktop/mobile
    screens.tsx          # Tous les écrans client et vendeur
    IOSFrame.tsx         # Cadre iPhone (dynamic island, status bar, home indicator)
    design.tsx           # Tokens, palette, composants (VgButton, WaveBackground…)

public/
  vagueo-logo.png        # Logo (aussi utilisé comme favicon via app/icon.png)
```

## Déploiement

Le projet est déployé sur Vercel via intégration GitHub (push sur `main` = déploiement automatique).

Ajoutez `RESEND_API_KEY` dans **Settings → Environment Variables** avant le premier déploiement.
