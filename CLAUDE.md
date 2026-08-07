# Charlie, inventeur du monde

Jeu de révision maths + lecture (CE1-consolidation → CE2) pour un enfant de 8 ans avec TDAH. React + Vite + TS, `npm run dev`, jouable dans Chrome, sauvegarde localStorage.

## Règles ALWAYS

- **Toujours lire `memory-bank/architecture.md` avant d'écrire du code.** Il décrit le rôle de chaque fichier et le schéma du save.
- Petits fichiers, une responsabilité chacun. Pas de monolithe.
- Après chaque étape validée : cocher `memory-bank/progress.md`, commit + push. Les décisions se documentent dans les messages de commit.
- Tout texte visible par l'enfant : français, phrases ≤ 12 mots, présent, jamais d'ironie ni de négation piégeuse. Voir le ton dans `memory-bank/game-design-document.md`.
- Adaptations TDAH non négociables (une question par écran, zéro chrono visible, erreurs sans sanction, anti-spirale) : listées dans `memory-bank/game-design-document.md`.
- Illustrations : uniquement du SVG écrit dans le repo, jamais d'asset externe. Style dans `memory-bank/art-direction.md`.
- Générateurs d'items : respecter le champ numérique du palier (CE1 ≤ 1 000, CE2 ≤ 10 000) — testé par Vitest.
