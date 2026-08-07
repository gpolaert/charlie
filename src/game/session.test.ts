import { describe, expect, it } from 'vitest'
import { DOMAINES_COEUR, DOMAINES_MATHS } from './types'
import type { DomaineId, Save } from './types'
import { choisirDomaine, reinserer, skillsDeMission, TAILLE_MISSION } from './session'
import { saveInitial } from './store'

function rngDeterministe(graine = 42) {
  let x = graine
  return () => {
    x = (x * 1103515245 + 12345) % 2147483648
    return x / 2147483648
  }
}

describe('session', () => {
  it('pondération : ~2/3 des missions maths vont au cœur (calcul/numération/problèmes)', () => {
    const rng = rngDeterministe()
    const autorises: DomaineId[] = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6']
    let coeur = 0
    const N = 600
    for (let i = 0; i < N; i++) {
      const save = { ...saveInitial(), missionsJouees: 0 } // pair → maths
      const d = choisirDomaine(save, rng, autorises)
      expect(DOMAINES_MATHS).toContain(d)
      if (DOMAINES_COEUR.includes(d)) coeur++
    }
    expect(coeur / N).toBeGreaterThan(0.55)
    expect(coeur / N).toBeLessThan(0.78)
  })

  it('alterne maths et lecture', () => {
    const rng = rngDeterministe(7)
    const autorises: DomaineId[] = ['m1', 'l1']
    const pair = choisirDomaine({ ...saveInitial(), missionsJouees: 0 }, rng, autorises)
    const impair = choisirDomaine({ ...saveInitial(), missionsJouees: 1 }, rng, autorises)
    expect(pair).toBe('m1')
    expect(impair).toBe('l1')
  })

  it('produit une mission de la bonne taille, dans le domaine demandé', () => {
    const rng = rngDeterministe(3)
    const suite = skillsDeMission(saveInitial(), 'm1', rng)
    expect(suite).toHaveLength(TAILLE_MISSION)
    for (const id of suite) expect(id.startsWith('m1.')).toBe(true)
  })

  it('anti-spirale : un skill en spirale est écarté de la mission', () => {
    const save: Save = {
      ...saveInitial(),
      skills: {
        'm1.tablesAdd': { boite: 1, serie: -2, tentatives: 4, reussites: 0, msMedian: 3000, vus: 4 },
        'm1.doubles': { boite: 5, serie: 6, tentatives: 8, reussites: 8, msMedian: 2000, vus: 8 },
        'm1.complements10': { boite: 4, serie: 4, tentatives: 6, reussites: 6, msMedian: 2000, vus: 6 },
      },
    }
    const rng = rngDeterministe(11)
    const suite = skillsDeMission(save, 'm1', rng)
    expect(suite).not.toContain('m1.tablesAdd')
  })

  it('les boîtes basses passent en premier', () => {
    const save: Save = {
      ...saveInitial(),
      skills: {
        'm1.tablesAdd': { boite: 5, serie: 5, tentatives: 9, reussites: 9, msMedian: 2000, vus: 9 },
        'm1.doubles': { boite: 1, serie: 1, tentatives: 2, reussites: 1, msMedian: 3000, vus: 2 },
      },
    }
    const rng = rngDeterministe(5)
    const suite = skillsDeMission(save, 'm1', rng)
    expect(suite[0]).toBe('m1.doubles')
  })

  it('réinsère un item raté 3 places plus loin', () => {
    const suite = ['a', 'b', 'c', 'd', 'e', 'f']
    const apres = reinserer(suite, 1)
    expect(apres).toHaveLength(7)
    expect(apres[4]).toBe('b')
  })
})
