// Le bazar : achats en pièces, équipement du personnage en direct.
import { BAZAR, grade } from '../../game/economy'
import { villageParId } from '../../content/story/chapitre1'
import type { Slot } from '../../game/types'
import { useJeu } from '../store-react'
import { Personnage } from '../Personnage'

const SLOT_DES_OBJETS: Record<string, Slot> = Object.fromEntries([
  ...BAZAR.filter((a) => a.slot).map((a) => [a.id, a.slot!]),
  ...villageParId('aitSoleil').cadeaux.filter((c) => c.slot).map((c) => [c.id, c.slot as Slot]),
])

const NOMS_OBJETS: Record<string, string> = Object.fromEntries([
  ...BAZAR.map((a) => [a.id, a.nom]),
  ...villageParId('aitSoleil').cadeaux.map((c) => [c.id, c.nom]),
])

export function Bazar({ onRetour }: { onRetour: () => void }) {
  const { save, dispatch } = useJeu()
  const g = grade(save.xp)
  const equipables = save.objets.filter((o) => SLOT_DES_OBJETS[o])

  return (
    <div className="mission apparait">
      <div className="ligne" style={{ justifyContent: 'space-between' }}>
        <button className="btn-discret" onClick={onRetour}>
          ← Carte
        </button>
        <h2 style={{ margin: 0 }}>🧺 Le bazar</h2>
        <span style={{ width: 70 }} />
      </div>

      <div className="ligne" style={{ alignItems: 'flex-start' }}>
        <div className="centre">
          <Personnage equipement={save.equipement} taille={140} />
          <p style={{ margin: 0, fontWeight: 700 }}>{g.nom}</p>
        </div>
        <div className="espace">
          <h3 style={{ margin: '0 0 6px' }}>Mes affaires</h3>
          {equipables.length === 0 && <p style={{ margin: 0 }}>Rien pour l’instant. Aide un village !</p>}
          <div className="ligne" style={{ justifyContent: 'flex-start' }}>
            {equipables.map((o) => {
              const slot = SLOT_DES_OBJETS[o]
              const porte = save.equipement[slot] === o
              return (
                <button
                  key={o}
                  className={porte ? 'btn-action btn-discret' : 'btn-discret'}
                  onClick={() => dispatch({ type: 'equiper', slot, objetId: porte ? null : o })}
                >
                  {porte ? '✓ ' : ''}
                  {NOMS_OBJETS[o] ?? o}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <h3 style={{ margin: '10px 0 4px' }}>À vendre</h3>
      <div className="articles">
        {BAZAR.map((a) => {
          const possede = save.objets.includes(a.id)
          const verrouille = g.index < a.gradeMin
          const tropCher = save.pieces < a.prix
          return (
            <div key={a.id} className="panneau article">
              <span className="nom">{a.nom}</span>
              <span>⚙️ {a.prix} pièces</span>
              <button
                className="btn-doux"
                disabled={possede || verrouille || tropCher}
                onClick={() => dispatch({ type: 'acheter', articleId: a.id })}
              >
                {possede ? '✓ À toi' : verrouille ? `🔒 Grade ${a.gradeMin + 1}` : tropCher ? 'Pas assez de pièces' : 'Acheter'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
