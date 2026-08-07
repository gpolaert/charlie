// Aït-Soleil : le chantier du puits en 4 étapes (0 = rien … 4 = l'eau coule).
// Décor Atlas : trois plans (ciel, montagnes, sol sable), point focal = le puits.
export function ChantierPuits({ etape, anime = true }: { etape: number; anime?: boolean }) {
  return (
    <svg viewBox="0 0 400 220" className="carte-svg" role="img" aria-label={`Chantier du puits, étape ${etape} sur 4`}>
      {/* ciel */}
      <rect x={0} y={0} width={400} height={140} fill="#cfe3ec" />
      <circle cx={330} cy={44} r={22} fill="#e9b44c" stroke="#4a3728" strokeWidth={2} />
      {/* montagnes de l'Atlas */}
      <path d="M0 140 L 60 70 L 120 140 Z" fill="#b39a7c" stroke="#4a3728" strokeWidth={2} />
      <path d="M80 140 L 160 50 L 240 140 Z" fill="#c7ab86" stroke="#4a3728" strokeWidth={2} />
      <path d="M150 62 L 160 50 L 172 64 Q 160 58 150 62 Z" fill="#fff" stroke="none" />
      {/* sol */}
      <rect x={0} y={138} width={400} height={82} fill="#e8c98a" stroke="#4a3728" strokeWidth={2} />

      {/* village : petites maisons en terre */}
      <g stroke="#4a3728" strokeWidth={2}>
        <rect x={20} y={104} width={44} height={36} rx={4} fill="#cf9a68" />
        <rect x={30} y={118} width={12} height={22} rx={3} fill="#8a5a3b" />
        <rect x={300} y={100} width={54} height={40} rx={4} fill="#cf9a68" />
        <rect x={312} y={112} width={12} height={12} rx={3} fill="#f3e8cf" />
        <path d="M300 100 h 54 v -6 h -54 Z" fill="#b07d4f" />
      </g>

      {/* palmier */}
      <g stroke="#4a3728" strokeWidth={2}>
        <path d="M272 140 q 4 -30 -4 -44" fill="none" strokeWidth={5} stroke="#8a5a3b" />
        <path d="M268 96 q -18 -8 -26 2 q 14 0 26 6 M268 96 q 4 -16 16 -18 q -6 10 -8 20 M268 96 q 18 -6 26 4 q -14 -2 -26 4" fill="#7ba05b" />
      </g>

      {/* — le puits, selon l'étape — */}
      <g stroke="#4a3728" strokeWidth={2.5}>
        {etape === 0 && (
          <g>
            {/* marquage au sol */}
            <ellipse cx={190} cy={172} rx={34} ry={12} fill="#d8b878" strokeDasharray="6 5" />
            <line x1={178} y1={166} x2={202} y2={178} strokeDasharray="4 4" />
          </g>
        )}
        {etape >= 1 && (
          <g>
            {/* trou + margelle */}
            <ellipse cx={190} cy={172} rx={34} ry={12} fill="#6b4f36" />
            <path d="M156 172 a 34 12 0 0 0 68 0 l 0 8 a 34 12 0 0 1 -68 0 Z" fill="#b3907a" />
          </g>
        )}
        {etape >= 2 && (
          <g>
            {/* pompe à bras */}
            <rect x={222} y={132} width={10} height={40} rx={4} fill="#5a80a5" />
            <path d="M227 132 q 16 -8 26 4" fill="none" strokeWidth={4} stroke="#5a80a5" />
            <rect x={216} y={124} width={22} height={12} rx={5} fill="#5a80a5" />
          </g>
        )}
        {etape >= 3 && (
          <g>
            {/* bassin */}
            <rect x={112} y={158} width={44} height={20} rx={6} fill="#9db8c9" />
            <rect x={116} y={162} width={36} height={12} rx={4} fill={etape >= 4 ? '#5a9bb5' : '#d8ecf3'} />
          </g>
        )}
        {etape >= 4 && (
          <g>
            {/* l'eau coule + fête */}
            <path d="M250 136 q 10 14 -2 26" fill="none" stroke="#5a9bb5" strokeWidth={4}>
              {anime && <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />}
            </path>
            <g stroke="none" fill="#5a9bb5">
              <circle cx={246} cy={166} r={3} />
              <circle cx={252} cy={172} r={2.5} />
            </g>
            {/* fanions de fête */}
            <path d="M40 60 Q 200 30 360 60" fill="none" strokeWidth={2} />
            {[70, 120, 170, 220, 270, 320].map((x, i) => (
              <path
                key={x}
                d={`M${x} ${48 - (i % 2) * 4} l 12 2 l -10 10 Z`}
                fill={['#c9564a', '#e9b44c', '#7ba05b', '#5a9bb5'][i % 4]}
                stroke="#4a3728"
                strokeWidth={1.5}
              />
            ))}
          </g>
        )}
      </g>

      {/* échafaudage pendant le chantier */}
      {etape >= 1 && etape < 4 && (
        <g stroke="#8a5a3b" strokeWidth={3}>
          <line x1={150} y1={140} x2={150} y2={106} />
          <line x1={230} y1={140} x2={230} y2={106} />
          <line x1={150} y1={110} x2={230} y2={110} />
        </g>
      )}
    </svg>
  )
}
