import { useEffect, useState } from 'react'
import { grade } from './game/economy'
import type { Ecran } from './game/types'
import { useJeu } from './ui/store-react'
import { Accueil } from './ui/screens/Accueil'
import { Bazar } from './ui/screens/Bazar'
import { CarteMonde } from './ui/screens/CarteMonde'
import { Chantier } from './ui/screens/Chantier'
import { Mission } from './ui/screens/Mission'
import { VolEssai } from './ui/screens/VolEssai'

export function App() {
  const { save, dispatch } = useJeu()
  const [ecran, setEcran] = useState<Ecran>({ nom: 'accueil' })

  // Nouvelle session de jeu à chaque ouverture (compteur des 2-3 missions).
  useEffect(() => {
    dispatch({ type: 'nouvelleSession' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const classes = [
    save.reglages.animationsReduites ? 'animations-reduites' : '',
    save.reglages.interlettrageRenforce ? 'interlettrage-renforce' : '',
  ].join(' ')

  const g = grade(save.xp)

  return (
    <div className={`app ${classes}`}>
      {ecran.nom !== 'accueil' && ecran.nom !== 'mission' && ecran.nom !== 'volEssai' && (
        <div className="topbar">
          <span className="titre">Charlie, inventeur du monde</span>
          <span className="pastille">⚙️ {save.pieces}</span>
          <span className="pastille">⭐ {g.nom}</span>
        </div>
      )}

      {ecran.nom === 'accueil' && (
        <Accueil
          onCommencer={() => setEcran(save.volEssaiFait ? { nom: 'carteMonde' } : { nom: 'volEssai' })}
        />
      )}
      {ecran.nom === 'volEssai' && <VolEssai onFini={() => setEcran({ nom: 'carteMonde' })} />}
      {ecran.nom === 'carteMonde' && (
        <CarteMonde
          onVillage={(v) => setEcran({ nom: 'chantier', village: v })}
          onBazar={() => setEcran({ nom: 'bazar' })}
        />
      )}
      {ecran.nom === 'chantier' && (
        <Chantier
          village={ecran.village}
          onMission={() => setEcran({ nom: 'mission', village: ecran.village })}
          onRetour={() => setEcran({ nom: 'carteMonde' })}
        />
      )}
      {ecran.nom === 'mission' && (
        <Mission
          village={ecran.village}
          onFin={() => setEcran(ecran.village ? { nom: 'chantier', village: ecran.village } : { nom: 'carteMonde' })}
          onQuitter={() => setEcran(ecran.village ? { nom: 'chantier', village: ecran.village } : { nom: 'carteMonde' })}
        />
      )}
      {ecran.nom === 'bazar' && <Bazar onRetour={() => setEcran({ nom: 'carteMonde' })} />}
    </div>
  )
}
