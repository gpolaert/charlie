// Sons générés (Web Audio) + voix française (speechSynthesis). Aucun fichier audio.

let ctx: AudioContext | null = null
function contexte(): AudioContext | null {
  try {
    ctx ??= new AudioContext()
    return ctx
  } catch {
    return null
  }
}

/** Petit carillon doux de réussite. Jamais de son négatif pour les erreurs. */
export function sonBravo(): void {
  const ac = contexte()
  if (!ac) return
  const notes = [523.25, 659.25, 783.99] // do mi sol
  notes.forEach((f, i) => {
    const o = ac.createOscillator()
    const g = ac.createGain()
    o.type = 'sine'
    o.frequency.value = f
    g.gain.setValueAtTime(0.001, ac.currentTime + i * 0.09)
    g.gain.exponentialRampToValueAtTime(0.12, ac.currentTime + i * 0.09 + 0.02)
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + i * 0.09 + 0.5)
    o.connect(g).connect(ac.destination)
    o.start(ac.currentTime + i * 0.09)
    o.stop(ac.currentTime + i * 0.09 + 0.55)
  })
}

/** Prononce un texte en français (dictée, pouvoir des sons). */
export function parler(texte: string): boolean {
  try {
    const synth = globalThis.speechSynthesis
    if (!synth) return false
    synth.cancel()
    const u = new SpeechSynthesisUtterance(texte)
    u.lang = 'fr-FR'
    u.rate = 0.85
    const voix = synth.getVoices().find((v) => v.lang.startsWith('fr'))
    if (voix) u.voice = voix
    synth.speak(u)
    return true
  } catch {
    return false
  }
}
