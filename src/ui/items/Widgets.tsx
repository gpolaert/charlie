// Petits habillages visuels des items : porte-monnaie, droite graduée, schéma en barre.
import type { Item } from '../../game/types'

/** Décompose des euros entiers en billets/pièces usuels. */
function decomposer(euros: number): number[] {
  const valeurs = [20, 10, 5, 2, 1]
  const res: number[] = []
  let reste = euros
  for (const v of valeurs) {
    while (reste >= v) {
      res.push(v)
      reste -= v
    }
  }
  return res
}

export function WidgetItem({ widget }: { widget: NonNullable<Item['widget']> }) {
  switch (widget.type) {
    case 'monnaie': {
      const pieces = decomposer(Math.round(widget.centimes / 100))
      return (
        <svg viewBox={`0 0 ${Math.max(1, pieces.length) * 70 + 10} 90`} className="carte-svg" style={{ maxHeight: 110 }} role="img" aria-label="Porte-monnaie">
          {pieces.map((v, i) =>
            v >= 5 ? (
              <g key={i} stroke="#4a3728" strokeWidth={2}>
                <rect x={10 + i * 70} y={20} width={58} height={34} rx={5} fill={v === 20 ? '#9db8c9' : v === 10 ? '#d9a441' : '#a5c9a1'} />
                <text x={10 + i * 70 + 29} y={44} textAnchor="middle" fontSize={17} fontWeight={700} fill="#4a3728" stroke="none">
                  {v} €
                </text>
              </g>
            ) : (
              <g key={i} stroke="#4a3728" strokeWidth={2}>
                <circle cx={10 + i * 70 + 28} cy={40} r={24} fill={v === 2 ? '#e9c46a' : '#d9a441'} />
                <circle cx={10 + i * 70 + 28} cy={40} r={17} fill={v === 2 ? '#cfcabe' : '#e9c46a'} />
                <text x={10 + i * 70 + 28} y={47} textAnchor="middle" fontSize={16} fontWeight={700} fill="#4a3728" stroke="none">
                  {v} €
                </text>
              </g>
            ),
          )}
        </svg>
      )
    }
    case 'droite': {
      const positions = [0, 1, 2, 3, 4, 5]
      return (
        <svg viewBox="0 0 420 70" className="carte-svg" style={{ maxHeight: 90 }} role="img" aria-label="Droite graduée">
          <line x1={10} y1={40} x2={410} y2={40} stroke="#4a3728" strokeWidth={3} />
          <path d="M410 40 l -10 -6 v 12 Z" fill="#4a3728" />
          {positions.map((i) => {
            const x = 30 + i * 70
            const valeur = widget.debut + i * widget.pas
            return (
              <g key={i}>
                <line x1={x} y1={32} x2={x} y2={48} stroke="#4a3728" strokeWidth={3} />
                <text x={x} y={24} textAnchor="middle" fontSize={18} fontWeight={700} fill={i === widget.manquantIndex ? '#c96f4a' : '#4a3728'}>
                  {i === widget.manquantIndex ? '?' : valeur}
                </text>
              </g>
            )
          })}
        </svg>
      )
    }
    case 'barres': {
      const largeurTotale = 380
      const n = widget.parties.length
      return (
        <svg viewBox="0 0 420 90" className="carte-svg" style={{ maxHeight: 110 }} role="img" aria-label="Schéma en barre">
          {/* accolade du tout */}
          <path d={`M20 22 Q 210 2 400 22`} fill="none" stroke="#4a3728" strokeWidth={2} />
          <rect x={185} y={2} width={50} height={22} rx={6} fill="#faf3e3" stroke="#4a3728" strokeWidth={2} />
          <text x={210} y={19} textAnchor="middle" fontSize={16} fontWeight={700} fill={widget.total === '?' ? '#c96f4a' : '#4a3728'}>
            {widget.total}
          </text>
          {/* barres des parties */}
          {widget.parties.map((p, i) => {
            const l = largeurTotale / n
            const x = 20 + i * l
            return (
              <g key={i}>
                <rect x={x} y={38} width={l} height={34} fill={i % 2 === 0 ? '#e8c98a' : '#9db8c9'} stroke="#4a3728" strokeWidth={2.5} rx={4} />
                <text x={x + l / 2} y={61} textAnchor="middle" fontSize={18} fontWeight={700} fill={p === '?' || p === null ? '#c96f4a' : '#4a3728'}>
                  {p ?? '?'}
                </text>
              </g>
            )
          })}
        </svg>
      )
    }
    default:
      return null
  }
}
