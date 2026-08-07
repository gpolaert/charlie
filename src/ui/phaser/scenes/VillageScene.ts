// Le village d'Aït-Soleil : sol, décor, PNJ, Charlie, interactions.
import Phaser from 'phaser'
import type { Save } from '../../../game/types'
import { ANE, CHANTIER, DIALOGUES, FRAMES, HAUTEUR, LARGEUR, PLACE, PNJS, STRUCTURES, TUILE, ZONES } from '../cartes/aitSoleil'
import { pont } from '../pont'

// Indices dans TilesetFloor (22 colonnes) — vérifiés sur debug-atlas.html (zoom).
const COLS_FLOOR = 22
const idx = (col: number, row: number) => row * COLS_FLOOR + col
/** Détails rares sur fond sable — uniquement ceux dont le fond raccorde (#ffcb8d). */
const SABLE_DETAILS = [idx(0, 4), idx(1, 4)]
/** Couleurs échantillonnées dans TilesetFloor. */
const COULEUR_SABLE = 0xffcb8d
const COULEUR_PLACE = 0xfce2ca
const COULEUR_SABLE_FONCE = 0xffad5d
/** « Flaque » de sable foncé : le blob autotile complet (cols 0-2, rows 0-3). */
const FLAQUE: number[][] = [0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => idx(c, r))).map((l) => l)

const VITESSE = 90

export class VillageScene extends Phaser.Scene {
  private joueur!: Phaser.Physics.Arcade.Sprite
  private curseurs!: Phaser.Types.Input.Keyboard.CursorKeys
  private wasd!: Record<'up' | 'down' | 'left' | 'right', Phaser.Input.Keyboard.Key>
  private toucheAction!: Phaser.Input.Keyboard.Key
  private cible: Phaser.Math.Vector2 | null = null
  private picto!: Phaser.GameObjects.Container
  private actionProche: (() => void) | null = null
  private blocage = 0
  private chantierGroupe: Phaser.GameObjects.GameObject[] = []
  private etapeAffichee = -1
  private skinActuel = ''
  private dirJoueur = 0

  constructor() {
    super('village')
  }

  private save(): Save {
    return this.registry.get('save') as Save
  }

