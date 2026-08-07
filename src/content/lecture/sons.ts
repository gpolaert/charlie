// L1 — sons et lettres : graphèmes complexes, valeur des lettres selon le contexte.
// Corpus embarqué (pas d'audio nécessaire : c'est du décodage écrit).
import type { Item, Rng } from '../../game/types'
import { choisir, optionsTexte } from '../util'

interface MotATrou {
  affiche: string // avec … à la place du graphème
  graphème: string
  indice: string
  distracteurs: string[]
}

const SONS_SIMPLES: MotATrou[] = [
  { affiche: 'm…ton', graphème: 'ou', indice: 'l’animal qui fait bêê', distracteurs: ['on', 'an', 'oi'] },
  { affiche: 'p…t', graphème: 'on', indice: 'il traverse la rivière', distracteurs: ['ou', 'an', 'oi'] },
  { affiche: 'bat…', graphème: 'eau', indice: 'il flotte sur la mer', distracteurs: ['o', 'au', 'ou'] },
  { affiche: 'ét…le', graphème: 'oi', indice: 'elle brille la nuit', distracteurs: ['ou', 'on', 'an'] },
  { affiche: '…apeau', graphème: 'ch', indice: 'on le met sur la tête', distracteurs: ['j', 's', 'c'] },
  { affiche: 'm…che', graphème: 'ou', indice: 'un petit insecte qui vole', distracteurs: ['an', 'oi', 'on'] },
  { affiche: 'pl…te', graphème: 'an', indice: 'elle pousse dans le jardin', distracteurs: ['ou', 'on', 'oi'] },
  { affiche: 'b…bon', graphème: 'on', indice: 'une sucrerie', distracteurs: ['ou', 'oi', 'an'] },
  { affiche: 'v…ture', graphème: 'oi', indice: 'elle roule sur la route', distracteurs: ['ou', 'on', 'an'] },
  { affiche: '…ien', graphème: 'ch', indice: 'il aboie', distracteurs: ['s', 'j', 'g'] },
]

const SONS_DURS: MotATrou[] = [
  { affiche: 'monta…e', graphème: 'gn', indice: 'elle est très haute', distracteurs: ['ni', 'n', 'gu'] },
  { affiche: 'papi…on', graphème: 'll', indice: 'il vole de fleur en fleur', distracteurs: ['y', 'li', 'l'] },
  { affiche: 'fl…r', graphème: 'eu', indice: 'elle sent bon', distracteurs: ['e', 'o', 'ou'] },
  { affiche: 'm…', graphème: 'ain', indice: 'elle a cinq doigts', distracteurs: ['in', 'ein', 'an'] },
  { affiche: 'p…tre', graphème: 'ein', indice: 'il fait des tableaux', distracteurs: ['ain', 'in', 'an'] },
  { affiche: 'lap…', graphème: 'in', indice: 'il a de grandes oreilles', distracteurs: ['ain', 'ein', 'on'] },
  { affiche: 'ara…ée', graphème: 'gn', indice: 'elle tisse une toile', distracteurs: ['n', 'ni', 'gu'] },
  { affiche: 'f…ille', graphème: 'eu', indice: 'elle tombe de l’arbre en automne', distracteurs: ['e', 'o', 'a'] },
  { affiche: 'p…', graphème: 'oin', indice: 'la main fermée', distracteurs: ['on', 'oi', 'ouin'] },
  { affiche: 'gren…ille', graphème: 'ou', indice: 'elle saute dans la mare', distracteurs: ['oi', 'on', 'a'] },
]

interface LettreContexte {
  mot: string
  lettre: string
  question: string
  bonne: string
  distracteurs: string[]
  aide: string
}

const LETTRES_CONTEXTE: LettreContexte[] = [
  { mot: 'maison', lettre: 's', question: 'Comment se lit le s de « maison » ?', bonne: '[z] comme zèbre', distracteurs: ['[s] comme serpent'], aide: 'Entre deux voyelles, le s chante [z].' },
  { mot: 'tasse', lettre: 's', question: 'Comment se lit le ss de « tasse » ?', bonne: '[s] comme serpent', distracteurs: ['[z] comme zèbre'], aide: 'Deux s ensemble chantent toujours [s].' },
  { mot: 'citron', lettre: 'c', question: 'Comment se lit le c de « citron » ?', bonne: '[s] comme serpent', distracteurs: ['[k] comme cabane'], aide: 'Devant e et i, le c chante [s].' },
  { mot: 'cabane', lettre: 'c', question: 'Comment se lit le c de « cabane » ?', bonne: '[k] comme koala', distracteurs: ['[s] comme serpent'], aide: 'Devant a, o, u, le c chante [k].' },
  { mot: 'girafe', lettre: 'g', question: 'Comment se lit le g de « girafe » ?', bonne: '[j] comme jupe', distracteurs: ['[g] comme gâteau'], aide: 'Devant e et i, le g chante [j].' },
  { mot: 'gâteau', lettre: 'g', question: 'Comment se lit le g de « gâteau » ?', bonne: '[g] comme gare', distracteurs: ['[j] comme jupe'], aide: 'Devant a, o, u, le g chante [g].' },
  { mot: 'garçon', lettre: 'ç', question: 'Pourquoi le ç de « garçon » a-t-il une cédille ?', bonne: 'Pour chanter [s] devant o', distracteurs: ['Pour chanter [k] devant o'], aide: 'La cédille rend le c doux : [s].' },
  { mot: 'guitare', lettre: 'g', question: 'Comment se lit le gu de « guitare » ?', bonne: '[g] comme gare', distracteurs: ['[j] comme jupe'], aide: 'Le u protège le g : il reste dur, [g].' },
]

export function genererItemL1(skillId: string, rng: Rng): Item {
  switch (skillId) {
    case 'l1.sonsSimples':
    case 'l1.sonsDurs': {
      const corpus = skillId === 'l1.sonsSimples' ? SONS_SIMPLES : SONS_DURS
      const m = choisir(rng, corpus)
      const motComplet = m.affiche.replace('…', m.graphème)
      return {
        skillId,
        format: 'choice',
        consigne: 'Complète le mot.',
        enonce: `${m.affiche}  (${m.indice})`,
        options: optionsTexte(rng, m.graphème, m.distracteurs),
        reponse: m.graphème,
        aide: `Le mot est « ${motComplet} », avec « ${m.graphème} ».`,
      }
    }
    case 'l1.lettresContexte': {
      const q = choisir(rng, LETTRES_CONTEXTE)
      return {
        skillId,
        format: 'choice',
        consigne: 'Observe bien la lettre.',
        enonce: q.question,
        options: optionsTexte(rng, q.bonne, q.distracteurs),
        reponse: q.bonne,
        aide: q.aide,
      }
    }
    default:
      throw new Error(`l1: skill inconnu ${skillId}`)
  }
}
