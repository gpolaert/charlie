// M2 — numération : décompositions, comparaisons, droites graduées.
import type { Item, Rng } from '../../game/types'
import { choisir, entier, melanger, optionsTexte } from '../util'

export function genererItemM2(skillId: string, rng: Rng): Item {
  switch (skillId) {
    case 'm2.dizainesUnites': {
      const d = entier(rng, 1, 9)
      const u = entier(rng, 1, 9)
      const n = d * 10 + u
      if (rng() < 0.5) {
        return {
          skillId,
          format: 'numpad',
          consigne: 'Assemble le nombre.',
          enonce: `${d * 10} + ${u} = …`,
          reponse: String(n),
          aide: `${d} dizaines et ${u} unités : ${n}.`,
        }
      }
      return {
        skillId,
        format: 'choice',
        consigne: 'Choisis la bonne décomposition.',
        enonce: `${n} = ?`,
        options: optionsTexte(rng, `${d * 10} + ${u}`, [
          `${u * 10} + ${d}`,
          `${d * 10} + ${u + 1}`,
          `${(d - 1) * 10 || 10} + ${u}`,
          `${d} + ${u}`,
        ]),
        reponse: `${d * 10} + ${u}`,
        aide: `${n}, c’est ${d} dizaines (${d * 10}) et ${u} unités.`,
      }
    }
    case 'm2.comparer100': {
      const a = entier(rng, 10, 999)
      let b = entier(rng, 10, 999)
      if (b === a) b = a + 1
      const signe = a < b ? '<' : '>'
      return {
        skillId,
        format: 'choice',
        consigne: 'Compare les deux nombres.',
        enonce: `${a} … ${b}`,
        options: ['<', '>'],
        reponse: signe,
        aide: `${Math.min(a, b)} est plus petit que ${Math.max(a, b)}. Donc ${a} ${signe} ${b}.`,
      }
    }
    case 'm2.suites': {
      const pas = choisir(rng, [2, 5, 10] as const)
      const debut = entier(rng, 1, 20) * pas
      const idx = entier(rng, 1, 3)
      const suite = [0, 1, 2, 3, 4].map((i) => debut + i * pas)
      const affiche = suite.map((n, i) => (i === idx ? '…' : String(n))).join('  ·  ')
      return {
        skillId,
        format: 'numpad',
        consigne: `Compte de ${pas} en ${pas}.`,
        enonce: affiche,
        reponse: String(suite[idx]),
        aide: `${suite[idx - 1]} + ${pas} = ${suite[idx]}.`,
      }
    }
    case 'm2.decomposer1000': {
      const c = entier(rng, 1, 9)
      const d = entier(rng, 1, 9)
      const u = entier(rng, 1, 9)
      const n = c * 100 + d * 10 + u
      return {
        skillId,
        format: 'choice',
        consigne: 'Choisis la bonne décomposition.',
        enonce: `${n} = ?`,
        options: optionsTexte(rng, `${c * 100} + ${d * 10} + ${u}`, [
          `${c * 100} + ${u * 10} + ${d}`,
          `${d * 100} + ${c * 10} + ${u}`,
          `${c * 100} + ${d * 10} + ${u + 1}`,
          `${c * 10} + ${d} + ${u}`,
        ]),
        reponse: `${c * 100} + ${d * 10} + ${u}`,
        aide: `${n} : ${c} centaines, ${d} dizaines, ${u} unités.`,
      }
    }
    case 'm2.droite': {
      const pas = choisir(rng, [1, 10, 100] as const)
      // Champ du palier : la droite entière reste ≤ 1 000.
      const maxDebut = 1000 - 5 * pas
      const debut = entier(rng, 0, Math.floor(maxDebut / pas)) * pas
      const manquantIndex = entier(rng, 1, 4)
      return {
        skillId,
        format: 'numpad',
        consigne: 'Quel nombre se cache sur la droite ?',
        enonce: '',
        widget: { type: 'droite', debut, pas, manquantIndex },
        reponse: String(debut + manquantIndex * pas),
        aide: `On avance de ${pas} en ${pas} : ${debut + (manquantIndex - 1) * pas} + ${pas} = ${debut + manquantIndex * pas}.`,
      }
    }
    case 'm2.decomposer10000': {
      const m = entier(rng, 1, 9)
      const c = entier(rng, 0, 9)
      const d = entier(rng, 0, 9)
      const u = entier(rng, 0, 9)
      const n = m * 1000 + c * 100 + d * 10 + u
      const bonne = `(${m} × 1000) + (${c} × 100) + (${d} × 10) + (${u} × 1)`
      return {
        skillId,
        format: 'choice',
        consigne: 'Choisis la bonne décomposition.',
        enonce: `${n.toLocaleString('fr-FR')} = ?`,
        options: optionsTexte(rng, bonne, [
          `(${m} × 1000) + (${d} × 100) + (${c} × 10) + (${u} × 1)`,
          `(${m} × 100) + (${c} × 1000) + (${d} × 10) + (${u} × 1)`,
          `(${m} × 1000) + (${c} × 100) + (${u} × 10) + (${d} × 1)`,
        ]),
        reponse: bonne,
        aide: `${n.toLocaleString('fr-FR')} : ${m} milliers, ${c} centaines, ${d} dizaines, ${u} unités.`,
      }
    }
    case 'm2.comparer10000': {
      const nombres = new Set<number>()
      while (nombres.size < 3) nombres.add(entier(rng, 100, 9999))
      const tab = melanger(rng, [...nombres])
      const bonne = String(Math.max(...tab))
      return {
        skillId,
        format: 'choice',
        consigne: 'Trouve le plus grand nombre.',
        enonce: tab.map((n) => n.toLocaleString('fr-FR')).join('   ·   '),
        options: melanger(rng, tab.map((n) => n.toLocaleString('fr-FR'))),
        reponse: Number(bonne).toLocaleString('fr-FR'),
        aide: `Compare d’abord les milliers, puis les centaines. Le plus grand est ${Number(bonne).toLocaleString('fr-FR')}.`,
      }
    }
    default:
      throw new Error(`m2: skill inconnu ${skillId}`)
  }
}
