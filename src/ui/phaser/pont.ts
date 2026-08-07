// Pont Phaser ↔ React : petit bus d'événements typé, sans dépendance.
// Phaser émet vers React (ouvrir un overlay), React émet vers Phaser (reprendre).

export type EvenementMonde =
  | { type: 'ouvrirMission' }
  | { type: 'ouvrirBazar' }
  | { type: 'dialogue'; pnjId: string }

type AbonneMonde = (e: EvenementMonde) => void

const abonnesMonde = new Set<AbonneMonde>()

export const pont = {
  /** Phaser → React */
  emettre(e: EvenementMonde): void {
    for (const a of abonnesMonde) a(e)
  },
  abonner(a: AbonneMonde): () => void {
    abonnesMonde.add(a)
    return () => abonnesMonde.delete(a)
  },
}
