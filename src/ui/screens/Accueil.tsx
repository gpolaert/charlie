// Accueil : titre + l'histoire de Bellerive en quelques planches.
import { useState } from 'react'
import { INTRO_JEU } from '../../content/story/chapitre1'
import { useJeu } from '../store-react'
import { Personnage } from '../Personnage'
import { Pixel } from '../illustrations/Pixel'

export function Accueil({ onCommencer }: { onCommencer: () => void }) {
  const { save } = useJeu()
  const [planche, setPlanche] = useState(save.volEssaiFait ? INTRO_JEU.length : 0)
  const finIntro = planche >= INTRO_JEU.length

  return (
    <div className="mission apparait centre">
      <h1 style={{ margin: '10px 0 0' }}>Charlie, inventeur du monde</h1>
      <p style={{ margin: 0, color: 'var(--brume)' }}>Chapitre 1 — Le grand départ</p>
      <div className="ligne">
        <div className="flotte">
          <Personnage equipement={save.equipement} taille={130} />
        </div>
        <Pixel taille={70} />
      </div>

      {!finIntro ? (
        <>
          <div className="panneau" style={{ maxWidth: 520, margin: '0 auto' }}>
            <p style={{ margin: 0 }}>{INTRO_JEU[planche]}</p>
          </div>
          <div>
            <button className="btn-action" onClick={() => setPlanche((p) => p + 1)} autoFocus>
              Suite
            </button>
          </div>
        </>
      ) : (
        <div>
          <button className="btn-action" onClick={onCommencer} autoFocus>
            {save.volEssaiFait ? '▶ Continuer l’aventure' : '🎈 Décoller !'}
          </button>
        </div>
      )}
    </div>
  )
}
