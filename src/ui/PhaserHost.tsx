// Monte l'unique instance Phaser et la synchronise avec le save React.
import { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import type { Save } from '../game/types'
import { PreloadScene } from './phaser/scenes/PreloadScene'
import { VillageScene } from './phaser/scenes/VillageScene'

interface Props {
  save: Save
  /** un overlay React est ouvert → le monde se fige */
  fige: boolean
}

export function PhaserHost({ save, fige }: Props) {
  const conteneur = useRef<HTMLDivElement>(null)
  const jeu = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (!conteneur.current || jeu.current) return
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: conteneur.current,
      width: 880,
      height: 560,
      pixelArt: true,
      backgroundColor: '#e8c98a',
      physics: { default: 'arcade' },
      // En dev, la boucle tourne même onglet caché (tests automatisés).
      // En prod, Phaser se met en pause quand l'onglet est caché : souhaitable.
      fps: import.meta.env.DEV ? { forceSetTimeOut: true, target: 60 } : undefined,
      scene: [PreloadScene, VillageScene],
    })
    game.registry.set('save', save)
    jeu.current = game
    // Accès debug en dev (inspection de la scène depuis la console).
    ;(globalThis as Record<string, unknown>).__jeu = game
    return () => {
      game.destroy(true)
      jeu.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    jeu.current?.registry.set('save', save)
  }, [save])

  useEffect(() => {
    const game = jeu.current
    if (!game) return
    const scene = game.scene.getScene('village')
    if (!scene) return
    if (fige && game.scene.isActive('village')) game.scene.pause('village')
    if (!fige && game.scene.isPaused('village')) game.scene.resume('village')
  }, [fige])

  return <div ref={conteneur} className="monde-canvas" />
}
