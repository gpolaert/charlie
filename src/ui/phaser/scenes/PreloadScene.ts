// Chargement des assets ninja (CC0, pixel-boy) + découpe des frames de décor.
import Phaser from 'phaser'
import { FRAMES } from '../cartes/aitSoleil'

const PERSOS = ['Boy', 'RobotGrey', 'NinjaRed', 'NinjaBlue', 'Sultan', 'Woman', 'OldMan2', 'Child', 'Villager2']

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('preload')
  }

  preload() {
    const base = 'kits/ninja'
    this.load.spritesheet('floor', `${base}/tilesets/TilesetFloor.png`, {
      frameWidth: 16,
      frameHeight: 16,
    })
    this.load.image('desert', `${base}/tilesets/TilesetDesert.png`)
    this.load.image('house', `${base}/tilesets/TilesetHouse.png`)
    for (const p of PERSOS) {
      this.load.spritesheet(`${p}.walk`, `${base}/persos/${p}/Walk.png`, { frameWidth: 16, frameHeight: 16 })
      this.load.spritesheet(`${p}.idle`, `${base}/persos/${p}/Idle.png`, { frameWidth: 16, frameHeight: 16 })
    }
    this.load.spritesheet('donkey', `${base}/persos/Donkey/SpriteSheet.png`, { frameWidth: 16, frameHeight: 16 })
    this.load.image('emoteExcl', `${base}/ui/emote1.png`)
  }

  create() {
    // Frames de décor découpées dans les tilesets.
    for (const [nom, def] of Object.entries(FRAMES)) {
      const [x, y, l, h] = def.r
      this.textures.get(def.tex).add(nom, 0, x, y, l, h)
    }
    // Animations de marche : colonnes = directions (bas, haut, gauche, droite).
    for (const p of PERSOS) {
      for (let dir = 0; dir < 4; dir++) {
        this.anims.create({
          key: `${p}.walk.${dir}`,
          frames: [0, 1, 2, 3].map((row) => ({ key: `${p}.walk`, frame: row * 4 + dir })),
          frameRate: 8,
          repeat: -1,
        })
      }
    }
    this.anims.create({
      key: 'donkey.idle',
      frames: [{ key: 'donkey', frame: 0 }, { key: 'donkey', frame: 1 }],
      frameRate: 2,
      repeat: -1,
    })
    this.scene.start('village')
  }
}
