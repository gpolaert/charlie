// XP, grades, pièces, objets, techniques, catalogue du bazar. Logique pure.
import { GRADES } from './types'
import type { Save, Slot, TechniqueId } from './types'

export const PIECES_PAR_BONNE_REPONSE = 2
export const XP_FIN_DE_MISSION = 20
export const XP_BONUS_SERIE = 5 // par série de 3 bonnes réponses dans la mission
export const XP_FIN_DE_CHANTIER = 60
export const USAGES_TECHNIQUE_PAR_MISSION = 2

export function grade(xp: number): { nom: string; index: number } {
  let index = 0
  for (let i = 0; i < GRADES.length; i++) if (xp >= GRADES[i].xp) index = i
  return { nom: GRADES[index].nom, index }
}

export interface ArticleBazar {
  id: string
  nom: string
  prix: number
  slot?: Slot // équipement du personnage…
  construction?: string // …ou matériau pour un emplacement de Bellerive
  gradeMin: number
}

export const BAZAR: ArticleBazar[] = [
  { id: 'casquette', nom: 'Casquette d’aviateur', prix: 20, slot: 'couvrechef', gradeMin: 0 },
  { id: 'gilet', nom: 'Gilet d’inventeur', prix: 30, slot: 'vetement', gradeMin: 0 },
  { id: 'sacoche', nom: 'Sacoche à outils', prix: 25, slot: 'sac', gradeMin: 0 },
  { id: 'cleAnglaise', nom: 'Clé anglaise dorée', prix: 40, slot: 'outil', gradeMin: 1 },
  { id: 'lunettesCuivre', nom: 'Lunettes de cuivre', prix: 45, slot: 'lunettes', gradeMin: 1 },
  { id: 'capeVoyage', nom: 'Cape de voyage', prix: 60, slot: 'vetement', gradeMin: 2 },
  { id: 'chapeauExplo', nom: 'Chapeau d’exploratrice', prix: 55, slot: 'couvrechef', gradeMin: 2 },
  { id: 'potager', nom: 'Graines de potager', prix: 35, construction: 'potager', gradeMin: 0 },
  { id: 'lanternes', nom: 'Lanternes du soir', prix: 30, construction: 'lanternes', gradeMin: 0 },
  { id: 'cabane', nom: 'Bois pour la cabane', prix: 70, construction: 'cabane', gradeMin: 1 },
  { id: 'moulin', nom: 'Pales pour le moulin', prix: 80, construction: 'moulin', gradeMin: 2 },
]

/** Cadeaux narratifs : attribués une seule fois, jamais aléatoires. */
export function offrirObjet(save: Save, objetId: string): Save {
  if (save.objets.includes(objetId)) return save
  return { ...save, objets: [...save.objets, objetId] }
}

export function acheter(save: Save, articleId: string): Save | null {
  const a = BAZAR.find((x) => x.id === articleId)
  if (!a) return null
  if (save.objets.includes(a.id)) return null
  if (save.pieces < a.prix) return null
  if (grade(save.xp).index < a.gradeMin) return null
  return { ...save, pieces: save.pieces - a.prix, objets: [...save.objets, a.id] }
}

export function apprendreTechnique(save: Save, t: TechniqueId): Save {
  if (save.techniques[t]) return save
  return { ...save, techniques: { ...save.techniques, [t]: true } }
}

/** XP gagné pour une mission : base + bonus par séries de 3. */
export function xpMission(bonnesReponses: number, total: number): number {
  const bonusSeries = Math.floor(bonnesReponses / 3) * XP_BONUS_SERIE
  const bonusParfait = bonnesReponses === total ? 10 : 0
  return XP_FIN_DE_MISSION + bonusSeries + bonusParfait
}
