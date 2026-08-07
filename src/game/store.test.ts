import { describe, expect, it } from 'vitest'
import { PIECES_PAR_BONNE_REPONSE } from './economy'
import { reducer, saveInitial } from './store'

describe('store (reducer)', () => {
  it('une bonne réponse crédite des pièces et met à jour le skill', () => {
    const s1 = reducer(saveInitial(), {
      type: 'reponse',
      reponse: { skillId: 'm1.tablesAdd', correcte: true, ms: 2500 },
    })
    expect(s1.pieces).toBe(PIECES_PAR_BONNE_REPONSE)
    expect(s1.skills['m1.tablesAdd'].boite).toBe(2)
  })

  it('une erreur ne retire jamais rien', () => {
    const s1 = reducer(saveInitial(), {
      type: 'reponse',
      reponse: { skillId: 'm1.tablesAdd', correcte: false, ms: 2500 },
    })
    expect(s1.pieces).toBe(0)
    expect(s1.xp).toBe(0)
  })

  it('fin de mission : XP crédité, chantier avancé', () => {
    const s1 = reducer(saveInitial(), { type: 'finMission', bonnes: 8, total: 8, village: 'aitSoleil' })
    expect(s1.xp).toBeGreaterThan(0)
    expect(s1.chantiers.aitSoleil).toBe(1)
    expect(s1.missionsJouees).toBe(1)
  })

  it('cadeau : jamais deux fois le même objet', () => {
    let s = reducer(saveInitial(), { type: 'cadeau', objetId: 'foulard' })
    s = reducer(s, { type: 'cadeau', objetId: 'foulard' })
    expect(s.objets).toEqual(['foulard'])
  })

  it('équiper exige de posséder l’objet', () => {
    const refus = reducer(saveInitial(), { type: 'equiper', slot: 'couvrechef', objetId: 'foulard' })
    expect(refus.equipement.couvrechef).toBeNull()
    let s = reducer(saveInitial(), { type: 'cadeau', objetId: 'foulard' })
    s = reducer(s, { type: 'equiper', slot: 'couvrechef', objetId: 'foulard' })
    expect(s.equipement.couvrechef).toBe('foulard')
  })

  it('acheter : refuse sans pièces, accepte avec', () => {
    const pauvre = reducer(saveInitial(), { type: 'acheter', articleId: 'casquette' })
    expect(pauvre.objets).toEqual([])
    const riche = { ...saveInitial(), pieces: 100 }
    const s = reducer(riche, { type: 'acheter', articleId: 'casquette' })
    expect(s.objets).toContain('casquette')
    expect(s.pieces).toBe(80)
  })

  it('construire exige le plan et un emplacement libre', () => {
    const sans = reducer(saveInitial(), {
      type: 'construire',
      emplacementId: 'colline',
      constructionId: 'planChateauEau',
    })
    expect(sans.bellerive.colline).toBeUndefined()
    let s = reducer(saveInitial(), { type: 'cadeau', objetId: 'planChateauEau' })
    s = reducer(s, { type: 'construire', emplacementId: 'colline', constructionId: 'planChateauEau' })
    expect(s.bellerive.colline).toBe('planChateauEau')
  })

  it('le vol d’essai fixe les paliers', () => {
    const s = reducer(saveInitial(), {
      type: 'finVolEssai',
      paliers: { ...saveInitial().paliers, m1: 'ce2' },
    })
    expect(s.volEssaiFait).toBe(true)
    expect(s.paliers.m1).toBe('ce2')
  })
})
