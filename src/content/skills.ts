// Catalogue des skills. Un skill = une notion précise, taguée domaine + palier.
// Les libellés sont pour l'écran Parents (l'enfant ne voit jamais cette liste).
import type { DomaineId, Palier } from '../game/types'

export interface Skill {
  id: string
  domaine: DomaineId
  palier: Palier
  libelle: string
}

export const SKILLS: Skill[] = [
  // M1 — calcul éclair
  { id: 'm1.tablesAdd', domaine: 'm1', palier: 'ce1', libelle: 'Tables d’addition (4 + … = 12)' },
  { id: 'm1.doubles', domaine: 'm1', palier: 'ce1', libelle: 'Doubles et moitiés' },
  { id: 'm1.complements10', domaine: 'm1', palier: 'ce1', libelle: 'Compléments à 10 et à la dizaine' },
  { id: 'm1.plusMoins9', domaine: 'm1', palier: 'ce2a', libelle: 'Ajouter/retirer 9, 19, 29' },
  { id: 'm1.tablesMul25', domaine: 'm1', palier: 'ce2a', libelle: 'Tables de ×2, ×5, ×10' },
  { id: 'm1.tablesMul', domaine: 'm1', palier: 'ce2', libelle: 'Tables de multiplication (7 × … = 42)' },
  { id: 'm1.foisDizaines', domaine: 'm1', palier: 'ce2', libelle: 'Multiplier par 10, 100, ×4, ×8' },
  { id: 'm1.doublesGrands', domaine: 'm1', palier: 'ce2', libelle: 'Doubles/moitiés de 25, 50, dizaines, centaines' },

  // M2 — numération
  { id: 'm2.dizainesUnites', domaine: 'm2', palier: 'ce1', libelle: 'Dizaines et unités (47 = 40 + 7)' },
  { id: 'm2.comparer100', domaine: 'm2', palier: 'ce1', libelle: 'Comparer et ranger jusqu’à 1 000' },
  { id: 'm2.suites', domaine: 'm2', palier: 'ce1', libelle: 'Suites de 2 en 2, 5 en 5, 10 en 10' },
  { id: 'm2.decomposer1000', domaine: 'm2', palier: 'ce2a', libelle: 'Décomposer les nombres à 3 chiffres' },
  { id: 'm2.droite', domaine: 'm2', palier: 'ce2a', libelle: 'Placer sur la droite graduée' },
  { id: 'm2.decomposer10000', domaine: 'm2', palier: 'ce2', libelle: 'Décomposer jusqu’à 10 000 (4×1000 + …)' },
  { id: 'm2.comparer10000', domaine: 'm2', palier: 'ce2', libelle: 'Comparer et encadrer jusqu’à 10 000' },

  // M3 — monnaie
  { id: 'm3.sommes', domaine: 'm3', palier: 'ce1', libelle: 'Compter une somme (pièces et billets)' },
  { id: 'm3.rendre', domaine: 'm3', palier: 'ce2a', libelle: 'Rendre la monnaie' },
  { id: 'm3.virgule', domaine: 'm3', palier: 'ce2', libelle: 'Écriture à virgule (2,05 € vs 2,50 €)' },

  // M4 — problèmes
  { id: 'm4.partiesTout', domaine: 'm4', palier: 'ce1', libelle: 'Problèmes parties-tout (schéma en barre)' },
  { id: 'm4.comparaison', domaine: 'm4', palier: 'ce2a', libelle: 'Problèmes de comparaison (de plus / de moins)' },
  { id: 'm4.deuxEtapes', domaine: 'm4', palier: 'ce2', libelle: 'Problèmes en deux étapes' },
  { id: 'm4.multiplicatifs', domaine: 'm4', palier: 'ce2', libelle: 'Problèmes multiplicatifs et partages' },

  // M5 — horloge
  { id: 'm5.heures', domaine: 'm5', palier: 'ce1', libelle: 'Heures entières et demi-heures' },
  { id: 'm5.quarts', domaine: 'm5', palier: 'ce2a', libelle: 'Quarts d’heure, matin et après-midi' },
  { id: 'm5.minutes', domaine: 'm5', palier: 'ce2', libelle: 'Heures et minutes, cadran ↔ digital' },

  // M6 — fractions
  { id: 'm6.lire', domaine: 'm6', palier: 'ce2a', libelle: 'Lire une fraction sur une bande (3/4)' },
  { id: 'm6.comparer', domaine: 'm6', palier: 'ce2', libelle: 'Comparer des fractions simples' },
  { id: 'm6.egalites', domaine: 'm6', palier: 'ce2', libelle: 'Égalités de fractions (5/10 = 1/2)' },

  // L1 — sons et lettres
  { id: 'l1.sonsSimples', domaine: 'l1', palier: 'ce1', libelle: 'Sons complexes courants (ou, on, an, oi, ch)' },
  { id: 'l1.sonsDurs', domaine: 'l1', palier: 'ce2a', libelle: 'Sons difficiles (gn, eu, ill, ain…)' },
  { id: 'l1.lettresContexte', domaine: 'l1', palier: 'ce2', libelle: 'Valeur des lettres s, c, g selon le contexte' },

  // L2 — mots-outils
  { id: 'l2.frequents1', domaine: 'l2', palier: 'ce1', libelle: 'Mots-outils très fréquents' },
  { id: 'l2.frequents2', domaine: 'l2', palier: 'ce2a', libelle: 'Mots fréquents et invariables' },
  { id: 'l2.irreguliers', domaine: 'l2', palier: 'ce2', libelle: 'Mots irréguliers (femme, monsieur…)' },

  // L3 — compréhension
  { id: 'l3.phrase', domaine: 'l3', palier: 'ce1', libelle: 'Comprendre une phrase' },
  { id: 'l3.paragraphe', domaine: 'l3', palier: 'ce2a', libelle: 'Comprendre un petit texte' },
  { id: 'l3.inferences', domaine: 'l3', palier: 'ce2', libelle: 'Comprendre ce qui n’est pas écrit (inférences)' },

  // L4 — dictée
  { id: 'l4.syllabes', domaine: 'l4', palier: 'ce1', libelle: 'Écrire un mot avec des syllabes' },
  { id: 'l4.motsFrequents', domaine: 'l4', palier: 'ce2a', libelle: 'Écrire les mots fréquents' },
  { id: 'l4.accords', domaine: 'l4', palier: 'ce2', libelle: 'Petits accords (les vélos verts)' },
]

const ORDRE_PALIERS: Palier[] = ['ce1', 'ce2a', 'ce2']

/** Les skills travaillables pour un domaine à un palier donné (le palier + les précédents). */
export function skillsDisponibles(domaine: DomaineId, palier: Palier): Skill[] {
  const maxIdx = ORDRE_PALIERS.indexOf(palier)
  return SKILLS.filter(
    (s) => s.domaine === domaine && ORDRE_PALIERS.indexOf(s.palier) <= maxIdx,
  )
}

export function skillParId(id: string): Skill {
  const s = SKILLS.find((x) => x.id === id)
  if (!s) throw new Error(`skill inconnu: ${id}`)
  return s
}
