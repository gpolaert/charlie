// Pixel, le robot-boussole. Petit, rond, sympathique.
export function Pixel({ taille = 56 }: { taille?: number }) {
  return (
    <svg viewBox="0 0 80 80" width={taille} height={taille} role="img" aria-label="Pixel">
      <g stroke="#4a3728" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        {/* antenne */}
        <line x1={40} y1={12} x2={40} y2={4} />
        <circle cx={40} cy={4} r={3} fill="#e9b44c" />
        {/* corps rond */}
        <circle cx={40} cy={44} r={30} fill="#9db8c9" />
        <circle cx={40} cy={44} r={22} fill="#eef4f7" />
        {/* visage-boussole */}
        <circle cx={33} cy={40} r={4} fill="#4a3728" stroke="none" />
        <circle cx={47} cy={40} r={4} fill="#4a3728" stroke="none" />
        <circle cx={34.5} cy={38.5} r={1.3} fill="#fff" stroke="none" />
        <circle cx={48.5} cy={38.5} r={1.3} fill="#fff" stroke="none" />
        <path d="M33 52 Q 40 57 47 52" fill="none" />
        {/* aiguille de boussole sur le ventre */}
        <path d="M40 60 l 3 6 l -3 -2 l -3 2 Z" fill="#c96f4a" stroke="none" />
        {/* petites pattes */}
        <circle cx={22} cy={70} r={5} fill="#9db8c9" />
        <circle cx={58} cy={70} r={5} fill="#9db8c9" />
      </g>
    </svg>
  )
}
