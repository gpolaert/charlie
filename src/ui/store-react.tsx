// Pont React ↔ store : contexte + persistance automatique.
import { createContext, useContext, useEffect, useReducer } from 'react'
import type { ReactNode } from 'react'
import { charger, persister, reducer } from '../game/store'
import type { Action } from '../game/store'
import type { Save } from '../game/types'

interface Jeu {
  save: Save
  dispatch: (a: Action) => void
}

const ContexteJeu = createContext<Jeu | null>(null)

export function FournisseurJeu({ children }: { children: ReactNode }) {
  const [save, dispatch] = useReducer(reducer, undefined, charger)
  useEffect(() => persister(save), [save])
  return <ContexteJeu.Provider value={{ save, dispatch }}>{children}</ContexteJeu.Provider>
}

export function useJeu(): Jeu {
  const jeu = useContext(ContexteJeu)
  if (!jeu) throw new Error('useJeu hors du FournisseurJeu')
  return jeu
}
