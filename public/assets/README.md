# Médias du site (Taskmout)

Arborescence des fichiers statiques.

## Structure

```
public/
  assets/
    video/          # Vidéos
      hero.mp4      # Fond du hero (page d'accueil)
      section1.mp4  # Vidéo de la section « Une huile de qualité » (sans fond)
    images/         # Images
      sequence/     # Trame d'images (000.png … 239.png) si réutilisée
```

Les URLs dans le code pointent vers `/assets/video/...` et `/assets/images/...`.

## Ancien emplacement

Les fichiers étaient auparavant dans `public/images/`. Tout a été déplacé ici pour une structure plus claire.
