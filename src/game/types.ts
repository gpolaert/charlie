// Types partagés — aucune dépendance.

export type Palier = 'ce1' | 'ce2a' | 'ce2'

export type DomaineId =
  | 'm1' // calcul éclair
  | 'm2' // numération
  | 'm3' // monnaie
  | 'm4' // problèmes
  | 'm5' // horloge
  | 'm6' // fractions
  | 'l1' // sons et lettres
  | 'l2' // mots-outils
  | 'l3' // compréhension
  | 'l4' // dictée

export const DOMAINES_MATHS: DomaineId[] = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6']
export const DOMAINES_LECTURE: DomaineId[] = ['l1', 'l2', 'l3', 'l4']
/** Cœur « nombres, calcul, résolution de problèmes » (pondération 2/3 du programme). */
export const DOMAINES_COEUR: DomaineId[] = ['m1', 'm2', 'm4', 'm6']

export type FormatItem = 'choice' | 'numpad' | 'tiles'

/** Un exercice affichable. Généré à la volée (maths) ou tiré d'un corpus (lecture). */
export interface Item {
  skillId: string
  format: FormatItem
  /** Consigne courte lue par Pixel (≤ 12 mots). */
  consigne: string
  /** Énoncé principal (calcul, phrase, mot…). Peut être vide si le widget porte tout. */
  enonce: string
  /** Pour `choice` : les options ; la bonne est `reponse`. */
  options?: string[]
  /** Réponse attendue (string canonique, ex. "42" ou "oi" ou "2,05"). */
  reponse: string
  /** Pour `tiles` : tuiles proposées (contient les tuiles de la réponse + distracteurs). */
  tuiles?: string[]
  /** Pour `tiles` : la réponse est la concaténation ordonnée de ces tuiles. */
  reponseTuiles?: string[]
  /** Widget optionnel qui habille l'item. */
  widget?:
    | { type: 'barres'; total: string; parties: (string | null)[] }
    | { type: 'horloge'; heures: number; minutes: number }
    | { type: 'monnaie'; centimes: number }
    | { type: 'bande'; parts: number; pleines: number }
    | { type: 'droite'; debut: number; pas: number; manquantIndex: number }
  /** Texte à faire prononcer (dictée, pouvoir des sons). */
  audio?: string
  /** Aide montrée après une erreur (explication courte de Pixel). */
  aide: string
}

export interface SkillState {
  boite: 1 | 2 | 3 | 4 | 5
  serie: number // bonnes réponses consécutives ; négatif = erreurs consécutives
  tentatives: number
  reussites: number
  /** Temps de réponse médian approché (ms), mesuré en silence. */
  msMedian: number
  vus: number
}

export type Slot = 'vetement' | 'couvrechef' | 'sac' | 'outil' | 'lunettes' | 'vehicule'

export type TechniqueId = 'coupDePiedDeFer' | 'pouvoirDesSons' | 'regardDaigle'

export type VillageId = 'aitSoleil' | 'playaColibri' | 'linhGiang'

export type Ecran =
  | { nom: 'accueil' }
  | { nom: 'volEssai' }
  | { nom: 'carteMonde' }
  | { nom: 'chantier'; village: VillageId }
  | { nom: 'mission'; village: VillageId | null }
  | { nom: 'bellerive' }
  | { nom: 'balade' }
  | { nom: 'bazar' }
  | { nom: 'carnet' }
  | { nom: 'parents' }

export interface Save {
  version: 1
  volEssaiFait: boolean
  paliers: Record<DomaineId, Palier>
  skills: Record<string, SkillState>
  xp: number
  pieces: number
  objets: string[]
  equipement: Record<Slot, string | null>
  techniques: Partial<Record<TechniqueId, true>>
  bellerive: Record<string, string | null> // emplacementId -> constructionId
  chantiers: Record<VillageId, number> // étapes de chantier terminées (une étape = une mission)
  cartesCulture: string[]
  missionsJouees: number
  missionsSession: number
  reglages: { animationsReduites: boolean; interlettrageRenforce: boolean }
}

/** Résultat d'une réponse, calculé par le moteur de mission. */
export interface Reponse {
  skillId: string
  correcte: boolean
  ms: number
}

export const GRADES = [
  { nom: 'Apprenti', xp: 0 },
  { nom: 'Bricoleur', xp: 120 },
  { nom: 'Compagnon', xp: 320 },
  { nom: 'Ingénieur', xp: 640 },
  { nom: 'Grand Inventeur', xp: 1100 },
] as const

export type Rng = () => number
