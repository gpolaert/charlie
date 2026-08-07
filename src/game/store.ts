// État global + persistance. Le reducer est pur (testé par Vitest) ;
// la persistance localStorage est branchée par l'UI.
import { appliquerReponse } from './mastery'
import { acheter, apprendreTechnique, offrirObjet, PIECES_PAR_BONNE_REPONSE, xpMission } from './economy'
import type { DomaineId, Palier, Reponse, Save, Slot, TechniqueId, VillageId } from './types'

export const CLE_SAVE = 'charlie.save.v1'

export function saveInitial(): Save {
  const paliers = {} as Record<DomaineId, Palier>
  for (const d of ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'l1', 'l2', 'l3', 'l4'] as DomaineId[]) {
    paliers[d] = 'ce1'
  }
  return {
    version: 1,
    volEssaiFait: false,
    paliers,
    skills: {},
    xp: 0,
    pieces: 0,
    objets: [],
    equipement: {
      vetement: null,
      couvrechef: null,
      sac: null,
      outil: null,
      lunettes: null,
      vehicule: null,
    },
    techniques: {},
    bellerive: {},
    chantiers: { aitSoleil: 0, playaColibri: 0, linhGiang: 0 },
    cartesCulture: [],
    missionsJouees: 0,
    missionsSession: 0,
    reglages: { animationsReduites: false, interlettrageRenforce: false },
  }
}

export type Action =
  | { type: 'reponse'; reponse: Reponse }
  | { type: 'finMission'; bonnes: number; total: number; village: VillageId | null }
  | { type: 'finVolEssai'; paliers: Record<DomaineId, Palier> }
  | { type: 'cadeau'; objetId: string }
  | { type: 'carteCulture'; carteId: string }
  | { type: 'technique'; technique: TechniqueId }
  | { type: 'acheter'; articleId: string }
  | { type: 'equiper'; slot: Slot; objetId: string | null }
  | { type: 'construire'; emplacementId: string; constructionId: string }
  | { type: 'nouvelleSession' }
  | { type: 'reglages'; reglages: Partial<Save['reglages']> }
  | { type: 'reset' }

export function reducer(save: Save, action: Action): Save {
  switch (action.type) {
    case 'reponse': {
      const { skillId, correcte, ms } = action.reponse
      const etat = save.skills[skillId] ?? {
        boite: 1 as const,
        serie: 0,
        tentatives: 0,
        reussites: 0,
        msMedian: 0,
        vus: 0,
      }
      return {
        ...save,
        skills: { ...save.skills, [skillId]: appliquerReponse(etat, correcte, ms) },
        pieces: save.pieces + (correcte ? PIECES_PAR_BONNE_REPONSE : 0),
      }
    }
    case 'finMission': {
      const chantiers = { ...save.chantiers }
      if (action.village) chantiers[action.village] = save.chantiers[action.village] + 1
      return {
        ...save,
        xp: save.xp + xpMission(action.bonnes, action.total),
        chantiers,
        missionsJouees: save.missionsJouees + 1,
        missionsSession: save.missionsSession + 1,
      }
    }
    case 'finVolEssai':
      return { ...save, volEssaiFait: true, paliers: action.paliers }
    case 'cadeau':
      return offrirObjet(save, action.objetId)
    case 'carteCulture':
      return save.cartesCulture.includes(action.carteId)
        ? save
        : { ...save, cartesCulture: [...save.cartesCulture, action.carteId] }
    case 'technique':
      return apprendreTechnique(save, action.technique)
    case 'acheter':
      return acheter(save, action.articleId) ?? save
    case 'equiper': {
      if (action.objetId !== null && !save.objets.includes(action.objetId)) return save
      return { ...save, equipement: { ...save.equipement, [action.slot]: action.objetId } }
    }
    case 'construire': {
      if (save.bellerive[action.emplacementId]) return save // déjà construit
      if (!save.objets.includes(action.constructionId)) return save // plan/matériau non possédé
      return { ...save, bellerive: { ...save.bellerive, [action.emplacementId]: action.constructionId } }
    }
    case 'nouvelleSession':
      return { ...save, missionsSession: 0 }
    case 'reglages':
      return { ...save, reglages: { ...save.reglages, ...action.reglages } }
    case 'reset':
      return saveInitial()
  }
}

export function charger(): Save {
  try {
    const brut = globalThis.localStorage?.getItem(CLE_SAVE)
    if (!brut) return saveInitial()
    const lu = JSON.parse(brut) as Save
    if (lu.version !== 1) return saveInitial()
    // Fusion défensive : un save ancien reste chargeable après ajout de champs.
    return { ...saveInitial(), ...lu, reglages: { ...saveInitial().reglages, ...lu.reglages } }
  } catch {
    return saveInitial()
  }
}

export function persister(save: Save): void {
  try {
    globalThis.localStorage?.setItem(CLE_SAVE, JSON.stringify(save))
  } catch {
    // stockage indisponible (tests, navigation privée) : on joue sans sauvegarde
  }
}
