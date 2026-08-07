// « Le vol d'essai » — calibrage par famille, sans chrono, sans évaluation visible.
// Pixel note tout, l'enfant ne voit jamais juste/faux : chaque réponse « règle un instrument ».
import { useMemo, useState } from 'react'
import { enQcm } from '../../content/math/calculEclair'
import { genererItem } from '../../content/generateur'
import { INTRO_VOL_ESSAI } from '../../content/story/chapitre1'
import { appliquerResultat, etatInitial, FAMILLES, paliersFinaux, tousFinis } from '../../game/placement'
import type { EtatFamille } from '../../game/placement'
import type { Item, Palier } from '../../game/types'
import { useJeu } from '../store-react'
import { Pixel } from '../illustrations/Pixel'
import { ChoiceItem } from '../items/ChoiceItem'
import { NumpadItem } from '../items/NumpadItem'
import { WidgetItem } from '../items/Widgets'

const SKILL_PAR_FAMILLE: Record<string, Record<Palier, string>> = {
  calcul: { ce1: 'm1.tablesAdd', ce2a: 'm1.tablesMul25', ce2: 'm1.tablesMul' },
  mesures: { ce1: 'm3.sommes', ce2a: 'm3.rendre', ce2: 'm3.virgule' },
  decodage: { ce1: 'l1.sonsSimples', ce2a: 'l1.sonsDurs', ce2: 'l1.lettresContexte' },
  comprehension: { ce1: 'l3.phrase', ce2a: 'l3.paragraphe', ce2: 'l3.inferences' },
}

const INSTRUMENTS: Record<string, string> = {
  calcul: 'le compteur à engrenages',
  mesures: 'la balance de bord',
  decodage: 'la longue-vue à lettres',
  comprehension: 'le carnet de navigation',
}

export function VolEssai({ onFini }: { onFini: () => void }) {
  const { dispatch } = useJeu()
  const rng = Math.random
  const [intro, setIntro] = useState(0)
  const [etats, setEtats] = useState<Record<string, EtatFamille>>(etatInitial)
  const [tour, setTour] = useState(0)
  const [nbReponses, setNbReponses] = useState(0)

  // Famille courante : on tourne parmi celles qui ne sont pas finies.
  const famille = useMemo(() => {
    const restantes = FAMILLES.filter((f) => !etats[f.id].fini)
    if (restantes.length === 0) return null
    return restantes[tour % restantes.length]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etats, tour])

  const item: Item | null = useMemo(() => {
    if (!famille) return null
    const palier = etats[famille.id].palier
    const brut = genererItem(SKILL_PAR_FAMILLE[famille.id][palier], rng)
    // Tout en QCM quand c'est possible : plus léger pour un calibrage.
    return brut.format === 'numpad' ? enQcm(brut, rng) : brut
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [famille, tour])

  if (intro < INTRO_VOL_ESSAI.length) {
    return (
      <div className="mission apparait centre">
        <h2>Le vol d’essai</h2>
        <div className="bulle-pixel" style={{ textAlign: 'left' }}>
          <Pixel />
          <p>{INTRO_VOL_ESSAI[intro]}</p>
        </div>
        <div>
          <button className="btn-action" onClick={() => setIntro((i) => i + 1)} autoFocus>
            {intro === INTRO_VOL_ESSAI.length - 1 ? 'C’est parti !' : 'Suite'}
          </button>
        </div>
      </div>
    )
  }

  if (!famille || !item) return null

  function repondre(valeur: string) {
    if (!famille || !item) return
    const correcte = valeur === item.reponse
    const suivant = { ...etats, [famille.id]: appliquerResultat(etats[famille.id], correcte) }
    setNbReponses((n) => n + 1)
    if (tousFinis(suivant)) {
      dispatch({ type: 'finVolEssai', paliers: paliersFinaux(suivant) })
      onFini()
      return
    }
    setEtats(suivant)
    setTour((t) => t + 1)
  }

  return (
    <div className="mission apparait">
      <div className="bulle-pixel">
        <Pixel />
        <p>
          Pixel règle {INSTRUMENTS[famille.id]}… ({nbReponses + 1})
        </p>
      </div>
      <div className={`enonce ${item.enonce.length > 40 ? 'texte-long' : ''}`}>{item.enonce}</div>
      {item.widget && <WidgetItem widget={item.widget} />}
      {item.format === 'choice' ? (
        <ChoiceItem item={item} envolees={[]} onReponse={repondre} desactive={false} />
      ) : (
        <NumpadItem item={item} onReponse={repondre} desactive={false} />
      )}
    </div>
  )
}
