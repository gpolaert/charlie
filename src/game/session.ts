// Construction d'une mission : choix du domaine (pondération 2/3 du programme),
// choix des skills (priorité boîtes basses, 1 révision, anti-spirale).
import { skillsDisponibles } from '../content/skills'
import { enSpirale, estAcquis, skillInitial } from './mastery'
import { DOMAINES_COEUR, DOMAINES_LECTURE, DOMAINES_MATHS } from './types'
import type { DomaineId, Rng, Save } from './types'

export const TAILLE_MISSION = 8

/**
 * Choisit le domaine de la prochaine mission.
 * Alternance maths/lecture (une mission sur deux), et au sein des maths,
 * 2/3 pour le cœur (calcul, numération, problèmes, fractions), 1/3 pour le reste.
 */
export function choisirDomaine(save: Save, rng: Rng, autorises: DomaineId[]): DomaineId {
  const maths = autorises.filter((d) => DOMAINES_MATHS.includes(d))
  const lecture = autorises.filter((d) => DOMAINES_LECTURE.includes(d))
  const veutMaths =
    lecture.length === 0 || (maths.length > 0 && save.missionsJouees % 2 === 0)
  const pool = veutMaths ? maths : lecture
  if (veutMaths) {
    const coeur = pool.filter((d) => DOMAINES_COEUR.includes(d))
    const reste = pool.filter((d) => !DOMAINES_COEUR.includes(d))
    if (coeur.length > 0 && (reste.length === 0 || rng() < 2 / 3)) {
      return coeur[Math.floor(rng() * coeur.length)]
    }
    if (reste.length > 0) return reste[Math.floor(rng() * reste.length)]
  }
  return pool[Math.floor(rng() * pool.length)]
}

/**
 * Suite de skills d'une mission (TAILLE_MISSION entrées, répétitions possibles).
 * - priorité aux boîtes basses du domaine (les notions fragiles reviennent vite) ;
 * - 1 place pour un skill déjà acquis (révision, confiance) ;
 * - anti-spirale : un skill en spirale (2 erreurs de suite) est écarté au profit
 *   d'un skill acquis, jusqu'à la prochaine mission.
 */
export function skillsDeMission(save: Save, domaine: DomaineId, rng: Rng): string[] {
  const dispo = skillsDisponibles(domaine, save.paliers[domaine])
  const etats = new Map(dispo.map((s) => [s.id, save.skills[s.id] ?? skillInitial()]))

  const sains = dispo.filter((s) => !enSpirale(etats.get(s.id)!))
  const refuges = dispo.filter((s) => estAcquis(etats.get(s.id)!))
  const candidats = sains.length > 0 ? sains : dispo

  // Tri par boîte croissante (fragile d'abord), bruit léger pour varier.
  const tries = [...candidats].sort(
    (a, b) => etats.get(a.id)!.boite - etats.get(b.id)!.boite + (rng() - 0.5),
  )

  const suite: string[] = []
  for (let i = 0; i < TAILLE_MISSION; i++) {
    if (i === 4 && refuges.length > 0) {
      // La 5e question est une révision d'un skill acquis (respiration).
      suite.push(refuges[Math.floor(rng() * refuges.length)].id)
      continue
    }
    suite.push(tries[i % tries.length].id)
  }
  return suite
}

/** Après une erreur en mission : l'item revient plus tard dans la même mission. */
export function reinserer(suite: string[], index: number): string[] {
  const skillId = suite[index]
  const copie = [...suite]
  const cible = Math.min(copie.length, index + 3)
  copie.splice(cible, 0, skillId)
  return copie
}
