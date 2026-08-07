# « Charlie, inventeur du monde » — Chapitre 1

## Context

Jeu de révision **maths + lecture** pour un enfant de 8 ans avec TDAH, qui **entre en CE2** en septembre 2026. L'objectif n'est pas de découvrir le programme mais de **devenir à l'aise** : consolider les acquis de CE1 et prendre de l'avance sereinement sur le CE2. Le dossier `/Users/gpolaert/Projects/charlie` est vide : projet from scratch, app React lancée par `npm run dev`, jouable dans Chrome, sauvegarde locale, chapitre 1 complet et rejouable. Repo GitHub public `gpolaert/charlie`.

**Contenu calibré sur le programme officiel de cycle 2** (BO du 31/10/2024, applicable rentrée 2025) — lu et extrait pendant la phase de recherche. Deux décisions qui en découlent :

- *« les deux tiers du temps d'enseignement des mathématiques […] consacrés à Nombres, calcul et résolution de problèmes »* → règle de pondération interne aux maths du sélecteur de missions.
- **Sur le chrono, le programme recommande l'inverse de notre choix, et on l'assume.** Il préconise de banaliser les tests chronométrés (*« en faire de véritables routines […] n'engendrant plus de stress »*). Le **zéro chrono visible est une adaptation TDAH choisie par toi** : la vitesse est mesurée **en silence** pour le tableau de bord parent (les repères officiels restent suivis), et un mode « défi vitesse » activable est prévu comme extension si l'enfant y devient réceptif.

**Niveau :** la bibliothèque couvre trois paliers étiquetés par exercice — `CE1-consolidation` → `début CE2` → `CE2`. Un **test de positionnement** au premier lancement place l'enfant **par domaine** (il peut être CE2 en calcul et CE1-consolidation en dictée). Le jeu s'adapte ensuite tout seul et reste pertinent toute l'année.

---

## Storytelling — « Charlie, inventeur du monde »

### Le pitch

**Charlie, 8 ans, inventeur-explorateur, vit à Bellerive**, un village au bord d'une rivière. Une nuit, une grande crue abîme tout : le pont, le moulin, l'école, les lampadaires. Les habitants ne baissent pas les bras — mais il leur manque des plans, des matériaux, des idées.

Alors Charlie embarque dans son **Atelier Volant** (un petit dirigeable-atelier) avec une promesse : *faire le tour du monde, aider d'autres villages, apprendre auprès d'eux — et rapporter à Bellerive tout ce qu'il faut pour la reconstruire, en mieux.*

Partout, des villages ont besoin d'un coup de main : un puits à réparer, de l'électricité à produire, des vélos à assembler. Charlie les aide en **résolvant des problèmes** (les missions = les exercices, toujours déguisés en gestes d'ingénieur). En retour, les villages ne le paient pas : ils lui **offrent des objets et des plans** — le plan de la centrale solaire, un vélo-cargo, des graines, des lanternes. Et en chemin, il rencontre des **personnages qui lui enseignent leur technique**.

**La boucle du jeu, en une phrase :** *j'aide un village → je gagne de l'XP, des pièces, des objets et des techniques → je fais évoluer mon personnage et je reconstruis Bellerive.*

À bord, un compagnon permanent : **Pixel**, petit robot-boussole bricolé par Charlie. C'est **lui qui parle** à l'enfant — consignes, encouragements, explication des erreurs. Curieux, enthousiaste, jamais moqueur : *« Hmm, pas tout à fait — regarde, je te montre un truc. »* Une seule voix qui guide = une ambiance stable.

### Les mentors et leurs techniques

Dans chaque village, Charlie croise un **personnage connu de l'univers BD/série de l'enfant**, venu prêter main-forte. Chacun lui enseigne sa **technique** : un pouvoir utilisable en mission (nombre d'usages limité par mission, rechargé à la mission suivante — une aide, jamais une réponse donnée).

| Mentor | Technique | Effet en mission |
|---|---|---|
| **Hana Atori** | **Le coup de pied de fer** | fait voler en éclats une mauvaise réponse d'un QCM (un 50/50) |
| **Écorime** | **Le pouvoir des sons** | fait prononcer à voix haute le mot, la consigne ou l'énoncé (aide lecture/dictée) |
| *(3ᵉ mentor du chapitre)* | **Le regard d'aigle** | révèle un indice visuel : surligne les dizaines, matérialise la barre du schéma, etc. |

Chaque technique est apprise lors d'une **scène courte** (le mentor montre, Charlie répète — 3 items d'entraînement), puis reste équipée. Les mentors réapparaissent ensuite pour féliciter aux moments clés.

**Implémentation prudente de l'IP :** ces personnages viennent d'œuvres existantes ; le roster vit dans un fichier de données unique (`content/mentors.ts` : nom, apparence SVG, réplique, technique) pour rester **facilement renommable/remplaçable**, et le repo public ne contiendra **aucune image copiée** — uniquement nos SVG originaux « inspirés de ». Si tu me donnes les références exactes (série/BD), je m'approche de l'esprit des personnages sans copier leur design.

### Tout est diégétique

| Mécanique de jeu | Dans l'histoire, c'est… |
|---|---|
| Test de positionnement | **« Le vol d'essai »** : Pixel calibre les instruments avant le grand départ |
| Une mission (8-10 questions) | Un **plan de construction** à compléter, pièce par pièce |
| Bonne réponse → pièces ⚙️ | Une pièce usinée qui rejoint le chantier |
| Erreur | *« Cette pièce ne s'emboîte pas »* — Pixel montre pourquoi, on la remet à l'établi (l'item revient plus tard) |
| Power-up | La **technique** d'un mentor, apprise de lui |
| Micro-pause entre missions | Le **chantier du village se monte à l'écran** (échafaudages, villageois qui aident) |
| Fin de chantier | Fête au village + **cadeau** (objet ou plan pour Bellerive) + carte du **carnet de cultures** |
| Montée de niveau (XP) | Le **brevet d'inventeur** monte d'un grade → équipements et constructions débloqués |
| Boutique | Le **bazar des villages** : dépenser ses pièces en équipement et matériaux |
| Tableau de bord parent | La **salle des cartes** de l'Atelier (verrouillée par une porte à calcul) |

### Chapitre 1 — trois villages autour du monde

Villages **fictifs inspirés de régions réelles** (pour ne travestir aucun lieu existant). Chacun débloque une carte « carnet de cultures » (salutation dans la langue, plat, instrument) qui sert ensuite de support aux exercices de lecture.

1. **Aït-Soleil** (inspiration Atlas, Maroc) — **le Puits à pompe**. Le village n'a plus d'eau. Mentor : Hana Atori. → cadeaux : plan « château d'eau » + foulard d'explorateur.
2. **Playa Colibrí** (inspiration Amérique centrale) — **la Centrale solaire**. L'école n'a pas de lumière. Mentor : Écorime. → cadeaux : plan « panneaux solaires » + lunettes d'atelier.
3. **Linh-Giang** (inspiration Asie du Sud-Est) — **les Vélos-cargo et le pont de bambou**. Le marché est coupé du village. Mentor : le 3ᵉ. → cadeaux : plan « pont neuf » + le vélo-cargo de Charlie.

Fin de chapitre : retour à Bellerive, inauguration de ce qui a été reconstruit, photo-souvenir des trois villages — et la carte du monde révèle de nouveaux appels à l'aide qui clignotent (teaser chapitre 2).

### Bellerive, le village à reconstruire (l'univers de Charlie)

Le « chez-lui » du jeu et la matérialisation visible de son travail, **sans aucun chiffre**.

- **Reconstruction** : une vue du village en SVG avec des **emplacements de chantier** (pont, moulin-éolienne, château d'eau, panneaux solaires sur l'école, atelier à vélos, potager, lanternes, cabane-tyrolienne). Chaque plan rapporté ou matériau acheté permet de lancer une reconstruction ; l'enfant choisit l'emplacement et l'ordre. Les constructions s'animent doucement (roue qui tourne, eau qui coule, lanternes qui s'allument le soir).
- **Mode balade (exploration libre)** : à tout moment, sans mission ni récompense — Charlie **se déplace** dans Bellerive (flèches ou clic), entre dans les lieux reconstruits, et **parle aux habitants**. Leurs répliques sont d'une-deux phrases courtes au niveau de lecture de l'enfant : la balade fait lire sans le dire. Les habitants commentent la reconstruction (*« Le pont tient bon ! Tu as vu le moulin ? »*), ce qui rejoue la fierté du travail accompli. Zéro pression : pas de compteur, pas d'objectif, on en sort librement.

### Ton d'écriture (règle pour tout texte du jeu)

Phrases courtes (≤ 12 mots), présent, vocabulaire concret, une idée par phrase — les textes de l'histoire **sont aussi des textes de lecture** au niveau de l'enfant : l'histoire fait réviser sans le dire. Jamais d'ironie, jamais de négation piégeuse dans les consignes.

### Style visuel

Manga doux façon **carnet d'aquarelle d'explorateur** : traits fins encre sépia, aplats aquarelle chauds (sable, terracotta, céruléen), grands yeux expressifs, décors à point focal unique. **Aucune ressource externe** : toutes les illustrations sont du SVG écrit dans le repo (hors-ligne, zéro dépendance). Une fiche de style (`memory-bank/art-direction.md`) fixe palette, épaisseurs de trait et règles de composition.

---

## Gamification

**Trois leviers : XP, objets, achats — plus les techniques.**

| Levier | Gagné par | Sert à |
|---|---|---|
| ⭐ **XP → grades d'inventeur** | fin de mission, bonus de série, chantier terminé | fait **évoluer le personnage** (Apprenti → Bricoleur → Compagnon → Ingénieur → Grand Inventeur), débloque équipements et plans |
| 🎁 **Objets & plans** | offerts par les villages aidés (récompense narrative, jamais aléatoire) | équipement du personnage + **reconstructions de Bellerive** |
| ⚙️ **Pièces** | chaque bonne réponse (récompense immédiate et **certaine**) | achats au bazar : équipement, matériaux, décorations |
| ✨ **Techniques** | enseignées par les mentors | power-ups en mission (usages limités, rechargés chaque mission) |

**Personnage équipable** : `Personnage.tsx`, SVG en couches (corps / vêtement / sac / couvre-chef / outil / lunettes / véhicule). Les variantes viennent des cadeaux des villages et du bazar ; le grade se lit sur le badge du personnage. Le personnage équipé apparaît sur la carte du monde, à Bellerive et en haut de chaque mission.

**Découpage des chantiers** (aussi l'ordre d'implémentation) :

| Chantier | Domaines débloqués |
|---|---|
| 1. **Aït-Soleil — le Puits** | M1 calcul éclair · L1 sons et lettres |
| 2. **Playa Colibrí — la Centrale solaire** | M2 numération · M3 monnaie · L2 mots-outils |
| 3. **Linh-Giang — Vélos et pont** | M4 problèmes en barres · M6 fractions · L3 compréhension · L4 dictée |
| L'Atelier Volant (hub, bonus) | M5 horloge et durées |

Le jeu est **jouable et complet dès le chantier 1** — chaque chantier suivant est un incrément.

---

## Adaptations TDAH (contraintes de design, non négociables)

- **Une seule question à l'écran.** Pas de barre latérale, pas de compteur, pas de fond animé pendant une question.
- **Zéro chronomètre visible.** Le temps de réponse est enregistré silencieusement.
- Progression de mission en **points remplis** (●●●○○○○○), jamais en pourcentage.
- **Erreur sans sanction** : pas de rouge agressif, pas de son négatif ; la bonne réponse est montrée avec une aide visuelle, et l'item revient plus tard dans la session.
- **Anti-spirale d'échec** : deux erreurs consécutives sur un même skill → bascule sur un skill maîtrisé pour restaurer la confiance avant d'y revenir. Les **techniques des mentors** servent aussi à ça : un joker légitime dans l'histoire vaut mieux qu'un blocage.
- **Sortie propre à tout moment** : bouton pause permanent, aucun progrès perdu, l'écran de fin félicite aussi l'arrêt.
- **Micro-pause structurelle** entre deux missions : l'animation du chantier *est* la pause (10-15 s, rien à faire).
- Sessions visées : **2-3 missions (~10-15 min)** ; après la 3ᵉ, Pixel propose d'aller voir Bellerive ou de se balader (clôture naturelle par le mode balade).
- Animations ≤ 400 ms ; respect de `prefers-reduced-motion` + réglage « animations réduites ».
- Typo large, interlignage/interlettrage aérés (réglage renforcé disponible), cibles de clic ≥ 56 px, jouable entièrement au clavier comme à la souris.

---

## Architecture

**Stack :** Vite + React 19 + TypeScript. CSS à la main avec custom properties (pas de Tailwind : le rendu aquarelle se contrôle mieux à la main, zéro dépendance en plus). État en `useReducer` + Context, persisté dans `localStorage` (`charlie.save.v1`). Navigation par état d'écran, pas de router (8 écrans).

**Un seul moteur de mission, trois formats d'interaction** — c'est ce qui rend 10 domaines réalistes :

- `choice` — QCM 2 à 4 options, gros boutons
- `numpad` — saisie chiffrée, pavé tactile
- `tiles` — tuiles à placer : syllabes, lettres, pièces de monnaie, barres de numération, segments de schéma, fractions de bande

Chaque domaine n'est qu'un **générateur d'items** + un habillage, pas un moteur séparé. Les techniques des mentors sont des transformations génériques du moteur (retirer un distracteur, jouer l'audio, afficher un indice) — pas du code par domaine.

**Modèle de maîtrise — Leitner 5 boîtes sur des `skillId`** (pas sur les items : les items maths sont générés à la volée). Par skill : `palier`, `boite` 1-5, `serie`, `tentatives`, `reussites`, `msMedian`. Boîte basse = réapparaît vite. C'est ce qui fait fonctionner « consolider le CE1, monter vers l'aisance CE2 ».

**Sélecteur de mission** (`session.ts`) : pondération deux tiers (calcul/nombres/problèmes vs le reste, au sein des maths), priorité aux boîtes basses, 1 skill acquis injecté en révision, règle anti-spirale.

**Test de positionnement** (`placement.ts`) — « Le vol d'essai » : ~15 items en escalier adaptatif, sans chrono. Fixe le palier de départ **par domaine**.

**Mode balade** (`Balade.tsx`) : déplacement simple du personnage (flèches/clic, translation CSS sur la scène SVG de Bellerive), zones cliquables (habitants → bulle de dialogue, bâtiments reconstruits → intérieur simple). Pas de moteur physique, pas de collisions : des points d'intérêt sur un décor.

**Tableau de bord parent** — la salle des cartes, derrière une porte à calcul (ex. « 7 × 8 ? »). Affiche : notions acquises / en cours / à revoir, temps de jeu, et la **fluence en calcul comparée aux repères officiels de fin de CE2** (15 égalités additives/min, 12 multiplicatives/min, 15 résultats de procédures en 3 min). L'enfant ne voit jamais ces chiffres.

**Audio** — `speechSynthesis` en `fr-FR` pour la dictée, les consignes et le pouvoir d'Écorime (*vérifié : 9 voix fr_FR sur cette machine — Thomas, Jacques, Flo…*). Repli si voix indisponible : le mot est montré brièvement puis masqué. Sons de réussite générés en Web Audio API, aucun fichier audio.

### Méthode de travail (reprise de EnzeD/vibe-coding)

- **`memory-bank/`** à la racine, maintenu à chaque étape : `game-design-document.md` (univers, arc, ton, mentors, table mécanique↔diégèse), `art-direction.md`, `architecture.md` (rôle des fichiers, schéma du save), `implementation-plan.md` (étapes + test de validation), `progress.md`, et **`logbook.md`** — le **journal de bord** : une entrée datée par session de travail, avec le plan retenu, les décisions prises (et pourquoi), les pivots (ex. « CE1 → CE2 », « la Vallée → Bellerive », « ajout des mentors »). Ce plan-ci devient la première entrée. Règle : toute évolution du plan passe par une entrée au logbook, jamais de décision silencieuse.
- **`CLAUDE.md`** avec la règle « Always » : *lire `memory-bank/architecture.md` avant d'écrire du code ; petits fichiers, pas de monolithe ; cocher `progress.md` et compléter `logbook.md` après chaque étape.*
- **`git init` + un commit par étape validée**, et **repo GitHub public `gpolaert/charlie`** créé dès l'étape 1 (`gh repo create gpolaert/charlie --public`), push après chaque étape validée.
- **Étapes petites et testables** (critère vérifiable dans Chrome ou par Vitest) :
  1. Squelette Vite+React+TS + repo GitHub → l'app démarre sur `localhost:5173`.
  2. `store.ts` + persistance → recharger conserve l'état (test Vitest du reducer).
  3. Moteur de mission + `choice` + générateur M1 → une mission calcul éclair jouable.
  4. `mastery.ts` + `session.ts` → tests Vitest (boîtes, anti-spirale, pondération 2/3).
  5. Vol d'essai → premier lancement calibré par domaine.
  6. XP/objets/pièces + Personnage SVG + bazar → un achat change le personnage.
  7. Chantier 1 complet (Aït-Soleil : récit, L1, mentor Hana Atori + technique, animation du chantier, cadeau).
  8. **Bellerive** : scène SVG, reconstruction (placement des chantiers), **mode balade**.
  9. Chantier 2 (M2, M3, L2, formats `numpad`/`tiles`, mentor Écorime).
  10. Chantier 3 (M4 barres, M6 fractions, L3, L4 dictée, 3ᵉ mentor) + fin de chapitre.
  11. Horloge (M5) + salle des cartes parent + polissage accessibilité.

### Arborescence

```
charlie/
  index.html  package.json  vite.config.ts  tsconfig.json
  CLAUDE.md
  memory-bank/
    game-design-document.md  art-direction.md  architecture.md
    implementation-plan.md   progress.md  logbook.md
  src/
    main.tsx  App.tsx
    game/
      store.ts        # état + reducer + persistance localStorage
      mastery.ts      # Leitner, mise à jour après réponse
      session.ts      # construction d'une mission (pondération 2/3)
      placement.ts    # vol d'essai adaptatif
      economy.ts      # XP/grades, pièces, objets, techniques, déblocages
      types.ts
    content/
      skills.ts       # catalogue des skills, tagués palier + domaine
      math/           calculEclair.ts numeration.ts monnaie.ts
                      problemes.ts horloge.ts fractions.ts
      lecture/        sons.ts motsOutils.ts comprehension.ts dictee.ts
      story/          chapitre1.ts   # villages, chantiers, cadeaux, cartes culture
      mentors.ts      # roster des mentors + techniques (données, facilement éditable)
      bellerive.ts    # chantiers de reconstruction + habitants + dialogues balade
    ui/
      screens/        CarteMonde.tsx Chantier.tsx Mission.tsx
                      Bellerive.tsx Balade.tsx Bazar.tsx Carnet.tsx Parents.tsx
      items/          ChoiceItem.tsx NumpadItem.tsx TilesItem.tsx
                      BarModel.tsx Horloge.tsx PorteMonnaie.tsx BandeFraction.tsx
      Personnage.tsx  # SVG en couches + équipement
      illustrations/  # SVG villages, chantiers, Bellerive, mentors, décors
    styles/
```

---

## Contenu par domaine (calibré CE1-consolidation → CE2)

Chaque générateur prend un `palier` et respecte son champ numérique (CE1 ≤ 1 000 · CE2 ≤ 10 000 ; structures complexes sur champ réduit, comme au programme).

**M1 calcul éclair** — tables d'addition dans les deux sens (`4 + … = 12`) ; **tables de multiplication** dans les deux sens (`7 × … = 42`, cœur du CE2) ; doubles/moitiés étendus (doubles jusqu'à 20, de 25/50/75, moitiés de dizaines et centaines) ; multiples de 25, décompositions de 60 ; procédures : ±9/19/29/39, ×10/×100, ×4 = ×2×2, ×8, distributivité (`23 × 7 = 20×7 + 3×7`).

**M2 numération** — jusqu'à 10 000 : décompositions (`4 635 = 4×1000 + …`), unités de numération, comparer `< = >`, ranger, **intercaler sur demi-droite graduée** (de 1 en 1, 10 en 10, 100 en 100, 1000 en 1000), parité, encadrer.

**M3 monnaie** — constituer une somme avec le moins de pièces possible, rendre la monnaie, **écriture à virgule** (`2 € et 5 centimes = 2,05 €` vs `2,50 €` — piège explicitement signalé au programme), petites additions/soustractions de prix à virgule.

**M4 problèmes** — interaction **schéma en barre** (l'outil central du programme) : parties-tout, comparaison (« de plus »/« de moins » piégeux), une puis deux étapes, multiplicatifs (valeur du tout, partage), « fois plus »/« fois moins » au palier CE2.

**M5 horloge et durées** — SVG à aiguilles : heures/demies/quarts, heures et minutes, lien cadran ↔ affichage digital, durées simples.

**M6 fractions** (entrée CE2) — sur des **bandes-unités** en tuiles : lire/représenter ½ ⅓ ¼ … , comparer (même dénominateur, même numérateur), égalités simples (`5/10 = 1/2`), compléter à 1.

**L1 sons et lettres** — consolidation des graphèmes complexes (`ou on an in oi ch gn eu ill…`), **valeur des lettres selon le contexte** (`s/c/g`), `an/am, en/em, on/om, in/im`, lettres muettes.

**L2 mots-outils** — reconnaissance flash des mots fréquents et irréguliers (listes de fréquence eduscol / Dubois-Buyse), par paliers.

**L3 compréhension** — phrase puis court paragraphe → question, **inférences simples** (attendu explicite du CE2). Textes ancrés dans les cartes du carnet de cultures, l'histoire des villages et les dialogues de Bellerive.

**L4 dictée** — mot prononcé (`speechSynthesis`), composé en tuiles-syllabes ou tuiles-lettres ; au palier CE2, mots fréquents entiers et petits groupes nominaux avec accord (`les vélos verts`).

---

## Vérification

**Tests automatisés (Vitest)** — le vrai risque de bug est là, pas dans l'UI :
- pour chaque domaine × palier : générer 200 items, vérifier champ numérique, résolubilité, unicité de la réponse, distracteurs distincts et plausibles ;
- `mastery.ts` : montée/descente de boîtes, déclenchement anti-spirale après 2 erreurs ;
- `session.ts` : pondération deux tiers respectée sur 100 missions simulées ;
- `economy.ts` : XP/grades monotones, un objet offert n'est jamais offert deux fois, usages des techniques bornés et rechargés par mission.

**Vérification manuelle dans Chrome** (outils Chrome MCP sur `localhost:5173`) :
1. Premier lancement → vol d'essai, palier attribué par domaine.
2. Mission complète du chantier 1 → pièces + XP crédités, chantier qui avance, cadeau reçu.
3. Scène du mentor → technique apprise, puis **utilisable en mission** (le 50/50 retire bien un distracteur ; le pouvoir des sons prononce bien l'énoncé).
4. Bellerive → lancer une reconstruction, elle persiste et s'anime ; **mode balade** : déplacement, dialogue d'un habitant.
5. Achat au bazar → le personnage change visuellement partout.
6. Recharger la page → progression, équipement, Bellerive et état Leitner intacts.
7. Salle des cartes → porte à calcul bloque, stats parent affichées.
8. Dictée → `speechSynthesis` prononce en français.
9. `prefers-reduced-motion` respecté ; parcours complet au clavier.

---

## Périmètre

**Livré (chapitre 1) :** 3 villages/chantiers, 10 domaines, vol d'essai, personnage équipable avec grades, économie XP/objets/pièces, 3 mentors et leurs techniques, Bellerive (reconstruction + mode balade), carnet de cultures, salle des cartes parent, sauvegarde locale, repo public `gpolaert/charlie` avec memory-bank et logbook.

**Volontairement hors périmètre :** la **fluence de lecture à voix haute** (90→120 mots/min) — demande reconnaissance vocale ou chronométrage par l'adulte, contraire au cadre « autonome, sans chrono » ; à reprendre en chapitre 2 comme atelier accompagné. Le mode « défi vitesse » optionnel et les chapitres 2+ (nouvelles régions, nouveaux mentors, nouvelles reconstructions) sont prévus par la structure (`content/story/`, `bellerive.ts`, `mentors.ts`) mais non construits.
