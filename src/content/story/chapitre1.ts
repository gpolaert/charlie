// Chapitre 1 — villages, chantiers, dialogues, cadeaux, cartes culture.
// Ton : phrases ≤ 12 mots, présent, une idée par phrase.
import type { DomaineId, VillageId } from '../../game/types'

export interface EtapeChantier {
  nom: string
  /** Phrase de Pixel avant la mission. */
  avant: string
  /** Phrase après la mission réussie (l'animation du chantier joue pendant). */
  apres: string
}

export interface Village {
  id: VillageId
  nom: string
  region: string
  chantier: string
  probleme: string
  domaines: DomaineId[]
  etapes: EtapeChantier[]
  /** Étape (index) après laquelle la scène du mentor se joue. */
  etapeMentor: number
  cadeaux: { id: string; nom: string; slot?: string; construction?: string }[]
  carteCulture: { id: string; titre: string; salutation: string; plat: string; instrument: string }
  disponible: boolean
}

export const INTRO_JEU: string[] = [
  'Voici Bellerive, le village de Charlie.',
  'Cette nuit, la rivière a tout débordé.',
  'Le pont est cassé. Le moulin ne tourne plus.',
  'Charlie a une idée : partir aider d’autres villages.',
  'Là-bas, on apprend. On rapporte des plans, des outils.',
  'Et on reconstruit Bellerive, en mieux !',
  'Pixel embarque. L’Atelier Volant décolle !',
]

export const INTRO_VOL_ESSAI: string[] = [
  'Avant le départ, Pixel vérifie les instruments.',
  'Réponds tranquillement. Il n’y a pas de piège.',
  'Si c’est trop dur, ce n’est pas grave du tout.',
  'Pixel règle juste l’Atelier pour toi.',
]

export const VILLAGES: Village[] = [
  {
    id: 'aitSoleil',
    nom: 'Aït-Soleil',
    region: 'les montagnes de l’Atlas',
    chantier: 'Le puits à pompe',
    probleme: 'Le puits est à sec. Le village n’a plus d’eau.',
    domaines: ['m1', 'l1'],
    etapes: [
      {
        nom: 'Creuser le nouveau puits',
        avant: 'Amara nous montre l’endroit. On creuse ici !',
        apres: 'Le trou est profond. On touche l’eau !',
      },
      {
        nom: 'Monter la pompe',
        avant: 'La pompe arrive en pièces. À toi de jouer !',
        apres: 'La pompe est montée. Elle brille au soleil.',
      },
      {
        nom: 'Poser le grand bassin',
        avant: 'Il faut un bassin pour garder l’eau fraiche.',
        apres: 'Le bassin est posé. Les ânes viennent déjà boire.',
      },
      {
        nom: 'Faire couler l’eau',
        avant: 'Dernier réglage. Tout le village retient son souffle…',
        apres: 'L’eau coule ! Tout le monde crie de joie !',
      },
    ],
    etapeMentor: 1,
    cadeaux: [
      { id: 'planChateauEau', nom: 'Plan du château d’eau', construction: 'chateauEau' },
      { id: 'foulard', nom: 'Foulard d’explorateur', slot: 'couvrechef' },
    ],
    carteCulture: {
      id: 'atlas',
      titre: 'Les montagnes de l’Atlas',
      salutation: 'Pour dire bonjour, on dit « Azul » !',
      plat: 'Ici, on partage le couscous du vendredi.',
      instrument: 'Le bendir est un grand tambour rond.',
    },
    disponible: true,
  },
  {
    id: 'playaColibri',
    nom: 'Playa Colibrí',
    region: 'la côte d’Amérique centrale',
    chantier: 'La centrale solaire',
    probleme: 'L’école n’a pas de lumière le soir.',
    domaines: ['m2', 'm3', 'l2'],
    etapes: [
      { nom: 'Bientôt…', avant: '', apres: '' },
    ],
    etapeMentor: 0,
    cadeaux: [],
    carteCulture: { id: 'colibri', titre: 'Playa Colibrí', salutation: '', plat: '', instrument: '' },
    disponible: false,
  },
  {
    id: 'linhGiang',
    nom: 'Linh-Giang',
    region: 'les rizières d’Asie du Sud-Est',
    chantier: 'Les vélos-cargo et le pont',
    probleme: 'Le pont est coupé. Le marché est trop loin.',
    domaines: ['m4', 'm6', 'l3', 'l4'],
    etapes: [
      { nom: 'Bientôt…', avant: '', apres: '' },
    ],
    etapeMentor: 0,
    cadeaux: [],
    carteCulture: { id: 'linh', titre: 'Linh-Giang', salutation: '', plat: '', instrument: '' },
    disponible: false,
  },
]

export function villageParId(id: VillageId): Village {
  return VILLAGES.find((v) => v.id === id)!
}

/** Encouragements de Pixel (variés, jamais moqueurs). */
export const PIXEL_BRAVO = [
  'Bien joué !',
  'Pièce parfaite !',
  'Ça avance fort !',
  'Joli travail d’ingénieur !',
  'Le chantier te dit merci !',
]

export const PIXEL_ERREUR = [
  'Hmm, pas tout à fait. Regarde :',
  'Presque ! Voici le truc :',
  'Cette pièce va ailleurs. Regarde :',
]

export const PIXEL_FIN_SESSION =
  'Trois missions déjà ! Ton cerveau a bien travaillé. On continue demain ?'
