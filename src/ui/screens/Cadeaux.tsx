// Fête de fin de chantier : le village offre ses cadeaux + la carte culture.
import { villageParId } from '../../content/story/chapitre1'
import type { VillageId } from '../../game/types'
import { useJeu } from '../store-react'

export function Cadeaux({ village, onFermer }: { village: VillageId; onFermer: () => void }) {
  const { dispatch } = useJeu()
  const v = villageParId(village)
  return (
    <div className="centre apparait">
      <h2>🎉 {v.nom} te remercie !</h2>
      <div className="panneau" style={{ textAlign: 'left' }}>
        {v.cadeaux.map((c) => (
          <p key={c.id} style={{ margin: '4px 0' }}>
            🎁 {c.nom}
          </p>
        ))}
        <p style={{ margin: '4px 0' }}>🗺️ Carte du carnet : {v.carteCulture.titre}</p>
        <p style={{ margin: '10px 0 0', color: 'var(--brume)', fontSize: 18 }}>
          Va voir le bazar pour équiper tes cadeaux !
        </p>
      </div>
      <button
        className="btn-action"
        autoFocus
        style={{ marginTop: 12 }}
        onClick={() => {
          for (const c of v.cadeaux) dispatch({ type: 'cadeau', objetId: c.id })
          dispatch({ type: 'carteCulture', carteId: v.carteCulture.id })
          onFermer()
        }}
      >
        Merci !
      </button>
    </div>
  )
}
