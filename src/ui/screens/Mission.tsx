// Le moteur de mission : une seule question à l'écran, zéro chrono visible,
// erreurs sans sanction, techniques des mentors, réinsertion des items ratés.
import { useMemo, useRef, useState } from 'react'
import { genererItem } from '../../content/generateur'
import { choisirDomaine, reinserer, skillsDeMission, TAILLE_MISSION } from '../../game/session'
import { villageParId, PIXEL_BRAVO, PIXEL_ERREUR, PIXEL_FIN_SESSION } from '../../content/story/chapitre1'
import { mentorDuVillage } from '../../content/mentors'
import { PIECES_PAR_BONNE_REPONSE, USAGES_TECHNIQUE_PAR_MISSION, xpMission } from '../../game/economy'
import type { Item, VillageId } from '../../game/types'
import { useJeu } from '../store-react'
import { sonBravo } from '../audio'
import { Pixel } from '../illustrations/Pixel'
import { ChoiceItem } from '../items/ChoiceItem'
import { NumpadItem } from '../items/NumpadItem'
import { WidgetItem } from '../items/Widgets'

interface Props {
  village: VillageId | null
  onFin: () => void
  onQuitter: () => void
}

type Phase = { nom: 'question' } | { nom: 'bravo' } | { nom: 'aide' } | { nom: 'fin' }

export function Mission({ village, onFin, onQuitter }: Props) {
  const { save, dispatch } = useJeu()
  const rng = Math.random

  const [suite, setSuite] = useState<string[]>(() => {
    const domaines = village ? villageParId(village).domaines : (['m1', 'l1'] as const)
    const domaine = choisirDomaine(save, rng, [...domaines])
    return skillsDeMission(save, domaine, rng)
  })
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>({ nom: 'question' })
  const [bonnes, setBonnes] = useState(0)
  const [envolees, setEnvolees] = useState<number[]>([])
  const [usages, setUsages] = useState(USAGES_TECHNIQUE_PAR_MISSION)
  const [messagePixel, setMessagePixel] = useState('')
  const debutItem = useRef(performance.now())
  const finEnvoyee = useRef(false)

  const item: Item | null = useMemo(() => {
    if (index >= suite.length) return null
    debutItem.current = performance.now()
    return genererItem(suite[index], rng)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suite, index])

  const mentor = village ? mentorDuVillage(village) : null
  const technique5050 =
    save.techniques.coupDePiedDeFer &&
    phase.nom === 'question' &&
    item?.format === 'choice' &&
    (item.options?.length ?? 0) - envolees.length > 2 &&
    usages > 0

  function repondre(valeur: string) {
    if (!item || phase.nom !== 'question') return
    const ms = Math.round(performance.now() - debutItem.current)
    const correcte = valeur === item.reponse
    dispatch({ type: 'reponse', reponse: { skillId: item.skillId, correcte, ms } })
    if (correcte) {
      setBonnes((b) => b + 1)
      setMessagePixel(PIXEL_BRAVO[Math.floor(rng() * PIXEL_BRAVO.length)])
      sonBravo()
      setPhase({ nom: 'bravo' })
    } else {
      setMessagePixel(PIXEL_ERREUR[Math.floor(rng() * PIXEL_ERREUR.length)])
      // L'item raté revient un peu plus tard (bornage pour éviter une mission sans fin).
      if (suite.length < TAILLE_MISSION + 4) setSuite((s) => reinserer(s, index))
      setPhase({ nom: 'aide' })
    }
  }

  function continuer() {
    setEnvolees([])
    if (index + 1 >= suite.length) {
      if (!finEnvoyee.current) {
        finEnvoyee.current = true
        dispatch({ type: 'finMission', bonnes, total: suite.length, village })
      }
      setPhase({ nom: 'fin' })
    } else {
      setIndex((i) => i + 1)
      setPhase({ nom: 'question' })
    }
  }

  function coupDePied() {
    if (!item?.options) return
    const candidats = item.options
      .map((o, i) => ({ o, i }))
      .filter(({ o, i }) => o !== item.reponse && !envolees.includes(i))
    if (candidats.length === 0) return
    const cible = candidats[Math.floor(rng() * candidats.length)]
    setEnvolees((e) => [...e, cible.i])
    setUsages((u) => u - 1)
  }

  if (phase.nom === 'fin') {
    const total = suite.length
    const troisieme = save.missionsSession >= 3
    return (
      <div className="mission apparait centre">
        <div className="panneau celebration">
          <h2>Plan de construction terminé !</h2>
          <p>
            {bonnes} pièce{bonnes > 1 ? 's' : ''} usinée{bonnes > 1 ? 's' : ''} sur {total}.
          </p>
          <p>
            ⚙️ +{bonnes * PIECES_PAR_BONNE_REPONSE} pièces &nbsp;·&nbsp; ⭐ +{xpMission(bonnes, total)} XP
          </p>
        </div>
        <div className="bulle-pixel">
          <Pixel />
          <p>{troisieme ? PIXEL_FIN_SESSION : 'Beau travail ! Le chantier avance.'}</p>
        </div>
        <div className="ligne">
          <button className="btn-action" onClick={onFin}>
            Voir le chantier
          </button>
        </div>
      </div>
    )
  }

  if (!item) return null

  const points = suite.map((_, i) => (i < index ? '●' : i === index ? '◉' : '○')).join(' ')

  return (
    <div className="mission apparait">
      <div className="ligne" style={{ justifyContent: 'space-between' }}>
        <button className="btn-discret" onClick={onQuitter} aria-label="Faire une pause">
          ⏸ Pause
        </button>
        <div className="points-progression" aria-label={`Question ${index + 1}`}>
          {points}
        </div>
        <span style={{ width: 90 }} />
      </div>

      <div className="bulle-pixel">
        <Pixel />
        <p>{phase.nom === 'question' ? item.consigne : messagePixel}</p>
      </div>

      <div className={`enonce ${item.enonce.length > 40 ? 'texte-long' : ''}`}>{item.enonce}</div>
      {item.widget && <WidgetItem widget={item.widget} />}

      {phase.nom === 'question' && (
        <>
          {item.format === 'choice' && (
            <ChoiceItem item={item} envolees={envolees} onReponse={repondre} desactive={false} />
          )}
          {item.format === 'numpad' && <NumpadItem item={item} onReponse={repondre} desactive={false} />}
          <div className="barre-technique">
            {technique5050 && mentor && (
              <button className="btn-doux btn-discret" onClick={coupDePied}>
                🦵 {mentor.nomTechnique} ({usages})
              </button>
            )}
          </div>
        </>
      )}

      {phase.nom === 'bravo' && (
        <div className="apparait centre">
          <p className="feedback-bon celebration">{messagePixel}</p>
          <button className="btn-action" onClick={continuer} autoFocus>
            Continuer
          </button>
        </div>
      )}

      {phase.nom === 'aide' && (
        <div className="apparait">
          <div className="feedback-aide">
            <p style={{ margin: 0 }}>{item.aide}</p>
            <p style={{ margin: '8px 0 0', fontWeight: 700 }}>
              La bonne réponse : {item.reponse}
            </p>
          </div>
          <div className="centre" style={{ marginTop: 12 }}>
            <button className="btn-action" onClick={continuer} autoFocus>
              J’ai compris
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
