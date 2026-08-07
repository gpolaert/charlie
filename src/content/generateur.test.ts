// Le vrai risque de bug : des items invalides. 200 items par skill, tous vérifiés.
import { describe, expect, it } from 'vitest'
import { genererItem } from './generateur'
import { DOMAINES_IMPLEMENTES } from './generateur'
import { SKILLS } from './skills'

function rngDeterministe(graine: number) {
  let x = graine
  return () => {
    x = (x * 1103515245 + 12345) % 2147483648
    return x / 2147483648
  }
}

const CHAMP_MAX: Record<string, number> = { ce1: 1000, ce2a: 1000, ce2: 10000 }

const skillsTestes = SKILLS.filter((s) => DOMAINES_IMPLEMENTES.includes(s.domaine))

describe('générateurs d’items', () => {
  for (const skill of skillsTestes) {
    it(`${skill.id} : 200 items valides`, () => {
      const rng = rngDeterministe(skill.id.length * 1000 + 7)
      for (let i = 0; i < 200; i++) {
        const item = genererItem(skill.id, rng)
        expect(item.skillId).toBe(skill.id)
        expect(item.reponse.length).toBeGreaterThan(0)
        expect(item.aide.length).toBeGreaterThan(0)
        expect(item.consigne.length).toBeGreaterThan(0)

        if (item.format === 'choice') {
          expect(item.options!.length).toBeGreaterThanOrEqual(2)
          // La réponse est dans les options, une seule fois.
          expect(item.options!.filter((o) => o === item.reponse)).toHaveLength(1)
          // Distracteurs tous distincts.
          expect(new Set(item.options).size).toBe(item.options!.length)
        }

        if (item.format === 'numpad') {
          expect(/^\d+$/.test(item.reponse)).toBe(true)
          // Champ numérique du palier respecté (résultats ≤ borne).
          const n = Number(item.reponse)
          expect(n).toBeLessThanOrEqual(CHAMP_MAX[skill.palier])
          expect(n).toBeGreaterThanOrEqual(0)
        }
      }
    })
  }

  it('les items de calcul sont résolubles (vérification arithmétique)', () => {
    const rng = rngDeterministe(99)
    for (let i = 0; i < 300; i++) {
      const item = genererItem('m1.tablesAdd', rng)
      const m = item.enonce.match(/^(\d+) \+ (…|\d+) = (…|\d+)$/)
      expect(m).not.toBeNull()
      const [, a, b, s] = m!
      if (b === '…') expect(Number(a) + Number(item.reponse)).toBe(Number(s))
      else expect(Number(a) + Number(b)).toBe(Number(item.reponse))
    }
  })
})
