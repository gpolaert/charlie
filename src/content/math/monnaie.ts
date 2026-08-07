// M3 — monnaie : sommes, rendu, écriture à virgule (piège 2,05 vs 2,50 signalé au programme).
import type { Item, Rng } from '../../game/types'
import { choisir, entier, optionsTexte } from '../util'

function euros(centimes: number): string {
  const e = Math.floor(centimes / 100)
  const c = centimes % 100
  if (c === 0) return `${e} €`
  return `${e},${String(c).padStart(2, '0')} €`
}

export function genererItemM3(skillId: string, rng: Rng): Item {
  switch (skillId) {
    case 'm3.sommes': {
      // Compter une somme affichée en pièces/billets (widget), euros entiers.
      const somme = entier(rng, 3, 99)
      return {
        skillId,
        format: 'numpad',
        consigne: 'Compte la somme du porte-monnaie.',
        enonce: 'Combien d’euros en tout ?',
        widget: { type: 'monnaie', centimes: somme * 100 },
        reponse: String(somme),
        aide: `Commence par les billets, puis les pièces : ${somme} €.`,
      }
    }
    case 'm3.rendre': {
      const prix = entier(rng, 2, 18)
      const billet = prix <= 9 ? 10 : 20
      return {
        skillId,
        format: 'numpad',
        consigne: 'Rends la monnaie.',
        enonce: `Ça coute ${prix} €. On paie avec ${billet} €. On rend … €`,
        reponse: String(billet - prix),
        aide: `${prix} + ${billet - prix} = ${billet}. On rend ${billet - prix} €.`,
      }
    }
    case 'm3.virgule': {
      const e = entier(rng, 1, 9)
      const forme = choisir(rng, ['unites', 'dizaines'] as const)
      const c = forme === 'unites' ? entier(rng, 1, 9) : entier(rng, 1, 9) * 10
      const bonne = euros(e * 100 + c)
      const piege = forme === 'unites' ? euros(e * 100 + c * 10) : euros(e * 100 + c / 10)
      const texteCentimes = `${e} € et ${c} centime${c > 1 ? 's' : ''}`
      return {
        skillId,
        format: 'choice',
        consigne: 'Choisis la bonne écriture.',
        enonce: texteCentimes,
        options: optionsTexte(rng, bonne, [piege, euros(e * 100), euros((e + 1) * 100 + c)]),
        reponse: bonne,
        aide: `${c} centimes s’écrit ${String(c).padStart(2, '0')} après la virgule : ${bonne}.`,
      }
    }
    default:
      throw new Error(`m3: skill inconnu ${skillId}`)
  }
}
