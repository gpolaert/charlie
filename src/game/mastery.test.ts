import { describe, expect, it } from 'vitest'
import { appliquerReponse, enSpirale, estAcquis, skillInitial } from './mastery'

describe('mastery (Leitner)', () => {
  it('monte d’une boîte par bonne réponse, plafonne à 5', () => {
    let s = skillInitial()
    for (const attendu of [2, 3, 4, 5, 5]) {
      s = appliquerReponse(s, true, 3000)
      expect(s.boite).toBe(attendu)
    }
  })

  it('redescend en boîte 1 après une erreur', () => {
    let s = skillInitial()
    s = appliquerReponse(s, true, 3000)
    s = appliquerReponse(s, true, 3000)
    expect(s.boite).toBe(3)
    s = appliquerReponse(s, false, 3000)
    expect(s.boite).toBe(1)
  })

  it('détecte la spirale après 2 erreurs consécutives, pas avant', () => {
    let s = skillInitial()
    s = appliquerReponse(s, false, 3000)
    expect(enSpirale(s)).toBe(false)
    s = appliquerReponse(s, false, 3000)
    expect(enSpirale(s)).toBe(true)
    s = appliquerReponse(s, true, 3000)
    expect(enSpirale(s)).toBe(false)
  })

  it('compte tentatives et réussites', () => {
    let s = skillInitial()
    s = appliquerReponse(s, true, 1000)
    s = appliquerReponse(s, false, 1000)
    expect(s.tentatives).toBe(2)
    expect(s.reussites).toBe(1)
  })

  it('acquis à partir de la boîte 4', () => {
    let s = skillInitial()
    expect(estAcquis(s)).toBe(false)
    for (let i = 0; i < 3; i++) s = appliquerReponse(s, true, 1000)
    expect(estAcquis(s)).toBe(true)
  })
})
