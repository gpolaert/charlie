// « Le vol d'essai » — test de positionnement adaptatif, sans chrono.
// Escalier simple par famille de domaines : on commence au palier ce1 ;
// 2 réussites au palier → on monte, 2 erreurs → on fixe le palier courant.
import type { DomaineId, Palier } from './types'

const ORDRE: Palier[] = ['ce1', 'ce2a', 'ce2']

/** Familles testées (tester les 10 domaines serait trop long pour un enfant). */
export const FAMILLES: { id: string; domaines: DomaineId[] }[] = [
  { id: 'calcul', domaines: ['m1', 'm2', 'm4', 'm6'] },
  { id: 'mesures', domaines: ['m3', 'm5'] },
  { id: 'decodage', domaines: ['l1', 'l2', 'l4'] },
  { id: 'comprehension', domaines: ['l3'] },
]

export interface EtatFamille {
  palier: Palier
  reussitesAuPalier: number
  erreursAuPalier: number
  fini: boolean
}

export function etatInitial(): Record<string, EtatFamille> {
  const r: Record<string, EtatFamille> = {}
  for (const f of FAMILLES) {
    r[f.id] = { palier: 'ce1', reussitesAuPalier: 0, erreursAuPalier: 0, fini: false }
  }
  return r
}

export function appliquerResultat(e: EtatFamille, correcte: boolean): EtatFamille {
  if (e.fini) return e
  const reussites = e.reussitesAuPalier + (correcte ? 1 : 0)
  const erreurs = e.erreursAuPalier + (correcte ? 0 : 1)
  if (erreurs >= 2) return { ...e, erreursAuPalier: erreurs, fini: true }
  if (reussites >= 2) {
    const idx = ORDRE.indexOf(e.palier)
    if (idx === ORDRE.length - 1) return { ...e, reussitesAuPalier: reussites, fini: true }
    return { palier: ORDRE[idx + 1], reussitesAuPalier: 0, erreursAuPalier: 0, fini: false }
  }
  return { ...e, reussitesAuPalier: reussites, erreursAuPalier: erreurs }
}

export function tousFinis(etats: Record<string, EtatFamille>): boolean {
  return FAMILLES.every((f) => etats[f.id].fini)
}

/** Paliers par domaine à partir de l'état final des familles. */
export function paliersFinaux(etats: Record<string, EtatFamille>): Record<DomaineId, Palier> {
  const r = {} as Record<DomaineId, Palier>
  for (const f of FAMILLES) {
    for (const d of f.domaines) r[d] = etats[f.id].palier
  }
  return r
}
