// Vue du village d'Aït-Soleil : progression du puits, scènes mentor et cadeaux.
import { useState } from 'react'
import { mentorDuVillage } from '../../content/mentors'
import { villageParId } from '../../content/story/chapitre1'
import type { VillageId } from '../../game/types'
import { useJeu } from '../store-react'
import { ChantierPuits } from '../illustrations/ChantierPuits'
import { MentorHana } from '../illustrations/MentorHana'
import { Pixel } from '../illustrations/Pixel'

interface Props {
  village: VillageId
  onMission: () => void
  onRetour: () => void
}

export function Chantier({ village, onMission, onRetour }: Props) {
  const { save, dispatch } = useJeu()
  const v = villageParId(village)
  const mentor = mentorDuVillage(village)
  const etape = Math.min(save.chantiers[village], v.etapes.length)
  const fini = etape >= v.etapes.length

  const mentorAApprendre = etape > v.etapeMentor && !save.techniques[mentor.technique]
  const cadeauxARecevoir = fini && v.cadeaux.some((c) => !save.objets.includes(c.id))
  const [sceneMentor, setSceneMentor] = useState(mentorAApprendre)
  const [etapeSceneMentor, setEtapeSceneMentor] = useState(0)

  if (sceneMentor) {
    const repliques = [mentor.repliqueRencontre, mentor.explication, mentor.repliqueBravo]
    return (
      <div className="mission apparait centre">
        <div className="flotte" style={{ display: 'inline-block' }}>
          <MentorHana taille={170} />
        </div>
        <h2>{mentor.nom}</h2>
        <div className="bulle-pixel" style={{ textAlign: 'left' }}>
          <Pixel />
          <p>{repliques[etapeSceneMentor]}</p>
        </div>
        <div>
          <button
            className="btn-action"
            autoFocus
            onClick={() => {
              if (etapeSceneMentor < repliques.length - 1) {
                setEtapeSceneMentor((e) => e + 1)
                if (etapeSceneMentor === repliques.length - 2) {
                  dispatch({ type: 'technique', technique: mentor.technique })
                }
              } else {
                setSceneMentor(false)
              }
            }}
          >
            {etapeSceneMentor < repliques.length - 1 ? 'Suite' : `J’ai appris : ${mentor.nomTechnique} !`}
          </button>
        </div>
      </div>
    )
  }

  if (cadeauxARecevoir) {
    return (
      <div className="mission apparait centre">
        <ChantierPuits etape={4} anime={!save.reglages.animationsReduites} />
        <h2>🎉 {v.nom} te remercie !</h2>
        <div className="panneau">
          {v.cadeaux.map((c) => (
            <p key={c.id} style={{ margin: '4px 0' }}>
              🎁 {c.nom}
            </p>
          ))}
          <p style={{ margin: '4px 0' }}>🗺️ Carte du carnet : {v.carteCulture.titre}</p>
        </div>
        <div>
          <button
            className="btn-action"
            autoFocus
            onClick={() => {
              for (const c of v.cadeaux) dispatch({ type: 'cadeau', objetId: c.id })
              dispatch({ type: 'carteCulture', carteId: v.carteCulture.id })
            }}
          >
            Merci !
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mission apparait">
      <div className="ligne" style={{ justifyContent: 'space-between' }}>
        <button className="btn-discret" onClick={onRetour}>
          ← Carte
        </button>
        <h2 style={{ margin: 0 }}>
          {v.nom} — {v.chantier}
        </h2>
        <span style={{ width: 70 }} />
      </div>

      <ChantierPuits etape={etape} anime={!save.reglages.animationsReduites} />

      {fini ? (
        <div className="bulle-pixel">
          <Pixel />
          <p>L’eau coule à {v.nom} ! Tu peux rejouer une mission pour t’entrainer.</p>
        </div>
      ) : (
        <>
          <div className="bulle-pixel">
            <Pixel />
            <p>
              {etape === 0 ? v.probleme : ''} {v.etapes[etape].avant}
            </p>
          </div>
          <p className="centre" style={{ margin: 0, color: 'var(--brume)', fontSize: 18 }}>
            Étape {etape + 1} sur {v.etapes.length} : {v.etapes[etape].nom}
          </p>
        </>
      )}

      <div className="ligne">
        <button className="btn-action" onClick={onMission} autoFocus>
          🔧 {fini ? 'Mission d’entrainement' : 'Construire !'}
        </button>
      </div>
    </div>
  )
}
