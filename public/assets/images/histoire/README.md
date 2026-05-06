# Images — Page « Notre histoire »

Ce dossier accueille les visuels dédiés à la page `/histoire`.
Format conseillé : **PNG / JPG ~2000px côté long**, optimisés.

> La page `/histoire` utilise actuellement des fallbacks issus de
> `/assets/images/savoir-plus/`. Une fois les images dédiées ajoutées,
> remplace les chemins dans `src/app/histoire/page.tsx` (helper `IMG`).

## Fichiers attendus

| Nom de fichier | Section | Ratio | Description |
|---|---|---|---|
| `hero-arganier.png` | Hero — fond ou visuel principal | 16:9 paysage | Champ d'arganiers au coucher du soleil, montagnes du Sud marocain |
| `origines-cuisine-famille.png` | Origines — récit principal | 4:3 paysage | Mains familiales préparant l'amlou ou versant une huile, table marocaine |
| `timeline-souk.png` | Timeline 01 — Origines | 4:3 paysage | Souk traditionnel, paniers d'épices, amandons et flacons |
| `timeline-apprentissage.png` | Timeline 02 — Apprentissage | 4:3 paysage | Transmission d'un geste : ancien et jeune, mortier en pierre |
| `timeline-atelier-reims.png` | Timeline 03 — Atelier | 4:3 paysage | Atelier moderne à Reims, plan de travail propre, flacons alignés |
| `timeline-marque.png` | Timeline 04 — Taskmout | 4:3 paysage | Coffret Taskmout finalisé avec étiquette élégante |
| `savoir-faire-mosaic-1.png` | Mosaïque savoir-faire | 1:1 carré | Gros plan sur amandons d'argan |
| `savoir-faire-mosaic-2.png` | Mosaïque savoir-faire | 1:1 carré | Gros plan sur olives noires brillantes |
| `savoir-faire-mosaic-3.png` | Mosaïque savoir-faire | 1:1 carré | Gros plan sur miel qui coule |
| `savoir-faire-mosaic-4.png` | Mosaïque savoir-faire | 1:1 carré | Gros plan sur amlou sur tartine |
| `valeurs-ambiance.png` | Valeurs — visuel d'ambiance (option.) | 16:9 paysage | Atelier au calme, mains au travail |

## Prompts détaillés (Gemini / Midjourney)

> Style général : photographie éditoriale premium, palette ambre/olive/crème
> sur fond sombre ou pierre, lumière dorée latérale chaleureuse, atmosphère
> artisanale et authentique. **Aucun texte ni logo dans l'image.**

### `hero-arganier.png` (16:9)
> Photographie cinématographique panoramique d'un champ d'arganiers
> centenaires aux branches noueuses, dans le Sud-Ouest marocain au
> coucher du soleil. Soleil rasant doré, montagnes de l'Anti-Atlas en
> arrière-plan, sol ocre, quelques chèvres au loin. Atmosphère épique,
> palette ambre/sable/olive, halo doré, légère brume. Style éditorial
> National Geographic, contraste élevé.

### `origines-cuisine-famille.png` (4:3)
> Photo intime d'une cuisine marocaine traditionnelle. Sur une table
> en bois sombre, deux mains féminines versent un filet d'huile d'argan
> dorée sur du pain rond marocain. Autour : pots de miel, bol d'amlou,
> théière en argent, verres à thé décorés, dattes, amandes. Lumière
> dorée latérale, ambiance chaleureuse familiale. Détail soigné des
> textures. Pas de visage visible.

### `timeline-souk.png` (4:3)
> Photo d'un souk marocain traditionnel. Étal en bois rempli de paniers
> d'épices colorées (curcuma, paprika, ras el-hanout), bocaux d'amlou,
> flacons d'huile d'argan en verre ambré, amandons en vrac. Lumière
> tamisée chaude, arrière-plan flou révélant l'animation du marché.
> Palette ocre/ambre/safran.

### `timeline-apprentissage.png` (4:3)
> Photo intergénérationnelle dans un atelier traditionnel marocain.
> Une main âgée guide une main jeune sur un mortier en pierre où
> sont broyés des amandons d'argan grillés. Lumière dorée latérale
> qui sculpte les mains, fond sombre, ambiance transmission et patience.
> Style éditorial premium.

### `timeline-atelier-reims.png` (4:3)
> Photo d'un atelier artisanal moderne à Reims. Plan de travail en bois
> clair impeccable, alignement de flacons d'huile d'argan ambrés et de
> pots d'amlou bouclés. Sur le mur, étagère avec coffrets en bois
> Taskmout. Lumière naturelle douce venant d'une fenêtre à gauche.
> Palette crème/ambre/bois.

### `timeline-marque.png` (4:3)
> Photo packshot premium d'un coffret Taskmout finalisé : couvercle
> en bois clair entrouvert laissant voir une bouteille d'huile d'argan,
> un pot de miel et un pot d'amlou. Étiquette élégante avec sceau de
> cire ambré (sans texte lisible). Fond sombre pierre, lumière dorée
> dramatique latérale.

### `savoir-faire-mosaic-1.png` à `-4.png` (1:1)
> Quatre photos macros carrées sur fond sombre pierre, lumière dorée
> latérale dramatique, ambiance studio premium :
> 1. Tas d'amandons d'argan secs craquelés, gros plan sur la texture.
> 2. Olives noires et vertes brillantes encore humides, gros plan.
> 3. Cuillère en bois inclinée laissant couler un filet de miel doré.
> 4. Tartine de pain campagne avec amlou onctueux étalé en torsade,
>    quelques amandes éclatées posées dessus.

### `valeurs-ambiance.png` (16:9, optionnel)
> Photo panoramique d'atmosphère atelier : mains qui scellent un coffret
> avec un cordon en lin, en arrière-plan flou des flacons d'huile
> alignés sur une étagère. Lumière dorée latérale, palette ambre/crème,
> fond sombre. Style éditorial premium.

## Comment intégrer

1. Place chaque image dans ce dossier (`/public/assets/images/histoire/`).
2. Dans `src/app/histoire/page.tsx`, remplace `IMG('xxx.png')` (qui pointe sur `savoir-plus/`) par un nouveau helper `HISTOIRE_IMG = (p) => '/assets/images/histoire/' + p` pour les visuels migrés.
3. Re-déploie.
