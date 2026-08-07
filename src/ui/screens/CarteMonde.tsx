// La carte du monde, façon carte au trésor du carnet de Léonie.
// Un seul village ouvert au chapitre 1 ; les autres clignotent « à l'aide ! » verrouillés.
import { VILLAGES } from '../../content/story/chapitre1'
import type { VillageId } from '../../game/types'
import { useJeu } from '../store-react'
import { Personnage } from '../Personnage'
import { Pixel } from '../illustrations/Pixel'

interface Props {
  onVillage: (v: VillageId) => void
  onBazar: () => void
}

export function CarteMonde({ onVillage, onBazar }: Props) {
  const { save, dispatch } = useJeu()
  const positions: Record<VillageId, { x: number; y: number }> = {
    aitSoleil: { x: 175, y: 108 },
    playaColibri: { x: 68, y: 122 },
    linhGiang: { x: 312, y: 118 },
  }

  return (
    <div className="mission apparait">
      <div className="ligne" style={{ alignItems: 'flex-end' }}>
        <div className="flotte">
          <Personnage equipement={save.equipement} taille={110} />
        </div>
        <div className="bulle-pixel espace">
          <Pixel />
          <p>Où va-t-on aider aujourd’hui, Charlie ?</p>
        </div>
      </div>

      <svg viewBox="0 0 400 200" className="carte-svg panneau" role="img" aria-label="Carte du monde">
        {/* océan de papier */}
        <rect x={0} y={0} width={400} height={200} fill="#d8ecf3" rx={16} />
        {/* continents stylisés */}
        <g stroke="#4a3728" strokeWidth={2} fill="#e8c98a">
          <path d="M30 70 Q 55 40 95 55 Q 120 60 110 95 Q 118 130 85 150 Q 55 160 45 130 Q 25 100 30 70 Z" />
          <path d="M145 60 Q 180 35 225 55 Q 250 70 240 100 Q 250 135 215 150 Q 175 160 160 130 Q 140 95 145 60 Z" />
          <path d="M280 70 Q 315 45 355 65 Q 375 85 360 115 Q 368 145 330 152 Q 295 158 288 125 Q 272 95 280 70 Z" />
        </g>
        {/* route en pointillés depuis Bellerive (en haut) */}
        <path d="M200 18 Q 190 60 178 100" fill="none" stroke="#c96f4a" strokeWidth={2.5} strokeDasharray="6 6" />
        {/* Bellerive, chez Charlie */}
        <g>
          <rect x={168} y={4} width={64} height={22} rx={8} fill="#faf3e3" stroke="#4a3728" strokeWidth={2} />
          <text x={200} y={20} textAnchor="middle" fontSize={13} fontWeight={700} fill="#4a3728">
            🏠 Bellerive
          </text>
        </g>

        {VILLAGES.map((v) => {
          const p = positions[v.id]
          const fini = save.chantiers[v.id] >= v.etapes.length && v.disponible
          return (
            <g
              key={v.id}
              className="pin"
              role="button"
              aria-label={v.disponible ? `Aller à ${v.nom}` : `${v.nom} (bientôt)`}
              tabIndex={v.disponible ? 0 : -1}
              opacity={v.disponible ? 1 : 0.55}
              onClick={() => v.disponible && onVillage(v.id)}
              onKeyDown={(e) => e.key === 'Enter' && v.disponible && onVillage(v.id)}
            >
              <path
                d={`M${p.x} ${p.y} c -12 -16 -12 -30 0 -32 c 12 2 12 16 0 32 Z`}
                fill={fini ? '#7ba05b' : v.disponible ? '#c9564a' : '#a99d8a'}
                stroke="#4a3728"
                strokeWidth={2}
              />
              <circle cx={p.x} cy={p.y - 22} r={6} fill="#faf3e3" stroke="#4a3728" strokeWidth={1.5} />
              <text x={p.x} y={p.y + 16} textAnchor="middle" fontSize={13} fontWeight={700} fill="#4a3728">
                {fini ? '✓ ' : v.disponible ? '' : '🔒 '}
                {v.nom}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="grille-nav">
        <button className="btn-doux" onClick={onBazar}>
          🧺 Le bazar
        </button>
      </div>

      <div className="pied">
        <label className="ligne" style={{ gap: 6 }}>
          <input
            type="checkbox"
            checked={save.reglages.animationsReduites}
            onChange={(e) => dispatch({ type: 'reglages', reglages: { animationsReduites: e.target.checked } })}
          />
          animations réduites
        </label>
        <label className="ligne" style={{ gap: 6 }}>
          <input
            type="checkbox"
            checked={save.reglages.interlettrageRenforce}
            onChange={(e) =>
              dispatch({ type: 'reglages', reglages: { interlettrageRenforce: e.target.checked } })
            }
          />
          lettres espacées
        </label>
      </div>
    </div>
  )
}
