// Roster des mentors. Données uniquement — facile à renommer ou remplacer.
// Les apparences sont des SVG originaux « inspirés de », aucune image copiée.
import type { TechniqueId, VillageId } from '../game/types'

export interface Mentor {
  id: string
  nom: string
  village: VillageId
  technique: TechniqueId
  nomTechnique: string
  /** Ce que fait la technique, dit à l'enfant par le mentor. */
  explication: string
  /** Réplique d'apprentissage (scène de rencontre). */
  repliqueRencontre: string
  repliqueBravo: string
}

export const MENTORS: Mentor[] = [
  {
    id: 'hanaAtori',
    nom: 'Hana Atori',
    village: 'aitSoleil',
    technique: 'coupDePiedDeFer',
    nomTechnique: 'Le coup de pied de fer',
    explication: 'Mon coup de pied casse une mauvaise réponse. Il t’en reste moins à trier !',
    repliqueRencontre: 'Salut Charlie ! Je m’entraine ici chaque matin. Je te montre mon secret ?',
    repliqueBravo: 'Tu as le coup de pied de fer ! Sers-t’en quand tu hésites.',
  },
  {
    id: 'ecorime',
    nom: 'Écorime',
    village: 'playaColibri',
    technique: 'pouvoirDesSons',
    nomTechnique: 'Le pouvoir des sons',
    explication: 'Ma voix fait chanter les mots. Écoute, et les lettres s’éclairent.',
    repliqueRencontre: 'Chut… Tu entends ? Chaque mot a sa musique. Je t’apprends à l’écouter ?',
    repliqueBravo: 'Le pouvoir des sons est à toi. Fais chanter les mots difficiles !',
  },
  {
    id: 'aiglefin',
    nom: 'Aiglefin',
    village: 'linhGiang',
    technique: 'regardDaigle',
    nomTechnique: 'Le regard d’aigle',
    explication: 'Mes yeux voient l’indice caché dans chaque problème. Regarde mieux, vois plus.',
    repliqueRencontre: 'Du haut du pont, je vois tout. Je t’apprends à voir comme moi ?',
    repliqueBravo: 'Ton regard est perçant ! L’indice apparaitra quand tu en auras besoin.',
  },
]

export function mentorDuVillage(village: VillageId): Mentor {
  return MENTORS.find((m) => m.village === village)!
}
