import { useEffect, useState } from 'react'
import { grade } from './game/economy'
import { villageParId } from './content/story/chapitre1'
import { useJeu } from './ui/store-react'
import { pont } from './ui/phaser/pont'
import { PhaserHost } from './ui/PhaserHost'
import { Accueil } from './ui/screens/Accueil'
import { Bazar } from './ui/screens/Bazar'
import { Cadeaux } from './ui/screens/Cadeaux'
import { Dialogue } from './ui/screens/Dialogue'
import { Mission } from './ui/screens/Mission'
import { VolEssai } from './ui/screens/VolEssai'

type EcranBase = 'accueil' | 'volEssai' | 'monde'
type Overlay =
  | null
  | { type: 'mission' }
  | { type: 'bazar' }
  | { type: 'dialogue'; pnjId: string }
  | { type: 'cadeaux' }

export function App() {
  const { save, dispatch } = useJeu()
  const [ecran, setEcran] = useState<EcranBase>('accueil')
  const [overlay, setOverlay] = useState<Overlay>(null)

  useEffect(() => {
    dispatch({ type: 'nouvelleSession' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Le monde Phaser demande d'ouvrir un overlay.
  useEffect(() => {
    return pont.abonner((e) => {
      if (e.type === 'ouvrirMission') setOverlay({ type: 'mission' })
      if (e.type === 'ouvrirBazar') setOverlay({ type: 'bazar' })
      if (e.type === 'dialogue') setOverlay({ type: 'dialogue', pnjId: e.pnjId })
    })
  }, [])

  const classes = [
    save.reglages.animationsReduites ? 'animations-reduites' : '',
    save.reglages.interlettrageRenforce ? 'interlettrage-renforce' : '',
  ].join(' ')

  const g = grade(save.xp)

  function fermerMission() {
    const v = villageParId('aitSoleil')
    const fini = save.chantiers.aitSoleil >= v.etapes.length
    const cadeauxEnAttente = fini && v.cadeaux.some((c) => !save.objets.includes(c.id))
    setOverlay(cadeauxEnAttente ? { type: 'cadeaux' } : null)
  }

  if (ecran === 'accueil') {
    return (
      <div className={`app ${classes}`}>
        <Accueil onCommencer={() => setEcran(save.volEssaiFait ? 'monde' : 'volEssai')} />
      </div>
    )
  }

  if (ecran === 'volEssai') {
    return (
      <div className={`app ${classes}`}>
        <VolEssai onFini={() => setEcran('monde')} />
      </div>
    )
  }

  return (
    <div className={`app app-monde ${classes}`}>
      <div className="monde-conteneur">
        <PhaserHost save={save} fige={overlay !== null} />

        <div className="hud-pills">
          <span className="pastille">⚙️ {save.pieces}</span>
          <span className="pastille">⭐ {g.nom}</span>
        </div>
        <div className="hud-aide">Flèches pour bouger · Espace pour agir</div>

        {overlay?.type === 'dialogue' && (
          <Dialogue pnjId={overlay.pnjId} onFermer={() => setOverlay(null)} />
        )}

        {overlay && overlay.type !== 'dialogue' && (
          <div className="overlay-monde">
            <div className="overlay-panneau">
              {overlay.type === 'mission' && (
                <Mission village="aitSoleil" onFin={fermerMission} onQuitter={() => setOverlay(null)} />
              )}
              {overlay.type === 'bazar' && <Bazar onRetour={() => setOverlay(null)} />}
              {overlay.type === 'cadeaux' && (
                <Cadeaux village="aitSoleil" onFermer={() => setOverlay(null)} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
