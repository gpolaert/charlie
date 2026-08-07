// Bulle de dialogue in-world : portrait + phrases courtes, avancée au clic.
// Cas particulier : Hana Atori enseigne sa technique quand le chantier est assez avancé.
import { useMemo, useState } from 'react'
import { DIALOGUES } from '../phaser/cartes/aitSoleil'
import { mentorDuVillage } from '../../content/mentors'
import { useJeu } from '../store-react'

interface Props {
  pnjId: string
  onFermer: () => void
}

export function Dialogue({ pnjId, onFermer }: Props) {
  const { save, dispatch } = useJeu()
  const mentor = mentorDuVillage('aitSoleil')

  const contenu = useMemo(() => {
    if (pnjId === 'hana') {
      const etape = save.chantiers.aitSoleil
      if (save.techniques[mentor.technique]) {
        return { nom: mentor.nom, perso: 'NinjaRed', lignes: ['Ton coup de pied est déjà solide.', 'Sers-t’en quand tu hésites !'], technique: false }
      }
      if (etape >= 2) {
        return {
          nom: mentor.nom,
          perso: 'NinjaRed',
          lignes: [mentor.repliqueRencontre, mentor.explication, mentor.repliqueBravo],
          technique: true,
        }
      }
      return {
        nom: mentor.nom,
        perso: 'NinjaRed',
        lignes: ['Je m’entraine chaque matin ici.', 'Reviens quand la pompe sera montée.', 'J’aurai un secret pour toi !'],
        technique: false,
      }
    }
    const d = DIALOGUES[pnjId]
    return { nom: d.nom, perso: d.perso, lignes: d.lignes, technique: false }
  }, [pnjId]) // eslint-disable-line react-hooks/exhaustive-deps

  const [ligne, setLigne] = useState(0)
  const derniere = ligne >= contenu.lignes.length - 1

  function suivant() {
    if (derniere) {
      if (contenu.technique) dispatch({ type: 'technique', technique: mentor.technique })
      onFermer()
    } else {
      setLigne((l) => l + 1)
    }
  }

  return (
    <div className="dialogue-bulle apparait" role="dialog" aria-label={`Dialogue avec ${contenu.nom}`}>
      <img
        src={`kits/ninja/persos/${contenu.perso}/Faceset.png`}
        alt=""
        width={57}
        height={57}
        style={{ imageRendering: 'pixelated', borderRadius: 10, border: '2px solid var(--encre)' }}
      />
      <div className="espace">
        <strong>{contenu.nom}</strong>
        <p style={{ margin: '2px 0 0' }}>{contenu.lignes[ligne]}</p>
      </div>
      <button className="btn-action btn-discret" onClick={suivant} autoFocus>
        {derniere ? (contenu.technique ? `✨ J’ai appris !` : 'Merci !') : 'Suite'}
      </button>
    </div>
  )
}
