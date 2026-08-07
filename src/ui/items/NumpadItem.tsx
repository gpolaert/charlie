// Saisie chiffrée : pavé tactile + clavier physique (0-9, Entrée, Retour).
import { useEffect, useState } from 'react'
import type { Item } from '../../game/types'

interface Props {
  item: Item
  onReponse: (valeur: string) => void
  desactive: boolean
}

export function NumpadItem({ item, onReponse, desactive }: Props) {
  const [saisie, setSaisie] = useState('')
  useEffect(() => setSaisie(''), [item])

  useEffect(() => {
    function clavier(e: KeyboardEvent) {
      if (desactive) return
      if (/^\d$/.test(e.key)) setSaisie((s) => (s.length < 5 ? s + e.key : s))
      else if (e.key === 'Backspace') setSaisie((s) => s.slice(0, -1))
      else if (e.key === 'Enter' && saisie.length > 0) onReponse(saisie)
    }
    window.addEventListener('keydown', clavier)
    return () => window.removeEventListener('keydown', clavier)
  }, [desactive, saisie, onReponse])

  return (
    <div>
      <div className="saisie" aria-live="polite" aria-label="Ta réponse">
        {saisie || ' '}
      </div>
      <div className="numpad" role="group" aria-label="Pavé numérique">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button key={n} disabled={desactive} onClick={() => setSaisie((s) => (s.length < 5 ? s + n : s))}>
            {n}
          </button>
        ))}
        <button disabled={desactive} onClick={() => setSaisie((s) => s.slice(0, -1))} aria-label="Effacer">
          ⌫
        </button>
        <button disabled={desactive} onClick={() => setSaisie((s) => (s.length < 5 ? s + '0' : s))}>
          0
        </button>
        <button
          className="btn-action"
          disabled={desactive || saisie.length === 0}
          onClick={() => onReponse(saisie)}
          aria-label="Valider"
        >
          ✓
        </button>
      </div>
    </div>
  )
}
