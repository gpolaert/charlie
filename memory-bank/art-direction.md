# Direction artistique — « carnet d'aquarelle d'explorateur »

Manga doux, façon carnet de voyage aquarellé. Tout est SVG écrit à la main dans le repo.

## Palette (custom properties dans `src/styles/theme.css`)

| Token | Valeur | Usage |
|---|---|---|
| `--encre` | `#4a3728` | traits, texte principal (encre sépia) |
| `--papier` | `#faf3e3` | fond général (papier crème) |
| `--papier-2` | `#f3e8cf` | cartes, panneaux |
| `--sable` | `#e8c98a` | terrains, accents chauds |
| `--terracotta` | `#c96f4a` | toits, boutons d'action |
| `--ceruleen` | `#5a9bb5` | eau, ciel, liens |
| `--feuille` | `#7ba05b` | végétation, réussite (jamais de rouge vif) |
| `--soleil` | `#e9b44c` | récompenses, étoiles, XP |
| `--brume` | `#a99d8a` | éléments désactivés, ombres douces |
| `--corail-doux` | `#d98e73` | erreurs (chaleureux, PAS de rouge agressif) |

## Règles de trait et de forme

- Contours : `stroke: var(--encre)`, `stroke-width` 2.5–3 pour les personnages, 1.5–2 pour les décors, `stroke-linecap/linejoin: round` partout.
- Coins arrondis systématiques (`rx` ≥ 6 sur les rects).
- Aplats simples, 2 tons max par surface (base + ombre légère), pas de dégradés complexes.
- Grands yeux expressifs : cercle blanc + iris encre + reflet blanc décalé.
- Un seul point focal par écran. Fond = 3 plans max (ciel / relief / sol).

## Typographie

- Titres et UI : `"Baloo 2", "Comic Sans MS", cursive` — ronde et lisible (fallback système, pas de webfont externe).
- Texte de lecture : ≥ 22 px, `line-height` ≥ 1.7, `letter-spacing 0.03em` (0.08em si réglage renforcé).

## Animation

- Douce et courte : ≤ 400 ms pour l'UI ; boucles lentes (2-6 s) uniquement pour les décors (eau, roue, fumée) et coupées pendant les questions.
- `prefers-reduced-motion` + réglage in-game : tout passe en statique.
