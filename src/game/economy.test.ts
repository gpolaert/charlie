import { describe, expect, it } from 'vitest'
import { acheter, BAZAR, grade, xpMission } from './economy'
import { saveInitial } from './store'

describe('economy', () => {
  it('les grades montent avec l’XP, sans jamais redescendre', () => {
    let precedent = -1
    for (let xp = 0; xp <= 1200; xp += 40) {
      const g = grade(xp).index
      expect(g).toBeGreaterThanOrEqual(precedent)
      precedent = g
    }
    expect(grade(0).nom).toBe('Apprenti')
    expect(grade(1100).nom).toBe('Grand Inventeur')
  })

  it('xpMission récompense la réussite sans punir l’échec', () => {
    expect(xpMission(0, 8)).toBeGreaterThan(0) // même tout faux : XP de participation
    expect(xpMission(8, 8)).toBeGreaterThan(xpMission(4, 8))
  })

  it('un article verrouillé par grade est refusé', () => {
    const verrouille = BAZAR.find((a) => a.gradeMin > 0)!
    const s = { ...saveInitial(), pieces: 999 }
    expect(acheter(s, verrouille.id)).toBeNull()
  })

  it('un achat déjà possédé est refusé', () => {
    const s = { ...saveInitial(), pieces: 999, objets: ['casquette'] }
    expect(acheter(s, 'casquette')).toBeNull()
  })
})
