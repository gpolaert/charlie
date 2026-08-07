// L3 — compréhension : phrase → texte court → inférences.
// Textes ancrés dans l'univers du jeu (villages, chantiers, voyage).
import type { Item, Rng } from '../../game/types'
import { choisir, optionsTexte } from '../util'

interface QuestionLecture {
  texte: string
  question: string
  bonne: string
  distracteurs: string[]
  aide: string
}

const PHRASES: QuestionLecture[] = [
  { texte: 'Pixel range les outils dans la sacoche verte.', question: 'Où Pixel range-t-il les outils ?', bonne: 'Dans la sacoche verte', distracteurs: ['Dans la caisse rouge', 'Sous le lit', 'Dans le bateau'], aide: 'La phrase dit : « dans la sacoche verte ».' },
  { texte: 'Charlie monte dans le dirigeable avant la pluie.', question: 'Que fait Charlie ?', bonne: 'Il monte dans le dirigeable', distracteurs: ['Il descend du toit', 'Il ouvre son parapluie', 'Il court sous la pluie'], aide: 'La phrase dit : « Charlie monte dans le dirigeable ».' },
  { texte: 'Le puits du village est vide depuis trois jours.', question: 'Depuis combien de temps le puits est-il vide ?', bonne: 'Trois jours', distracteurs: ['Trois ans', 'Une semaine', 'Un mois'], aide: 'La phrase dit : « depuis trois jours ».' },
  { texte: 'Youna porte deux seaux remplis d’eau claire.', question: 'Combien de seaux porte Youna ?', bonne: 'Deux', distracteurs: ['Un', 'Trois', 'Quatre'], aide: 'La phrase dit : « deux seaux ».' },
  { texte: 'La nuit, les lanternes éclairent la grande place.', question: 'Quand les lanternes éclairent-elles ?', bonne: 'La nuit', distracteurs: ['Le matin', 'À midi', 'En été'], aide: 'La phrase commence par « La nuit ».' },
  { texte: 'Malo répare la roue du vélo avec une clé.', question: 'Que répare Malo ?', bonne: 'La roue du vélo', distracteurs: ['La porte du garage', 'Le toit de l’école', 'La pompe du puits'], aide: 'La phrase dit : « la roue du vélo ».' },
]

const PARAGRAPHES: QuestionLecture[] = [
  { texte: 'Le marché ouvre au lever du soleil. Les habitants posent leurs paniers. Charlie achète trois oranges.', question: 'Que fait Charlie au marché ?', bonne: 'Il achète des oranges', distracteurs: ['Il vend des paniers', 'Il ouvre le marché', 'Il dort encore'], aide: 'La dernière phrase dit : « Charlie achète trois oranges ».' },
  { texte: 'Le vent souffle fort sur la vallée. Pixel attache le dirigeable à un arbre. Charlie ferme les volets de l’atelier.', question: 'Pourquoi Pixel attache-t-il le dirigeable ?', bonne: 'Parce que le vent souffle fort', distracteurs: ['Parce qu’il fait nuit', 'Parce qu’il pleut', 'Pour le laver'], aide: 'La première phrase dit : « Le vent souffle fort ».' },
  { texte: 'Amara montre le chemin de la source. Il faut passer le pont, puis tourner à gauche. La source coule sous un grand figuier.', question: 'Où coule la source ?', bonne: 'Sous un grand figuier', distracteurs: ['Sous le pont', 'Dans le village', 'À droite du chemin'], aide: 'La dernière phrase dit : « sous un grand figuier ».' },
  { texte: 'Ce matin, l’école est fermée. Les enfants aident au chantier du puits. Le maitre apporte de la limonade fraiche.', question: 'Que font les enfants ce matin ?', bonne: 'Ils aident au chantier', distracteurs: ['Ils sont en classe', 'Ils boivent au café', 'Ils dorment'], aide: 'La deuxième phrase dit : « Les enfants aident au chantier ».' },
]

const INFERENCES: QuestionLecture[] = [
  { texte: 'Charlie enfile son bonnet, son écharpe et ses gants avant de sortir.', question: 'Quel temps fait-il dehors ?', bonne: 'Il fait froid', distracteurs: ['Il fait très chaud', 'Il pleut des fleurs', 'C’est l’été'], aide: 'Bonnet, écharpe, gants : on se couvre quand il fait froid.' },
  { texte: 'Youna souffle ses huit bougies et ouvre ses cadeaux.', question: 'Que se passe-t-il ?', bonne: 'C’est son anniversaire', distracteurs: ['C’est la rentrée', 'Elle part en voyage', 'Elle range sa chambre'], aide: 'Des bougies et des cadeaux : c’est un anniversaire. Elle a huit ans.' },
  { texte: 'Le sol est mouillé et de grosses flaques brillent sur la place.', question: 'Que s’est-il passé avant ?', bonne: 'Il a plu', distracteurs: ['Il a neigé', 'Le soleil a brillé', 'Le vent a soufflé'], aide: 'Sol mouillé + flaques : il a plu.' },
  { texte: 'Malo bâille, éteint sa lampe et ferme les yeux.', question: 'Que va faire Malo ?', bonne: 'Dormir', distracteurs: ['Courir', 'Manger', 'Chanter'], aide: 'Il bâille et éteint la lampe : il va dormir.' },
  { texte: 'Pixel revient du verger avec un panier plein de pommes rouges.', question: 'Où Pixel a-t-il trouvé les pommes ?', bonne: 'Au verger', distracteurs: ['À la plage', 'Dans le puits', 'À l’école'], aide: 'Il revient du verger : les pommes viennent de là.' },
]

export function genererItemL3(skillId: string, rng: Rng): Item {
  const corpus =
    skillId === 'l3.phrase' ? PHRASES : skillId === 'l3.paragraphe' ? PARAGRAPHES : INFERENCES
  const q = choisir(rng, corpus)
  return {
    skillId,
    format: 'choice',
    consigne: 'Lis, puis réponds.',
    enonce: `${q.texte}\n\n${q.question}`,
    options: optionsTexte(rng, q.bonne, q.distracteurs),
    reponse: q.bonne,
    aide: q.aide,
  }
}
