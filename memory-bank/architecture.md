# Architecture

À LIRE avant d'écrire du code. Tenir à jour à chaque étape.

## Vue d'ensemble

Vite + React 19 + TypeScript, pas de router (navigation par `state.ecran`), état global `useReducer` + Context, persisté en continu dans `localStorage` clé **`charlie.save.v1`**. CSS custom properties, aucune dépendance hors react/vite/vitest. Tests Vitest sur la logique (`src/**/*.test.ts`), jamais sur l'UI.

## Fichiers

### `src/game/` — logique pure (aucun import React)

| Fichier | Rôle |
|---|---|
| `types.ts` | Tous les types partagés : `Palier`, `DomaineId`, `Item`, `SkillState`, `Save`, `Ecran`, actions du reducer |
| `store.ts` | `reducer(save, action)`, `saveInitial()`, `charger()/persister()` (localStorage), Context React-free helpers |
| `mastery.ts` | Leitner 5 boîtes par `skillId` : `appliquerReponse()`, montée/descente, `msMedian`, détection anti-spirale (2 erreurs consécutives) |
| `session.ts` | `construireMission(save, domaine)` : tire 8 items (priorité boîtes basses + 1 révision), et `choisirDomaine(save)` : pondération 2/3 (M1/M2/M4/M6 vs M3/M5) au sein des maths, alternance maths/lecture |
| `placement.ts` | Vol d'essai : escalier adaptatif ~15 items, fixe `palier` par domaine |
| `economy.ts` | XP → grades (Apprenti→Grand Inventeur), pièces, attribution des cadeaux (jamais deux fois), techniques (usages/mission), catalogue d'achats |

### `src/content/` — données et générateurs (aucun import React)

| Fichier | Rôle |
|---|---|
| `skills.ts` | Catalogue des skills : `id`, `domaine`, `palier`, libellé enfant |
| `math/*.ts` | Un générateur par domaine : `genererItem(skillId, rng): Item`. Champ numérique du palier respecté |
| `lecture/*.ts` | Idem lecture ; corpus de mots/phrases inclus dans le fichier |
| `story/chapitre1.ts` | Villages, chantiers (étapes de construction), dialogues Pixel, cadeaux, cartes culture |
| `mentors.ts` | Roster mentors : nom, technique, répliques, id d'illustration. **Facilement renommable** (IP) |
| `bellerive.ts` | Emplacements de reconstruction, habitants + dialogues du mode balade |

Le RNG est injecté (`rng: () => number`) pour des tests déterministes.

### `src/ui/` — React

| Fichier | Rôle |
|---|---|
| `screens/CarteMonde.tsx` | Hub : carte du monde, villages, accès Bellerive/Atelier/Carnet/Parents |
| `screens/Chantier.tsx` | Vue village : progression du chantier, lancement de mission, scènes mentor/cadeau |
| `screens/Mission.tsx` | LE moteur de mission : une question à l'écran, points ●●●○, techniques, feedback doux |
| `screens/Bellerive.tsx` | Reconstruction : emplacements, lancement de constructions |
| `screens/Balade.tsx` | Mode balade : déplacement du personnage, dialogues habitants |
| `screens/Bazar.tsx` | Boutique : équipement + matériaux contre pièces |
| `screens/Carnet.tsx` | Cartes culture collectionnées |
| `screens/Parents.tsx` | Salle des cartes : porte à calcul puis stats (jamais montrées à l'enfant) |
| `items/ChoiceItem.tsx` etc. | Un composant par format d'interaction (`choice`, `numpad`, `tiles`) + widgets (BarModel, Horloge, PorteMonnaie, BandeFraction) |
| `Personnage.tsx` | SVG en couches : corps/vêtement/sac/couvre-chef/outil/lunettes/véhicule, piloté par `save.equipement` |
| `illustrations/` | SVG purs (fonctions React sans état) : villages, Bellerive, mentors, Pixel, décors |

## Schéma du save (`charlie.save.v1`)

```ts
{
  version: 1,
  ecran: Ecran,                      // navigation
  vol EssaiFait: boolean,
  paliers: Record<DomaineId, Palier>,
  skills: Record<string, SkillState>, // Leitner
  xp: number, pieces: number,
  objets: string[], equipement: Record<Slot, string|null>,
  techniques: Record<TechniqueId, {apprise: boolean}>,
  bellerive: { construits: Record<EmplacementId, string|null> },
  chantiers: Record<VillageId, { etape: number }>,
  cartesCulture: string[],
  missionsJouees: number, msParSkill: ...,  // stats silencieuses pour Parents
  reglages: { animationsReduites: boolean, interlettrageRenforce: boolean }
}
```

## Invariants

- Aucun chrono visible enfant ; les temps (`msMedian`) ne sortent que sur l'écran Parents.
- Générateurs : réponse unique, distracteurs ≠ réponse, champ numérique du palier.
- Récompenses déterministes (jamais d'aléatoire dans les gains).
- `localStorage` peut être absent (tests node) : `persister()` no-op silencieux.
