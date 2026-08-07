// Leitner 5 boîtes par skill. Logique pure, testée par Vitest.
import type { SkillState } from './types'

export function skillInitial(): SkillState {
  return { boite: 1, serie: 0, tentatives: 0, reussites: 0, msMedian: 0, vus: 0 }
}

/**
 * Applique une réponse à l'état d'un skill.
 * Bonne réponse : monte d'une boîte (max 5). Erreur : retour boîte 1.
 * `msMedian` : médiane approchée par pas (évite de stocker l'historique).
 */
export function appliquerReponse(s: SkillState, correcte: boolean, ms: number): SkillState {
  const boite = correcte ? (Math.min(5, s.boite + 1) as SkillState['boite']) : 1
  const serie = correcte ? Math.max(1, s.serie + 1) : Math.min(-1, s.serie - 1)
  const msMedian =
    s.vus === 0 ? ms : s.msMedian + Math.sign(ms - s.msMedian) * Math.max(50, s.msMedian * 0.1)
  return {
    boite,
    serie,
    tentatives: s.tentatives + 1,
    reussites: s.reussites + (correcte ? 1 : 0),
    msMedian: Math.round(msMedian),
    vus: s.vus + 1,
  }
}

/** Anti-spirale : 2 erreurs consécutives → il faut basculer sur un skill maîtrisé. */
export function enSpirale(s: SkillState): boolean {
  return s.serie <= -2
}

/** Un skill est considéré acquis à partir de la boîte 4. */
export function estAcquis(s: SkillState): boolean {
  return s.boite >= 4
}
