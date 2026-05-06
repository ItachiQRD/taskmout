# Taskmout — Huiles & saveurs du Maroc

Site e-commerce moderne pour la vente d'huiles d'argan, d'olive, d'amlou et de
miel artisanaux du Maroc, travaillés à Reims. Stack Next.js 14 / React 18 /
TypeScript / Tailwind, conforme RGPD.

![Stack](https://img.shields.io/badge/Next.js-14-black) ![React](https://img.shields.io/badge/React-18-blue) ![TS](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-06b6d4)

## Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Préparer les variables d'environnement
cp .env.example .env.local
# puis éditer .env.local (mot de passe admin, URL du site, etc.)

# 3. Lancer en dev
npm run dev
# → http://localhost:3000

# 4. Build + démarrage prod
npm run build
npm start
```

## Structure du site

| Route | Description |
|---|---|
| `/` | Accueil — hero vidéo, maison Taskmout, catégories, savoir-faire, témoignages, contact |
| `/savoir-plus` | Bienfaits, recettes, dispositions losange — page éditoriale |
| `/articles` | Catalogue avec filtres, tri, recherche, pagination |
| `/produit/[id]` | Fiche produit |
| `/panier` | Panier client (localStorage) |
| `/histoire` | Notre histoire — héritage marocain, timeline, savoir-faire |
| `/contact` | Formulaire contact + map Reims + horaires |
| `/mentions` | Mentions légales, politique de confidentialité (RGPD), cookies, CGV |
| `/admin/*` | Espace admin (CRUD produits, catégories, commandes, stocks) |

## Conformité RGPD

Le site est livré conforme par défaut :

- **Bandeau cookies** (`CookieBanner`) avec choix granulaire (essentiels / mesure d'audience).
- **Aucun cookie publicitaire ni traceur tiers** par défaut.
- **Consentement explicite** sur les formulaires de contact (case à cocher obligatoire).
- **Politique de confidentialité** complète sur `/mentions` (finalités, durées, droits, CNIL).
- Données stockées localement (`localStorage`) tant qu'aucune commande n'est envoyée à un backend.

> Pour une mise en production complète, pensez à compléter `/mentions` (SIRET,
> directeur de la publication, prestataire de paiement) et à brancher un
> backend pour l'envoi réel des messages et des commandes.

## Espace administrateur

- **URL** : `/admin/login`
- **Mot de passe** : variable `NEXT_PUBLIC_ADMIN_PASSWORD` (défaut `taskmout`)
- Modules : tableau de bord, commandes, produits (CRUD), stocks, catégories.
- Stockage : `localStorage` (à brancher sur une vraie base si besoin).

## Design system

- **Palette** : argan (or/ambre), olive (vert), crème, dune — inspirée du Maroc.
- **Typographies** : Playfair Display (titres), DM Sans (texte), Amiri (oriental).
- **Composants** réutilisables : `AnimateSection`, `ProductCard`, `RecettesCarousel`,
  `HomeContactSection`, `HeroVideo`, `HeroCarousel`, `SectionVideo`, `CookieBanner`.
- **Animations** : scroll-triggered via `IntersectionObserver`, hover micro-interactions,
  staggered delays.
- **Accessibilité** : zones cliquables ≥ 44px, focus visible, `aria-*`, `prefers-reduced-motion`.

## Stack technique

- **Next.js 14** (App Router) + **React 18** + **TypeScript 5**
- **Tailwind CSS 3** avec config personnalisée (palette, animations, fonts)
- **Lucide React** pour les icônes
- `next/image` pour les images optimisées (lazy, responsive `sizes`)
- `next/font/google` pour Playfair, DM Sans, Amiri

## Ajouter des images

- **Home** : `public/assets/images/home/` — voir `README.md` du dossier
- **Histoire** : `public/assets/images/histoire/` — voir `README.md` du dossier
- **Savoir plus** : `public/assets/images/savoir-plus/`

Format conseillé : PNG / JPG, ratios respectés, ~2000px sur le côté long, optimisés.

## Variables d'environnement

Voir `.env.example`. Variables disponibles :

- `NEXT_PUBLIC_SITE_URL` — URL canonique pour Open Graph
- `NEXT_PUBLIC_ADMIN_PASSWORD` — mot de passe admin

## Déploiement

### Vercel (recommandé)

1. Pousser sur GitHub
2. Importer le repo sur [vercel.com](https://vercel.com)
3. Renseigner les variables d'env dans le dashboard Vercel
4. Déploiement automatique à chaque push

### Build manuel

```bash
npm run build
npm start
```

## Licence

© Taskmout. Tous droits réservés.
