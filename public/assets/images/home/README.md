# Images — Page d'accueil

Ce dossier contient les visuels à intégrer sur la home Taskmout.
Format conseillé : **PNG / JPG, ratio respecté, ~2000px sur le côté long**, optimisés (~300 Ko à 1 Mo max).

> Tant que les images suivantes ne sont pas présentes, la home utilise des
> visuels de fallback issus de `/assets/images/savoir-plus/`. Une fois les
> nouvelles images ajoutées, remplace les chemins `SAVOIR_IMG(...)` par
> `HOME_IMG(...)` dans `src/app/page.tsx`.

## Fichiers attendus

| Nom de fichier | Section | Ratio | Description |
|---|---|---|---|
| `atelier-taskmout.png` | La maison Taskmout — visuel principal | 4:5 vertical | Atelier artisanal lumineux, mains qui versent une huile dorée |
| `portrait-fondateur.png` | La maison Taskmout — vignette flottante | 1:1 carré | Portrait du fondateur, ambiance chaleureuse |
| `categorie-huiles.png` | Catégories phares — tuile « Huiles » | 4:5 vertical | Bouteille d'huile d'argan/olive sur fond pierre, lumière dorée |
| `categorie-amlou.png` | Catégories phares — tuile « Amlou » | 4:5 vertical | Pot d'amlou ouvert, cuillère, amandes éclatées, miel qui coule |
| `categorie-miel.png` | Catégories phares — tuile « Miel » | 4:5 vertical | Pot de miel, rayon, cuillère qui coule, lumière chaude |
| `categorie-coffrets.png` | Catégories phares — tuile « Coffrets » | 4:5 vertical | Coffret bois ouvert avec produits Taskmout, ruban |
| `process-1-selection.png` | Savoir-faire étape 01 | 4:3 paysage | Sélection des amandons / olives / miel dans des paniers tressés |
| `process-2-pression.png` | Savoir-faire étape 02 | 4:3 paysage | Pression à froid, huile dorée qui coule, gros plan |
| `process-3-conditionnement.png` | Savoir-faire étape 03 | 4:3 paysage | Préparation de l'amlou en atelier, gestes précis |
| `process-4-controle.png` | Savoir-faire étape 04 | 4:3 paysage | Dégustation / contrôle qualité, étiquetage final |

## Prompts détaillés (Gemini / Midjourney)

> Style général : photographie premium, palette ambrée + olive + crème,
> lumière douce mais contrastée, fond sombre/pierre, esthétique éditoriale
> orientale moderne. Pas de texte dans l'image.

### `atelier-taskmout.png` (4:5)
> Photographie éditoriale verticale d'un atelier artisanal sombre et chaleureux.
> Au premier plan, deux mains soigneuses versent un filet d'huile d'argan
> dorée dans un flacon en verre ambré. Sur le plan de travail en bois patiné
> : amandons d'argan, branches de feuilles d'olivier, mortier en pierre,
> cuillère en olivier. Lumière latérale dorée style clair-obscur. Arrière-plan
> flou laissant deviner des étagères avec d'autres flacons et un sac de
> jute. Atmosphère premium, cinématographique, palette ambre/olive/crème
> sur fond pierre sombre. Pas de texte, pas de logo.

### `portrait-fondateur.png` (1:1)
> Portrait carré, demi-buste, d'un homme marocain souriant avec barbe
> taillée, dans un atelier en bois sombre. Il tient un flacon d'huile
> d'argan dans la main et regarde calmement l'objectif. Lumière douce
> dorée venant de la gauche, fond bokeh chaud. Vêtements simples
> et élégants (chemise lin écrue ou tablier de cuir). Atmosphère
> chaleureuse, authentique, pas posée. Style éditorial premium.

### `categorie-huiles.png` (4:5)
> Mise en scène verticale d'une bouteille d'huile d'argan en verre ambré
> et d'une bouteille d'huile d'olive verte, posées sur une pierre
> sombre. Quelques olives et amandons d'argan autour. Une goutte d'huile
> dorée qui coule sur le côté. Lumière de studio dorée latérale,
> fond noir profond avec halo ambré. Style éditorial premium, palette
> argan/olive sur fond pierre.

### `categorie-amlou.png` (4:5)
> Photo verticale d'un pot ouvert d'amlou (pâte beige doré onctueuse)
> sur une pierre sombre. Cuillère en bois remplie d'amlou, amandes éclatées
> autour, filet de miel doré qui coule en arrière-plan. Quelques feuilles
> d'arganier décoratives. Lumière chaude latérale, fond sombre pierre,
> palette ambre miel.

### `categorie-miel.png` (4:5)
> Photo verticale macro d'un pot de miel doré ouvert, rayon de miel
> visible, cuillère en bois suspendue laissant couler un filet de miel
> brillant. Quelques fleurs séchées et amandes autour. Lumière dorée
> chaude, fond sombre pierre, palette or/ambre.

### `categorie-coffrets.png` (4:5)
> Photo verticale d'un coffret cadeau en bois clair ouvert, contenant
> une bouteille d'huile d'argan, un pot de miel, un pot d'amlou,
> calés dans de la paille naturelle. Ruban en lin écru attaché sur
> le couvercle. Lumière dorée latérale, fond sombre pierre, ambiance
> luxe artisanal.

### `process-1-selection.png` (4:3)
> Photo paysage, gros plan sur des mains qui trient des amandons
> d'argan dans un grand panier en osier. Sur le côté, branches d'olivier,
> sac de jute ouvert avec olives. Lumière naturelle dorée d'atelier
> traditionnel marocain. Palette ocre/ambre/olive.

### `process-2-pression.png` (4:3)
> Photo paysage cinématographique d'une presse à huile artisanale en
> bois et pierre. Filet d'huile d'argan dorée qui coule depuis le bec
> de la presse vers une jarre en céramique. Lumière dorée latérale
> qui révèle la texture de l'huile. Fond sombre, palette ambre.

### `process-3-conditionnement.png` (4:3)
> Photo paysage d'un plan de travail d'atelier propre. Mains qui
> mélangent l'amlou (pâte dorée) avec une spatule en bois dans un
> grand bol en céramique. Petits pots vides alignés à côté, prêts à
> être remplis. Lumière douce de studio, palette crème/ambre.

### `process-4-controle.png` (4:3)
> Photo paysage d'une scène de dégustation atelier : flacon d'huile
> en verre ambré, petite cuillère, fiche de dégustation avec écriture
> manuscrite, tampon de cire qui scelle un coffret. Lumière dorée chaude,
> ambiance artisanale haut de gamme.

## Comment intégrer

1. Place chaque image dans ce dossier (`/public/assets/images/home/`).
2. Dans `src/app/page.tsx`, remplace les usages de `SAVOIR_IMG(...)` par `HOME_IMG(...)` pour les visuels que tu veux migrer (les paths `atelier-taskmout.png` et `portrait-fondateur.png` sont déjà commentés en suspens).
3. Re-déploie.
