// QCM : gros boutons. « Le coup de pied de fer » peut faire disparaitre un distracteur.
import { useEffect, useState } from 'react'
import type { Item } from '../../game/types'

interface Props {
  item: Item
  /** options retirées par la technique (indices dans item.options) */
  envolees: number[]
  onReponse: (valeur: string) => void
  desactive: boolean
}

export function ChoiceItem({ item, envolees, onReponse, desactive }: Props) {
  const [options, setOptions] = useState(item.options ?? [])
  useEffect(() => setOptions(item.options ?? []), [item])

  return (
    <div className="options" role="group" aria-label="Réponses possibles">
      {options.map((o, i) => (
        <button
          key={`${o}-${i}`}
          className={envolees.includes(i) ? 'envolee' : undefined}
          disabled={desactive || envolees.includes(i)}
          onClick={() => onReponse(o)}
        >
          {o}
        </button>
      ))}
    </div>
  )
}
