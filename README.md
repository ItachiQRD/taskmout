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
> directeur de la publication, prestataire de paiement Stripe Payments Europe
> Ltd) et à renseigner les variables d'environnement Stripe / SMTP / société.

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

## Paiement, commandes et livraison automatisés

Le tunnel complet est branché :

1. **Panier** côté client (`/panier`, `CartContext` + `localStorage`).
2. **Checkout** (`/commande/paiement`) → formulaire de livraison → appel `POST /api/checkout/stripe`.
3. La route crée une **session Stripe Checkout** (le montant est *toujours* recalculé côté serveur depuis `data/catalog.json` ou le seed produits, jamais depuis le client) et redirige le navigateur sur l'URL Stripe.
4. Après paiement, Stripe redirige vers `/commande/merci?ref=…&session_id=…` qui appelle `POST /api/checkout/confirm` pour réconcilier la commande tout de suite côté UI.
5. **En parallèle**, le **webhook Stripe** `POST /api/webhooks/stripe` (événement `checkout.session.completed`, signature vérifiée) déclenche la routine `settleOrderIfPaidBySessionId` :
   - génère **automatiquement** les numéros `BC-YYYY-XXXXXXXX` (bon de commande) et `BL-YYYY-XXXXXXXX` (bon de livraison) ;
   - **rend les PDF** correspondants via `pdf-lib` (`src/lib/pdf.ts`) ;
   - envoie au **client** un email de confirmation avec les deux PDF en pièce jointe ;
   - envoie **au transporteur / service logistique** configuré (`CARRIER_NOTIFICATION_EMAIL`) un email contenant le bon de livraison PDF ;
   - **post** un payload JSON structuré (BC + BL + ligne de commande) vers `ORDER_WEBHOOK_URL` (et un second optionnel) — branchez n8n, Zapier, ou un ERP qui relaie vers les organismes comptables / logistiques.
6. Toute la routine est **idempotente** : un re-jeu webhook n'enverra pas les emails ni le payload une deuxième fois.

### Espace admin commandes (`/admin/commandes`)

- Toutes les commandes (status, BC/BL, état des notifications) sont listées.
- Boutons pour **re-télécharger** à tout moment le bon de commande et le bon de livraison en PDF (`/api/orders/[id]/invoice` et `/api/orders/[id]/delivery-note`).
- Passage du statut à **« Expédiée »** → envoi automatique de l'avis d'expédition au client.

### Mode test Stripe (recommandé pour démarrer)

1. Créez un compte gratuit sur [stripe.com](https://stripe.com).
2. Dans le dashboard, gardez le toggle **Test mode** activé.
3. Récupérez `sk_test_…` et `pk_test_…` dans *Developers → API keys*, et collez-les dans `.env.local`.
4. Pour recevoir le webhook en local :
   ```bash
   # Une fois (https://docs.stripe.com/stripe-cli)
   stripe login
   # Puis à chaque session de dev :
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   La CLI affichera un secret `whsec_…` à mettre dans `STRIPE_WEBHOOK_SECRET`.
5. Cartes de test (toujours `12/34`, CVC `123`) :
   - `4242 4242 4242 4242` → paiement accepté.
   - `4000 0000 0000 9995` → fonds insuffisants.
   - `4000 0025 0000 3155` → 3DS requise.

### Passage en production

- Remplacez les clés `sk_test_…` / `pk_test_…` par `sk_live_…` / `pk_live_…`.
- Créez un endpoint webhook permanent sur [dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks) pointant vers `https://VOTRE-DOMAINE/api/webhooks/stripe`, événement `checkout.session.completed`. Mettez son `Signing secret` dans `STRIPE_WEBHOOK_SECRET`.
- Configurez l'identité société (`COMPANY_*`) — elle apparaît dans l'en-tête des PDF.
- Configurez le SMTP (`SMTP_*` + `MAIL_FROM`) et `CARRIER_NOTIFICATION_EMAIL` pour que tout parte automatiquement.

### Persistance des commandes

Les commandes sont enregistrées sur disque dans `data/order-store.json` (auto-créé). Pour un déploiement sur un hébergeur **read-only** (Vercel, Netlify…), il faudra brancher ce module sur une base externe (Postgres, Supabase, Upstash KV) — la surface à remplacer se limite à `src/lib/order-store.ts`.

## Variables d'environnement

Voir `.env.example` pour la liste complète et commentée. Principales :

- `NEXT_PUBLIC_SITE_URL` — URL canonique (Open Graph + URLs de retour Stripe)
- `NEXT_PUBLIC_ADMIN_PASSWORD` — mot de passe admin
- `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` — Stripe
- `COMPANY_NAME`, `COMPANY_ADDRESS`, `COMPANY_SIRET`, `COMPANY_VAT`, `COMPANY_EMAIL`, `COMPANY_PHONE` — en-tête des PDF
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `MAIL_REPLY_TO` — emails transactionnels
- `CARRIER_NOTIFICATION_EMAIL` — adresse(s) du transporteur / service expédition (séparées par virgules)
- `ORDER_WEBHOOK_URL`, `ORDER_WEBHOOK_URL_SECONDARY`, `ORDER_WEBHOOK_SECRET` — relais JSON (n8n, Zapier, ERP)

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
