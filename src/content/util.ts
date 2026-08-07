// Petits utilitaires partagés par les générateurs. RNG injecté (tests déterministes).
import type { Rng } from '../game/types'

export function entier(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1))
}

export function choisir<T>(rng: Rng, tab: readonly T[]): T {
  return tab[Math.floor(rng() * tab.length)]
}

export function melanger<T>(rng: Rng, tab: readonly T[]): T[] {
  const copie = [...tab]
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[copie[i], copie[j]] = [copie[j], copie[i]]
  }
  return copie
}

/**
 * Options de QCM numérique : la réponse + des distracteurs plausibles,
 * tous distincts, tous ≥ 0, mélangés.
 */
export function optionsNumeriques(rng: Rng, reponse: number, nb = 3): string[] {
  const ecarts = [1, -1, 2, -2, 10, -10, reponse >= 20 ? 5 : 3]
  const set = new Set<number>([reponse])
  let garde = 0
  while (set.size < nb + 1 && garde++ < 50) {
    const d = reponse + choisir(rng, ecarts)
    if (d >= 0 && d !== reponse) set.add(d)
  }
  let k = 1
  while (set.size < nb + 1) set.add(reponse + 20 + k++)
  return melanger(rng, [...set].map(String))
}

/** Options texte : réponse + distracteurs fournis, dédoublonnés, mélangés. */
export function optionsTexte(rng: Rng, reponse: string, distracteurs: string[], nb = 3): string[] {
  const set = new Set<string>([reponse])
  for (const d of melanger(rng, distracteurs)) {
    if (set.size >= nb + 1) break
    if (d !== reponse) set.add(d)
  }
  return melanger(rng, [...set])
}
