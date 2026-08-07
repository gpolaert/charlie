// Registre : skillId → item. Point d'entrée unique du moteur de mission.
import type { Item, Rng } from '../game/types'
import { genererItemM1 } from './math/calculEclair'
import { genererItemM2 } from './math/numeration'
import { genererItemM3 } from './math/monnaie'
import { genererItemM4 } from './math/problemes'
import { genererItemL1 } from './lecture/sons'
import { genererItemL3 } from './lecture/comprehension'

const GENERATEURS: Record<string, (skillId: string, rng: Rng) => Item> = {
  m1: genererItemM1,
  m2: genererItemM2,
  m3: genererItemM3,
  m4: genererItemM4,
  l1: genererItemL1,
  l3: genererItemL3,
}

/** Domaines dont le générateur existe (les autres arrivent aux chantiers suivants). */
export const DOMAINES_IMPLEMENTES = Object.keys(GENERATEURS)

export function genererItem(skillId: string, rng: Rng): Item {
  const domaine = skillId.split('.')[0]
  const g = GENERATEURS[domaine]
  if (!g) throw new Error(`pas de générateur pour ${domaine}`)
  return g(skillId, rng)
}