  create() {
    const largeurPx = LARGEUR * TUILE
    const hauteurPx = HAUTEUR * TUILE

    // --- sol : aplat calme + détails épars (pas de tapis de motifs) ---
    const fond = this.add.graphics().setDepth(-2)
    fond.fillStyle(COULEUR_SABLE, 1)
    fond.fillRect(0, 0, largeurPx, hauteurPx)
    // La place du village : rosé pâle, coins arrondis, fin liseré.
    fond.fillStyle(COULEUR_PLACE, 1)
    fond.fillRoundedRect(PLACE.tx * TUILE, PLACE.ty * TUILE, PLACE.l * TUILE, PLACE.h * TUILE, 10)
    fond.lineStyle(1.5, COULEUR_SABLE_FONCE, 0.8)
    fond.strokeRoundedRect(PLACE.tx * TUILE, PLACE.ty * TUILE, PLACE.l * TUILE, PLACE.h * TUILE, 10)

    const carte = this.make.tilemap({ width: LARGEUR, height: HAUTEUR, tileWidth: TUILE, tileHeight: TUILE })
    const tuiles = carte.addTilesetImage('floor', 'floor', TUILE, TUILE)!
    const sol = carte.createBlankLayer('sol', tuiles)!
    sol.setDepth(-1)
    const hasard = <T,>(t: T[]) => t[Math.floor(Math.random() * t.length)]
    const surPlace = (x: number, y: number) =>
      x >= PLACE.tx && x < PLACE.tx + PLACE.l && y >= PLACE.ty && y < PLACE.ty + PLACE.h
    for (let y = 0; y < HAUTEUR; y++) {
      for (let x = 0; x < LARGEUR; x++) {
        if (!surPlace(x, y) && Math.random() < 0.035) {
          sol.putTileAt(hasard(SABLE_DETAILS), x, y)
        }
      }
    }
    // Sur la place : discrets pointillés dessinés (pas de tuiles, fond lisse).
    fond.fillStyle(COULEUR_SABLE_FONCE, 0.25)
    for (let i = 0; i < 14; i++) {
      const px = (PLACE.tx + 1 + Math.random() * (PLACE.l - 2)) * TUILE
      const py = (PLACE.ty + 1 + Math.random() * (PLACE.h - 2)) * TUILE
      fond.fillCircle(px, py, 1.2)
    }
    // Trois flaques de sable foncé (le blob autotile posé entier), loin de la place.
    for (const [fx, fy] of [
      [4, 6],
      [26, 10],
      [9, 20],
    ]) {
      FLAQUE.forEach((ligne, dy) =>
        ligne.forEach((t, dx) => {
          if (!surPlace(fx + dx, fy + dy)) sol.putTileAt(t, fx + dx, fy + dy)
        }),
      )
    }

    // --- décor ---
    const obstacles = this.physics.add.staticGroup()
    for (const s of STRUCTURES) {
      const def = FRAMES[s.frame]
      const [, , , h] = def.r
      const img = this.add.image(s.tx * TUILE, s.ty * TUILE, def.tex, s.frame).setOrigin(0, 0)
      img.setDepth(s.ty * TUILE + h)
      if (s.bloque) {
        const [dx, dy, l, hh] = s.bloque
        const rect = this.add.rectangle(
          (s.tx + dx) * TUILE + (l * TUILE) / 2,
          (s.ty + dy) * TUILE + (hh * TUILE) / 2,
          l * TUILE,
          hh * TUILE,
        )
        rect.setVisible(false)
        obstacles.add(rect)
      }
    }

    // --- chantier du puits (rendu selon l'étape, mis à jour en continu) ---
    // (voir majChantier)

    // --- PNJ ---
    for (const p of PNJS) {
      const spr = this.add.sprite(p.tx * TUILE + 8, p.ty * TUILE + 8, `${p.perso}.idle`, p.regard)
      spr.setDepth(spr.y)
      const rect = this.add.rectangle(spr.x, spr.y + 4, 14, 10)
      rect.setVisible(false)
      obstacles.add(rect)
    }
    const ane = this.add.sprite(ANE.tx * TUILE + 8, ANE.ty * TUILE + 8, 'donkey', 0)
    ane.play('donkey.idle')
    ane.setDepth(ane.y)

    // --- Charlie ---
    const spawn = { x: (CHANTIER.tx + 1) * TUILE, y: (CHANTIER.ty + 5) * TUILE }
    this.joueur = this.physics.add.sprite(spawn.x, spawn.y, `${this.skin()}.idle`, 0)
    this.skinActuel = this.skin()
    const corps = this.joueur.body as Phaser.Physics.Arcade.Body
    corps.setSize(10, 8)
    corps.setOffset(3, 8)
    this.joueur.setCollideWorldBounds(true)
    this.physics.add.collider(this.joueur, obstacles)

    this.physics.world.setBounds(0, 0, largeurPx, hauteurPx)
    this.cameras.main.setBounds(0, 0, largeurPx, hauteurPx)
    this.cameras.main.startFollow(this.joueur, true, 0.15, 0.15)
    this.cameras.main.setZoom(3)
    this.cameras.main.setBackgroundColor('#e8c98a')

    // --- entrées ---
    const clavier = this.input.keyboard!
    this.curseurs = clavier.createCursorKeys()
    this.wasd = {
      up: clavier.addKey('W'),
      down: clavier.addKey('S'),
      left: clavier.addKey('A'),
      right: clavier.addKey('D'),
    }
    this.toucheAction = clavier.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    clavier.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).on('down', () => this.declencherAction())
    this.toucheAction.on('down', () => this.declencherAction())
    this.input.on('pointerdown', (p: Phaser.Input.Pointer) => {
      const monde = this.cameras.main.getWorldPoint(p.x, p.y)
      // Un clic sur le picto/la cible d'action la déclenche ; sinon on marche.
      if (
        this.actionProche &&
        this.picto.visible &&
        Phaser.Math.Distance.Between(monde.x, monde.y, this.picto.x, this.picto.y + 16) < 26
      ) {
        this.declencherAction()
      } else {
        this.cible = new Phaser.Math.Vector2(monde.x, monde.y)
      }
    })

