// M4 — problèmes avec schéma en barre (l'outil central du programme).
// Énoncés courts, ancrés dans l'univers (chantiers, villages, outils).
import type { Item, Rng } from '../../game/types'
import { choisir, entier } from '../util'

const OBJETS = ['planches', 'vis', 'briques', 'seaux', 'tuiles', 'cordes', 'clous', 'pots']

export function genererItemM4(skillId: string, rng: Rng): Item {
  const objet = choisir(rng, OBJETS)
  switch (skillId) {
    case 'm4.partiesTout': {
      const a = entier(rng, 12, 60)
      const b = entier(rng, 8, 40)
      if (rng() < 0.5) {
        // Chercher le tout.
        return {
          skillId,
          format: 'numpad',
          consigne: 'Lis bien, puis complète la barre.',
          enonce: `Charlie a ${a} ${objet}. Pixel en apporte ${b}. Combien de ${objet} en tout ?`,
          widget: { type: 'barres', total: '?', parties: [String(a), String(b)] },
          reponse: String(a + b),
          aide: `Le tout = ${a} + ${b} = ${a + b}.`,
        }
      }
      // Chercher une partie.
      return {
        skillId,
        format: 'numpad',
        consigne: 'Lis bien, puis complète la barre.',
        enonce: `Il faut ${a + b} ${objet} pour le chantier. Charlie en a déjà ${a}. Combien en manque-t-il ?`,
        widget: { type: 'barres', total: String(a + b), parties: [String(a), '?'] },
        reponse: String(b),
        aide: `${a + b} − ${a} = ${b}. Il manque ${b} ${objet}.`,
      }
    }
    case 'm4.comparaison': {
      const petit = entier(rng, 15, 90)
      const ecart = entier(rng, 5, 30)
      // Piège du programme : « de plus » alors que l'opération est une soustraction.
      if (rng() < 0.5) {
        return {
          skillId,
          format: 'numpad',
          consigne: 'Attention, lis bien la question.',
          enonce: `Youna a ${petit + ecart} ${objet}. Elle en a ${ecart} de plus que Malo. Combien Malo en a-t-il ?`,
          widget: { type: 'barres', total: String(petit + ecart), parties: ['?', String(ecart)] },
          reponse: String(petit),
          aide: `« ${ecart} de plus » : Malo en a moins. ${petit + ecart} − ${ecart} = ${petit}.`,
        }
      }
      return {
        skillId,
        format: 'numpad',
        consigne: 'Compare les deux collections.',
        enonce: `Malo a ${petit} ${objet}. Youna en a ${petit + ecart}. Combien Youna en a-t-elle de plus ?`,
        widget: { type: 'barres', total: String(petit + ecart), parties: [String(petit), '?'] },
        reponse: String(ecart),
        aide: `${petit + ecart} − ${petit} = ${ecart}.`,
      }
    }
    case 'm4.deuxEtapes': {
      const a = entier(rng, 8, 25)
      const b = entier(rng, 6, 20)
      const retire = entier(rng, 3, Math.min(15, a + b - 2))
      return {
        skillId,
        format: 'numpad',
        consigne: 'Deux étapes : additionne, puis retire.',
        enonce: `Le matin, on pose ${a} ${objet}. L’après-midi, encore ${b}. Le vent en fait tomber ${retire}. Combien en reste-t-il ?`,
        reponse: String(a + b - retire),
        aide: `D’abord ${a} + ${b} = ${a + b}. Puis ${a + b} − ${retire} = ${a + b - retire}.`,
      }
    }
    case 'm4.multiplicatifs': {
      if (rng() < 0.5) {
        const paquets = entier(rng, 3, 9)
        const parPaquet = entier(rng, 3, 9)
        return {
          skillId,
          format: 'numpad',
          consigne: 'Cherche la valeur du tout.',
          enonce: `Il y a ${paquets} caisses. Chaque caisse contient ${parPaquet} ${objet}. Combien de ${objet} en tout ?`,
          reponse: String(paquets * parPaquet),
          aide: `${paquets} × ${parPaquet} = ${paquets * parPaquet}.`,
        }
      }
      const equipes = entier(rng, 3, 9)
      const parEquipe = entier(rng, 3, 9)
      return {
        skillId,
        format: 'numpad',
        consigne: 'Partage équitablement.',
        enonce: `On partage ${equipes * parEquipe} ${objet} entre ${equipes} équipes. Combien pour chaque équipe ?`,
        reponse: String(parEquipe),
        aide: `${equipes} × ${parEquipe} = ${equipes * parEquipe}. Chaque équipe en a ${parEquipe}.`,
      }
    }
    default:
      throw new Error(`m4: skill inconnu ${skillId}`)
  }
}
