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
| React Hook Form + Zod | Formulaire de contact validé |
| Resend | Envoi d'emails transactionnels |
| Vercel Analytics | Suivi des visites |
| Vercel | Déploiement et hosting |

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
  icon.png               # Favicon

components/
  Nav.tsx                # Navigation fixe avec scroll effect
  Hero.tsx               # Globe 3D interactif + headline
  Problem.tsx            # Scènes SVG avant/après
  Solution.tsx           # 4 étapes du parcours client
  Security.tsx           # Démo couleurs anti-fraude live
  ROI.tsx                # Stats + carte bêta
  CtaFooter.tsx          # Formulaire de contact + footer

public/
  vagueo-logo.png        # Logo
```

## Déploiement

Le projet est déployé sur Vercel. Ajoutez `RESEND_API_KEY` dans Settings → Environment Variables avant de pousser.

```bash
npx vercel --prod
```