    // --- picto d'interaction : bulle blanche « ! », style BD ---
    const bulle = this.add.graphics()
    bulle.fillStyle(0xffffff, 1)
    bulle.lineStyle(1.2, 0x4a3728, 1)
    bulle.fillCircle(0, 0, 7)
    bulle.strokeCircle(0, 0, 7)
    bulle.fillTriangle(-3, 5, 3, 5, 0, 10)
    const excl = this.add.text(0, 0.5, '!', {
      fontFamily: 'Arial Black, sans-serif',
      fontSize: '11px',
      color: '#c96f4a',
    })
    excl.setOrigin(0.5, 0.55)
    this.picto = this.add.container(0, 0, [bulle, excl]).setVisible(false).setDepth(100000)
    this.tweens.add({ targets: this.picto, scaleX: 1.15, scaleY: 1.15, duration: 450, yoyo: true, repeat: -1 })

    this.majChantier()
    this.registry.events.on('changedata-save', () => {
      this.majChantier()
      this.majSkin()
    })
  }

  private skin(): string {
    // Le foulard offert par le village transforme Charlie en petit ninja bleu.
    return this.save()?.equipement.couvrechef === 'foulard' ? 'NinjaBlue' : 'Boy'
  }

  private majSkin() {
    const skin = this.skin()
    if (skin !== this.skinActuel) {
      this.skinActuel = skin
      this.joueur.setTexture(`${skin}.idle`, this.dirJoueur)
    }
  }

  /** Rendu du chantier selon save.chantiers.aitSoleil (0 → 4). */
  private majChantier() {
    const etape = Math.min(this.save()?.chantiers.aitSoleil ?? 0, 4)
    if (etape === this.etapeAffichee) return
    this.etapeAffichee = etape
    for (const o of this.chantierGroupe) o.destroy()
    this.chantierGroupe = []

    const cx = CHANTIER.tx * TUILE + 16
    const cy = CHANTIER.ty * TUILE + 16
    const ajouter = (o: Phaser.GameObjects.GameObject) => this.chantierGroupe.push(o)

    if (etape === 0) {
      const g = this.add.graphics().setDepth(cy)
      g.lineStyle(1.5, 0x8a5a3b, 1)
      g.strokeCircle(cx, cy + 6, 14)
      g.lineStyle(1, 0xc96f4a, 1)
      g.strokeCircle(cx, cy + 6, 18)
      ajouter(g)
    }
    if (etape >= 1) {
      const puits = this.add.image(cx, cy, 'desert', 'puitsDesert').setOrigin(0.5, 0.6)
      puits.setDepth(cy + 16)
      if (etape === 1) puits.setAlpha(0.65)
      ajouter(puits)
      if (etape < 4) {
        const g = this.add.graphics().setDepth(cy + 40)
        g.lineStyle(2, 0x8a5a3b, 1)
        g.lineBetween(cx - 22, cy + 14, cx - 22, cy - 24)
        g.lineBetween(cx + 22, cy + 14, cx + 22, cy - 24)
        g.lineBetween(cx - 22, cy - 20, cx + 22, cy - 20)
        ajouter(g)
      }
    }
    if (etape >= 3) {
      const bassin = this.add.image(cx + 32, cy + 12, 'desert', 'fontaineCarree').setOrigin(0.5, 0.7)
      bassin.setDepth(cy + 18)
      ajouter(bassin)
    }
    if (etape >= 4) {
      // L'eau coule : petites gouttes animées + fanions de fête.
      for (let i = 0; i < 3; i++) {
        const goutte = this.add.circle(cx + 6 + i * 4, cy - 4, 1.5, 0x5a9bb5).setDepth(cy + 50)
        this.tweens.add({
          targets: goutte,
          y: cy + 10,
          alpha: 0.2,
          duration: 700,
          delay: i * 220,
          repeat: -1,
        })
        ajouter(goutte)
      }
      const g = this.add.graphics().setDepth(100000)
      const couleurs = [0xc9564a, 0xe9b44c, 0x7ba05b, 0x5a9bb5]
      g.lineStyle(1, 0x4a3728, 1)
      g.lineBetween(cx - 40, cy - 40, cx + 40, cy - 46)
      for (let i = 0; i < 5; i++) {
        const fx = cx - 36 + i * 18
        const fy = cy - 41 - i * 1.2
        g.fillStyle(couleurs[i % 4], 1)
        g.fillTriangle(fx, fy, fx + 8, fy + 2, fx + 1, fy + 8)
      }
      ajouter(g)
    }
  }

  private declencherAction() {
    this.actionProche?.()
  }

  update() {
    if (!this.joueur) return
    const corps = this.joueur.body as Phaser.Physics.Arcade.Body

    // --- déplacement clavier ---
    let vx = 0
    let vy = 0
    if (this.curseurs.left.isDown || this.wasd.left.isDown) vx = -VITESSE
    else if (this.curseurs.right.isDown || this.wasd.right.isDown) vx = VITESSE
    if (this.curseurs.up.isDown || this.wasd.up.isDown) vy = -VITESSE
    else if (this.curseurs.down.isDown || this.wasd.down.isDown) vy = VITESSE

    if (vx !== 0 || vy !== 0) this.cible = null

    // --- tap-to-move : axe X puis axe Y ; on glisse le long des obstacles,
    // et on abandonne si on reste bloqué un petit moment.
    if (this.cible) {
      const dx = this.cible.x - this.joueur.x
      const dy = this.cible.y - this.joueur.y
      if (Math.abs(dx) > 3) vx = Math.sign(dx) * VITESSE
      else if (Math.abs(dy) > 3) vy = Math.sign(dy) * VITESSE
      else this.cible = null
      if (this.cible && corps.speed < 5 && (vx !== 0 || vy !== 0)) {
        this.blocage++
        if (this.blocage > 18) {
          this.cible = null
          this.blocage = 0
        }
      } else {
        this.blocage = 0
      }
    }

    corps.setVelocity(vx, vy)
    if (vx !== 0 && vy !== 0) corps.velocity.normalize().scale(VITESSE)

    // --- animation ---
    const skin = this.skinActuel
    if (vx < 0) this.dirJoueur = 2
    else if (vx > 0) this.dirJoueur = 3
    else if (vy < 0) this.dirJoueur = 1
    else if (vy > 0) this.dirJoueur = 0
    if (vx !== 0 || vy !== 0) {
      this.joueur.anims.play(`${skin}.walk.${this.dirJoueur}`, true)
    } else {
      this.joueur.anims.stop()
      this.joueur.setTexture(`${skin}.idle`, this.dirJoueur)
    }
    this.joueur.setDepth(this.joueur.y)

    // --- interactions à proximité : les zones (chantier, échoppe) priment,
    // les PNJ ne répondent que si on n'est pas dans une zone.
    this.actionProche = null
    let pictoXY: { x: number; y: number } | null = null

    for (const z of ZONES) {
      const rect = new Phaser.Geom.Rectangle(z.tx * TUILE, z.ty * TUILE, z.l * TUILE, z.h * TUILE)
      if (rect.contains(this.joueur.x, this.joueur.y)) {
        pictoXY = { x: rect.centerX, y: rect.top - 6 }
        this.actionProche = () =>
          pont.emettre(z.type === 'chantier' ? { type: 'ouvrirMission' } : { type: 'ouvrirBazar' })
        break
      }
    }
    if (!this.actionProche) {
      for (const p of PNJS) {
        const px = p.tx * TUILE + 8
        const py = p.ty * TUILE + 8
        if (Phaser.Math.Distance.Between(px, py, this.joueur.x, this.joueur.y) < 32) {
          pictoXY = { x: px, y: py - 16 }
          this.actionProche = () => pont.emettre({ type: 'dialogue', pnjId: p.id })
          break
        }
      }
    }

    if (pictoXY) {
      if (!this.picto.visible || Math.abs(this.picto.x - pictoXY.x) > 24) {
        this.picto.setPosition(pictoXY.x, pictoXY.y)
      }
      this.picto.setVisible(true)
    } else {
      this.picto.setVisible(false)
    }
  }
}

/** Vérifie l'existence des dialogues au chargement du module (erreur tôt et claire). */
for (const p of PNJS) {
  if (p.id !== 'hana' && !DIALOGUES[p.id]) throw new Error(`dialogue manquant: ${p.id}`)
}
