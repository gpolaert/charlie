// M1 — calcul éclair : faits numériques et procédures du programme.
import type { Item, Rng } from '../../game/types'
import { choisir, entier, optionsNumeriques } from '../util'

export function genererItemM1(skillId: string, rng: Rng): Item {
  switch (skillId) {
    case 'm1.tablesAdd': {
      // Égalité à trou dans les deux sens : a + ? = s  ou  a + b = ?
      const a = entier(rng, 2, 9)
      const b = entier(rng, 2, 9)
      const trou = rng() < 0.5
      if (trou) {
        return {
          skillId,
          format: 'numpad',
          consigne: 'Complète la pièce manquante.',
          enonce: `${a} + … = ${a + b}`,
          reponse: String(b),
          aide: `${a} + ${b} = ${a + b}. Le trou vaut ${b}.`,
        }
      }
      return {
        skillId,
        format: 'numpad',
        consigne: 'Calcule.',
        enonce: `${a} + ${b} = …`,
        reponse: String(a + b),
        aide: `${a} + ${b} = ${a + b}.`,
      }
    }
    case 'm1.doubles': {
      const n = entier(rng, 2, 15)
      if (rng() < 0.5) {
        return {
          skillId,
          format: 'numpad',
          consigne: 'Trouve le double.',
          enonce: `Le double de ${n}, c’est …`,
          reponse: String(n * 2),
          aide: `${n} + ${n} = ${n * 2}.`,
        }
      }
      return {
        skillId,
        format: 'numpad',
        consigne: 'Trouve la moitié.',
        enonce: `La moitié de ${n * 2}, c’est …`,
        reponse: String(n),
        aide: `${n} + ${n} = ${n * 2}, la moitié est ${n}.`,
      }
    }
    case 'm1.complements10': {
      const base = choisir(rng, [10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
      const a = base - entier(rng, 1, 9)
      return {
        skillId,
        format: 'numpad',
        consigne: 'Complète pour atteindre la dizaine.',
        enonce: `${a} + … = ${base}`,
        reponse: String(base - a),
        aide: `${a} + ${base - a} = ${base}.`,
      }
    }
    case 'm1.plusMoins9': {
      const n = entier(rng, 15, 970)
      const d = choisir(rng, [9, 19, 29] as const)
      const plus = rng() < 0.5
      const r = plus ? n + d : n - d
      if (!plus && r < 0) return genererItemM1(skillId, rng)
      return {
        skillId,
        format: 'numpad',
        consigne: plus ? 'Ajoute malin !' : 'Retire malin !',
        enonce: `${n} ${plus ? '+' : '−'} ${d} = …`,
        reponse: String(r),
        aide: plus
          ? `Ajoute ${d + 1}, puis retire 1 : ${n} + ${d + 1} = ${n + d + 1}, − 1 = ${r}.`
          : `Retire ${d + 1}, puis ajoute 1 : ${n} − ${d + 1} = ${n - d - 1}, + 1 = ${r}.`,
      }
    }
    case 'm1.tablesMul25': {
      const t = choisir(rng, [2, 5, 10] as const)
      const k = entier(rng, 2, 9)
      return {
        skillId,
        format: 'numpad',
        consigne: 'Calcule.',
        enonce: `${k} × ${t} = …`,
        reponse: String(k * t),
        aide: `${k} × ${t}, c’est ${t} pris ${k} fois : ${k * t}.`,
      }
    }
    case 'm1.tablesMul': {
      const a = entier(rng, 3, 9)
      const b = entier(rng, 3, 9)
      if (rng() < 0.4) {
        return {
          skillId,
          format: 'numpad',
          consigne: 'Trouve le facteur caché.',
          enonce: `${a} × … = ${a * b}`,
          reponse: String(b),
          aide: `${a} × ${b} = ${a * b}. Le facteur caché est ${b}.`,
        }
      }
      return {
        skillId,
        format: 'numpad',
        consigne: 'Calcule.',
        enonce: `${a} × ${b} = …`,
        reponse: String(a * b),
        aide: `${a} × ${b} = ${a * b}.`,
      }
    }
    case 'm1.foisDizaines': {
      const forme = choisir(rng, ['x10', 'x100', 'x4', 'x8'] as const)
      if (forme === 'x10' || forme === 'x100') {
        const f = forme === 'x10' ? 10 : 100
        const n = forme === 'x10' ? entier(rng, 3, 99) : entier(rng, 3, 99)
        return {
          skillId,
          format: 'numpad',
          consigne: 'Fais glisser les chiffres.',
          enonce: `${n} × ${f} = …`,
          reponse: String(n * f),
          aide: `Chaque chiffre devient ${f === 10 ? '10' : '100'} fois plus grand : ${n * f}.`,
        }
      }
      const f = forme === 'x4' ? 4 : 8
      const n = entier(rng, 3, f === 4 ? 25 : 12)
      return {
        skillId,
        format: 'numpad',
        consigne: 'Double, encore et encore !',
        enonce: `${n} × ${f} = …`,
        reponse: String(n * f),
        aide:
          f === 4
            ? `× 4, c’est doubler deux fois : ${n} → ${n * 2} → ${n * 4}.`
            : `× 8, c’est doubler trois fois : ${n} → ${n * 2} → ${n * 4} → ${n * 8}.`,
      }
    }
    case 'm1.doublesGrands': {
      const n = choisir(rng, [20, 25, 30, 35, 40, 45, 50, 60, 75, 100, 150, 200, 250, 300, 400, 500] as const)
      if (rng() < 0.5) {
        return {
          skillId,
          format: 'numpad',
          consigne: 'Trouve le double.',
          enonce: `Le double de ${n}, c’est …`,
          reponse: String(n * 2),
          aide: `${n} + ${n} = ${n * 2}.`,
        }
      }
      return {
        skillId,
        format: 'numpad',
        consigne: 'Trouve la moitié.',
        enonce: `La moitié de ${n * 2}, c’est …`,
        reponse: String(n),
        aide: `La moitié de ${n * 2}, c’est ${n}.`,
      }
    }
    default:
      throw new Error(`m1: skill inconnu ${skillId}`)
  }
}

/** Variante QCM (pour le vol d'essai et la technique 50/50). */
export function enQcm(item: Item, rng: Rng): Item {
  if (item.format !== 'numpad' || !/^\d+$/.test(item.reponse)) return item
  return { ...item, format: 'choice', options: optionsNumeriques(rng, Number(item.reponse)) }
}
