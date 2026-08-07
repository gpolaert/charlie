// Aït-Soleil — données du village : structures posées sur le sol, zones
// d'interaction, PNJ et leurs dialogues. Tout est en TUILES de 16 px.
// Frames vérifiées sur debug-atlas.html (grille 16 px sur les tilesets).

export const TUILE = 16
export const LARGEUR = 34 // tuiles
export const HAUTEUR = 24

/** Frames découpées dans les tilesets (texture, x, y, l, h en px). */
export const FRAMES: Record<string, { tex: 'desert' | 'house'; r: [number, number, number, number] }> = {
  maisonDome: { tex: 'desert', r: [0, 0, 48, 64] },
  tourBlanche: { tex: 'desert', r: [48, 0, 48, 80] },
  maisonBeige: { tex: 'desert', r: [96, 0, 64, 64] },
  maisonGrande: { tex: 'desert', r: [160, 0, 96, 64] },
  maisonVerte: { tex: 'desert', r: [256, 0, 64, 64] },
  puitsDesert: { tex: 'desert', r: [0, 48, 32, 32] },
  domePavillon: { tex: 'desert', r: [48, 80, 48, 64] },
  statueTete: { tex: 'desert', r: [0, 96, 48, 48] },
  fontaineCarree: { tex: 'desert', r: [112, 112, 32, 32] },
  etal1: { tex: 'desert', r: [48, 160, 32, 32] },
  etal2: { tex: 'desert', r: [80, 160, 32, 32] },
  palmiers: { tex: 'desert', r: [128, 64, 64, 48] },
  palmiers2: { tex: 'desert', r: [128, 112, 64, 48] },
  oasis: { tex: 'desert', r: [272, 112, 48, 48] },
  buisson: { tex: 'desert', r: [96, 160, 16, 16] },
  os: { tex: 'desert', r: [208, 160, 16, 16] },
}

export interface Structure {
  frame: string
  tx: number
  ty: number
  /** empreinte bloquante (en tuiles, relative au coin) : [dx, dy, l, h] */
  bloque?: [number, number, number, number]
}

/** Le décor : maisons en haut, place dallée au centre, oasis au sud-est. */
export const STRUCTURES: Structure[] = [
  { frame: 'maisonDome', tx: 2, ty: 2, bloque: [0, 1, 3, 3] },
  { frame: 'maisonBeige', tx: 7, ty: 1, bloque: [0, 1, 4, 3] },
  { frame: 'maisonGrande', tx: 13, ty: 1, bloque: [0, 1, 6, 3] },
  { frame: 'maisonVerte', tx: 21, ty: 2, bloque: [0, 1, 4, 3] },
  { frame: 'tourBlanche', tx: 27, ty: 1, bloque: [0, 2, 3, 3] },
  { frame: 'maisonDome', tx: 2, ty: 18, bloque: [0, 1, 3, 3] },
  { frame: 'domePavillon', tx: 24, ty: 15, bloque: [0, 2, 3, 2] },
  { frame: 'fontaineCarree', tx: 12, ty: 13, bloque: [0, 0, 2, 2] },
  { frame: 'etal1', tx: 13, ty: 8, bloque: [0, 1, 2, 1] },
  { frame: 'etal2', tx: 16, ty: 8, bloque: [0, 1, 2, 1] },
  { frame: 'palmiers', tx: 28, ty: 5 },
  { frame: 'palmiers2', tx: 1, ty: 7 },
  { frame: 'palmiers', tx: 4, ty: 14 },
  { frame: 'palmiers2', tx: 22, ty: 19 },
  { frame: 'statueTete', tx: 7, ty: 12, bloque: [1, 1, 1, 2] },
  { frame: 'oasis', tx: 28, ty: 18, bloque: [0, 0, 4, 4] },
  { frame: 'buisson', tx: 10, ty: 17 },
  { frame: 'buisson', tx: 25, ty: 8 },
  { frame: 'buisson', tx: 6, ty: 6 },
  { frame: 'os', tx: 30, ty: 12 },
]

/** La place dallée (dalles claires), en tuiles : x, y, largeur, hauteur. */
export const PLACE = { tx: 12, ty: 9, l: 12, h: 9 }

/** Le chantier du puits : au centre de la place. */
export const CHANTIER = { tx: 17, ty: 11 }

export interface Pnj {
  id: string
  perso: string
  nom: string
  tx: number
  ty: number
  /** regarde vers : 0 bas, 1 haut, 2 gauche, 3 droite */
  regard: number
}

export const PNJS: Pnj[] = [
  { id: 'amara', perso: 'Woman', nom: 'Amara', tx: 13, ty: 12, regard: 3 },
  { id: 'sultan', perso: 'Sultan', nom: 'Le chef Idir', tx: 22, ty: 7, regard: 0 },
  { id: 'oldman', perso: 'OldMan2', nom: 'Grand-père Moulay', tx: 8, ty: 11, regard: 3 },
  { id: 'enfant', perso: 'Child', nom: 'Ziri', tx: 19, ty: 17, regard: 1 },
  { id: 'hana', perso: 'NinjaRed', nom: 'Hana Atori', tx: 7, ty: 16, regard: 3 },
  { id: 'pixel', perso: 'RobotGrey', nom: 'Pixel', tx: 21, ty: 16, regard: 1 },
]

/** L'âne Nuage, près de l'oasis. */
export const ANE = { tx: 27, ty: 16 }

export interface Zone {
  type: 'chantier' | 'echoppe'
  tx: number
  ty: number
  l: number
  h: number
}

export const ZONES: Zone[] = [
  { type: 'chantier', tx: CHANTIER.tx - 2, ty: CHANTIER.ty - 1, l: 6, h: 5 },
  { type: 'echoppe', tx: 13, ty: 8, l: 5, h: 3 },
]

/** Dialogues des PNJ. Phrases courtes, présent, une idée par phrase. */
export const DIALOGUES: Record<string, { nom: string; perso: string; lignes: string[] }> = {
  amara: {
    nom: 'Amara',
    perso: 'Woman',
    lignes: [
      'Bienvenue à Aït-Soleil, Charlie !',
      'Le puits est à sec depuis la grande chaleur.',
      'Le chantier est sur la place. On compte sur toi !',
    ],
  },
  sultan: {
    nom: 'Le chef Idir',
    perso: 'Sultan',
    lignes: [
      'Azul, jeune inventeur.',
      'Notre village est ancien et fier.',
      'Rends-nous l’eau, et la fête sera grande.',
    ],
  },
  oldman: {
    nom: 'Grand-père Moulay',
    perso: 'OldMan2',
    lignes: [
      'Avant, l’eau chantait dans la fontaine.',
      'Mes oliviers ont soif.',
      'Toi, tu peux réparer ça. Je le sens.',
    ],
  },
  enfant: {
    nom: 'Ziri',
    perso: 'Child',
    lignes: ['Tu as vu mon âne ? Il s’appelle Nuage.', 'Quand l’eau reviendra, je t’apprendrai à siffler !'],
  },
  pixel: {
    nom: 'Pixel',
    perso: 'RobotGrey',
    lignes: ['Bip ! Le chantier est au centre de la place.', 'Approche-toi et appuie sur Espace !'],
  },
}
