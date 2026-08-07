import { describe, expect, it } from 'vitest'
import { appliquerResultat, etatInitial, FAMILLES, paliersFinaux, tousFinis } from './placement'

describe('placement (vol d’essai)', () => {
  it('2 erreurs fixent le palier courant', () => {
    let e = etatInitial().calcul
    e = appliquerResultat(e, false)
    expect(e.fini).toBe(false)
    e = appliquerResultat(e, false)
    expect(e.fini).toBe(true)
    expect(e.palier).toBe('ce1')
  })

  it('2 réussites montent d’un palier', () => {
    let e = etatInitial().calcul
    e = appliquerResultat(e, true)
    e = appliquerResultat(e, true)
    expect(e.palier).toBe('ce2a')
    expect(e.fini).toBe(false)
  })

  it('tout réussir mène au palier ce2 et termine', () => {
    let e = etatInitial().calcul
    for (let i = 0; i < 6; i++) e = appliquerResultat(e, true)
    expect(e.palier).toBe('ce2')
    expect(e.fini).toBe(true)
  })

  it('un mélange réussite/erreur peut fixer un palier intermédiaire', () => {
    let e = etatInitial().calcul
    e = appliquerResultat(e, true)
    e = appliquerResultat(e, true) // → ce2a
    e = appliquerResultat(e, false)
    e = appliquerResultat(e, false) // fixé
    expect(e.fini).toBe(true)
    expect(e.palier).toBe('ce2a')
  })

  it('paliersFinaux couvre les 10 domaines', () => {
    const etats = etatInitial()
    for (const f of FAMILLES) {
      etats[f.id] = { ...etats[f.id], fini: true }
    }
    expect(tousFinis(etats)).toBe(true)
    const paliers = paliersFinaux(etats)
    expect(Object.keys(paliers)).toHaveLength(10)
  })
})
