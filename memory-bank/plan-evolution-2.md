# Évolution 2 — « Charlie, inventeur du monde » devient un vrai jeu immersif

## Pourquoi

La version 1 (chantier 1 livré) est une app d'exercices bien habillée : des écrans qui s'enchaînent.
Objectif de l'Évolution 2 : **un monde dans lequel on est**, pas une page web qu'on lit. On se déplace,
on découvre, on parle aux gens — et les révisions restent le cœur, déguisées en gestes d'ingénieur.

**Principe directeur : Phaser fait le monde, React fait l'établi.**
Le moteur pédagogique (`src/game/`, `src/content/`) ne change PAS — il est déjà indépendant de l'UI
et couvert par 57 tests. On remplace la présentation, pas le cerveau.

## La cible, vue par l'enfant

1. J'ouvre le jeu : je **suis** dans le village d'Aït-Soleil en pixel art. Je déplace Charlie aux
   flèches (ou je touche l'écran, il marche tout seul).
2. Le chantier du puits est **dans le monde** : des villageois s'affairent, un panneau « À l'aide ! »
   flotte au-dessus. Je m'approche → une bulle : « Construire ? »
3. J'appuie → **l'établi s'ouvre** (overlay plein écran, le monde se fige et s'assombrit) : c'est la
   mission actuelle (une question à l'écran, points ●●●, zéro chrono). À la fin, l'établi se referme
   → je **vois** le puits monter d'un cran dans le monde, les villageois applaudissent.
4. Hana Atori est un **PNJ dans le village** : je marche vers elle, je lui parle (bulles BD), elle
   m'apprend le coup de pied de fer.
5. Le bazar est une **échoppe** : j'entre, j'achète, Charlie porte le foulard **dans le monde**.
6. Je voyage en dirigeable (transition animée) vers les autres villages, et vers **Bellerive**, que je
   reconstruis et où je me balade librement.

## Assets — kits CC0 (déjà téléchargés dans `assets-kits/`)

| Kit | Contenu | Usage |
|---|---|---|
| `kenney_tiny-town` (16×16, 130 tiles) | maisons, arbres, chemins, eau, enclos | tilemaps des villages + Bellerive |
| `kenney_tiny-dungeon` (16×16) | personnages, objets, cœurs, pièces | Charlie, PNJ, mentors, objets au sol |
| `kenney_ui-pack` (430 fichiers) | boutons, panneaux, curseurs | HUD Phaser + habillage de l'établi |

Licence **Creative Commons CC0** (domaine public) → compatibles avec le repo public, aucune attribution
requise (on créditera Kenney dans le README par politesse). Source : kenney.nl.
Les spritesheets `tilemap_packed.png` sont copiées dans `public/kits/` pour le chargement Phaser.
À compléter si besoin : `kenney_rpg-audio` (sons CC0 : pas, cloches, portes).

Style : on assume le **pixel art chaleureux** (cohérent, éprouvé, lisible) à la place de l'aquarelle SVG.
Zoom ×3, `pixelArt: true`, palette chaude des villages conservée via les teintes de fond.

## Architecture

```
React (App)
 ├─ PhaserHost.tsx        ← monte UNE instance Phaser.Game, la détruit proprement
 │   └─ scènes Phaser
 │       Boot/Preload     ← charge kits, barres de progression diégétique (« Pixel calibre… »)
 │       VillageScene     ← tilemap d'un village (data-driven : aitSoleil.ts, bellerive.ts…)
 │       VoyageScene      ← transition dirigeable entre villages
 │       HUDScene         ← pièces/grade/pause, toujours par-dessus
 ├─ Overlay React (conditionnel, par-dessus le canvas)
 │   Mission / VolEssai / Bazar / Carnet / Parents   ← écrans existants, quasi inchangés
 └─ store (useReducer + localStorage)                ← INCHANGÉ
```

**Pont Phaser ↔ React** (`src/ui/phaser/pont.ts`) : un petit EventEmitter typé.
- Phaser → React : `ouvrirMission(village)`, `ouvrirBazar()`, `dialogue(pnj)`…
- React → Phaser : `missionFinie(resultat)`, `saveChangé(save)` (le monde lit le save pour afficher
  l'état des chantiers, l'équipement de Charlie, les constructions de Bellerive).
- Le monde **se fige** (`scene.pause`) quand un overlay est ouvert — une seule source d'attention
  (contrainte TDAH inchangée).

**Déplacement** : flèches/WASD + **tap-to-move** (pathfinding naïf sur grille, les villages sont
petits). Cibles tactiles inutiles dans le monde : tout est « s'approcher + un seul bouton d'action ».

**Interactions** : `zones` déclarées dans les données du village (chantier, PNJ, échoppe, panneau) ;
à proximité → pictogramme flottant + touche/tap → événement vers React ou bulle de dialogue in-world
(plugin maison de bulles BD, texte court, une idée par phrase — le ton d'écriture ne change pas).

## Adaptations TDAH — reconduites telles quelles

Une question à l'écran (l'établi), zéro chrono visible, erreurs douces + réinsertion, anti-spirale,
sortie propre à tout moment (pause → on retrouve Charlie là où il était), 2-3 missions par session
puis Pixel propose la balade, `prefers-reduced-motion` + réglage (le monde devient statique :
pas de particules, pas d'oiseaux), sons doux et optionnels. **Le monde ne bouge jamais pendant une
question.**

## Étapes (petites, testables — un commit chacune)

1. **Socle Phaser** : `npm i phaser`, `PhaserHost.tsx`, copie des tilemaps dans `public/kits/`,
   scène vide fond sable. ✔ le canvas s'affiche dans l'app sans casser les tests.
2. **Village marchable** : tilemap Aït-Soleil (sol, maisons, palmiers, collisions), Charlie sprite
   4 directions, caméra qui suit, flèches + tap-to-move. ✔ on se promène.
3. **Interactions** : zones chantier/PNJ/échoppe, pictos flottants, bulles de dialogue.
   ✔ parler à un villageois affiche une bulle.
4. **L'établi branché** : zone chantier → overlay Mission React (le monde se fige) ; fin de mission →
   le sprite du puits passe à l'étape suivante, petite fête de particules (sauf reduced-motion).
   ✔ boucle complète mission ↔ monde.
5. **Hana in-world + bazar-échoppe** : PNJ mentor avec sa scène d'apprentissage en bulles ; échoppe →
   overlay Bazar ; l'équipement se voit sur le sprite de Charlie (teinte/chapeau superposé).
   ✔ le foulard acheté apparaît sur Charlie qui marche.
6. **Vol d'essai diégétique** : premier lancement → cabine de l'Atelier Volant (scène simple),
   Pixel calibre les instruments (overlay VolEssai existant). ✔ premier lancement complet in-world.
7. **Voyage + villages 2-3** : VoyageScene (dirigeable), tilemaps Playa Colibrí et Linh-Giang,
   générateurs M5/M6/L2/L4 restants + formats `tiles`, mentors 2-3. ✔ chapitre 1 complet in-world.
8. **Bellerive** : tilemap, emplacements de reconstruction (le plan rapporté → chantier visible →
   bâtiment fini animé), habitants avec dialogues, mode balade natif. ✔ reconstruire + se balader.
9. **Ambiance & finitions** : sons CC0 discrets (pas, clochette de réussite), jour/soir à Bellerive,
   salle des cartes parent, accessibilité (navigation clavier complète des overlays).

Livrable minimal visible dès l'étape 4 — chaque étape laisse un jeu jouable.

## Risques et parades

- **Poids du repo** : kits ≈ 1,5 Mo décompressés — négligeable. Pas d'audio lourd.
- **Perf** : villages 40×30 tiles max, une seule scène active — trivial pour Phaser.
- **Régression pédagogique** : impossible par construction, `game/` et `content/` intacts + tests.
- **Charge de dessin** : plus aucun SVG de décor à écrire à la main — les kits couvrent tout ;
  seul le sprite « équipement de Charlie » demande un peu de composition.
