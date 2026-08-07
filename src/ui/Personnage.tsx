// Charlie en SVG, en couches équipables. Style carnet : traits ronds, grands yeux.
import type { Save } from '../game/types'

interface Props {
  equipement: Save['equipement']
  taille?: number
}

export function Personnage({ equipement, taille = 150 }: Props) {
  const { vetement, couvrechef, sac, outil, lunettes } = equipement
  return (
    <svg
      viewBox="0 0 120 160"
      width={taille}
      height={(taille * 160) / 120}
      role="img"
      aria-label="Charlie"
    >
      <g stroke="#4a3728" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        {/* sac (derrière le corps) */}
        {sac === 'sacoche' && (
          <g>
            <rect x={14} y={82} width={26} height={32} rx={8} fill="#8a6f4d" />
            <path d="M27 82 Q 40 66 60 72" fill="none" />
          </g>
        )}

        {/* jambes */}
        <rect x={44} y={118} width={12} height={30} rx={6} fill="#6b7f94" />
        <rect x={64} y={118} width={12} height={30} rx={6} fill="#6b7f94" />
        <ellipse cx={50} cy={151} rx={10} ry={6} fill="#4a3728" />
        <ellipse cx={70} cy={151} rx={10} ry={6} fill="#4a3728" />

        {/* corps + vêtement */}
        {vetement === 'capeVoyage' && (
          <path d="M36 80 L 24 126 L 96 126 L 84 80 Z" fill="#a2543f" />
        )}
        <rect
          x={40}
          y={78}
          width={40}
          height={44}
          rx={14}
          fill={vetement === 'gilet' ? '#c96f4a' : vetement === 'capeVoyage' ? '#c98a5a' : '#e8c98a'}
        />
        {vetement === 'gilet' && (
          <>
            <line x1={60} y1={80} x2={60} y2={120} />
            <circle cx={54} cy={94} r={2} fill="#4a3728" />
            <circle cx={54} cy={106} r={2} fill="#4a3728" />
          </>
        )}

        {/* bras */}
        <rect x={28} y={84} width={12} height={28} rx={6} fill="#e8c98a" />
        <rect x={80} y={84} width={12} height={28} rx={6} fill="#e8c98a" />
        <circle cx={34} cy={116} r={7} fill="#f2d8ae" />
        <circle cx={86} cy={116} r={7} fill="#f2d8ae" />

        {/* outil dans la main */}
        {outil === 'cleAnglaise' && (
          <g transform="rotate(-30 86 116)">
            <rect x={83} y={96} width={6} height={30} rx={3} fill="#d9a441" />
            <circle cx={86} cy={94} r={7} fill="none" stroke="#d9a441" strokeWidth={5} />
          </g>
        )}

        {/* tête */}
        <circle cx={60} cy={46} r={30} fill="#f2d8ae" />
        {/* cheveux */}
        <path d="M32 42 Q 36 14 60 16 Q 86 14 88 42 Q 78 30 60 30 Q 42 30 32 42 Z" fill="#5b4632" />

        {/* yeux — grands, expressifs */}
        <g>
          <circle cx={49} cy={48} r={8.5} fill="#fff" />
          <circle cx={71} cy={48} r={8.5} fill="#fff" />
          <circle cx={50} cy={49} r={4.5} fill="#4a3728" stroke="none" />
          <circle cx={72} cy={49} r={4.5} fill="#4a3728" stroke="none" />
          <circle cx={52} cy={47} r={1.6} fill="#fff" stroke="none" />
          <circle cx={74} cy={47} r={1.6} fill="#fff" stroke="none" />
        </g>
        {/* sourire + joues */}
        <path d="M53 62 Q 60 68 67 62" fill="none" />
        <circle cx={42} cy={58} r={3.5} fill="#e8a98a" stroke="none" opacity={0.7} />
        <circle cx={78} cy={58} r={3.5} fill="#e8a98a" stroke="none" opacity={0.7} />

        {/* lunettes */}
        {lunettes === 'lunettesCuivre' && (
          <g fill="none" stroke="#b07d3f">
            <circle cx={49} cy={48} r={11} />
            <circle cx={71} cy={48} r={11} />
            <line x1={60} y1={48} x2={60} y2={48} />
            <path d="M60 46 q 0 -3 0 0" />
            <line x1={58} y1={47} x2={62} y2={47} />
          </g>
        )}

        {/* couvre-chefs */}
        {couvrechef === 'foulard' && (
          <g>
            <path d="M31 38 Q 60 12 89 38 L 89 30 Q 60 8 31 30 Z" fill="#c9564a" />
            <path d="M86 34 q 12 4 8 16 q -8 -4 -8 -16" fill="#c9564a" />
          </g>
        )}
        {couvrechef === 'casquette' && (
          <g>
            <path d="M32 34 Q 40 12 60 12 Q 80 12 88 34 Z" fill="#5a80a5" />
            <path d="M84 30 Q 102 30 104 38 Q 92 40 82 36 Z" fill="#5a80a5" />
            <circle cx={60} cy={12} r={4} fill="#e9b44c" />
          </g>
        )}
        {couvrechef === 'chapeauExplo' && (
          <g>
            <ellipse cx={60} cy={30} rx={40} ry={9} fill="#b39158" />
            <path d="M38 30 Q 40 8 60 8 Q 80 8 82 30 Z" fill="#c7a468" />
            <path d="M38 26 L 82 26" stroke="#8a6f4d" strokeWidth={4} />
          </g>
        )}
      </g>
    </svg>
  )
}
