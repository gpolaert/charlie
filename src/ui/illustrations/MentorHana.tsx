// Hana Atori — SVG original « inspiré de », aucune image copiée.
// Pose dynamique : le coup de pied de fer.
export function MentorHana({ taille = 150 }: { taille?: number }) {
  return (
    <svg viewBox="0 0 140 160" width={taille} height={(taille * 160) / 140} role="img" aria-label="Hana Atori">
      <g stroke="#4a3728" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        {/* jambe d'appui */}
        <rect x={56} y={112} width={12} height={36} rx={6} fill="#3f4a5a" />
        <ellipse cx={62} cy={151} rx={11} ry={6} fill="#4a3728" />
        {/* jambe du coup de pied — tendue */}
        <g transform="rotate(-38 66 118)">
          <rect x={60} y={112} width={12} height={40} rx={6} fill="#3f4a5a" />
          <ellipse cx={66} cy={155} rx={11} ry={6} fill="#8f9aa8" />
        </g>
        {/* éclat du coup de pied */}
        <g fill="#e9b44c" stroke="none">
          <path d="M110 84 l 6 -12 l 2 10 l 10 -4 l -7 9 l 10 3 l -12 3 Z" />
        </g>
        {/* corps — kimono */}
        <path d="M48 74 L 42 116 L 84 116 L 78 74 Z" fill="#c9564a" />
        <path d="M60 74 L 68 92 L 76 74 Z" fill="#f3e8cf" />
        <rect x={42} y={98} width={42} height={8} rx={4} fill="#4a3728" />
        {/* bras en garde */}
        <rect x={34} y={76} width={11} height={26} rx={5.5} fill="#c9564a" transform="rotate(24 39 78)" />
        <rect x={78} y={72} width={11} height={26} rx={5.5} fill="#c9564a" transform="rotate(-58 83 74)" />
        <circle cx={30} cy={104} r={6.5} fill="#f2d8ae" />
        <circle cx={102} cy={70} r={6.5} fill="#f2d8ae" />
        {/* tête */}
        <circle cx={63} cy={46} r={27} fill="#f2d8ae" />
        {/* cheveux + chignon + bandeau */}
        <path d="M38 42 Q 42 18 63 18 Q 84 18 88 42 Q 76 30 63 30 Q 50 30 38 42 Z" fill="#2e2620" />
        <circle cx={63} cy={14} r={9} fill="#2e2620" />
        <path d="M37 36 L 89 36" stroke="#e9b44c" strokeWidth={6} />
        {/* yeux déterminés */}
        <circle cx={53} cy={48} r={7.5} fill="#fff" />
        <circle cx={73} cy={48} r={7.5} fill="#fff" />
        <circle cx={54} cy={49} r={4} fill="#4a3728" stroke="none" />
        <circle cx={74} cy={49} r={4} fill="#4a3728" stroke="none" />
        <circle cx={55.5} cy={47.5} r={1.4} fill="#fff" stroke="none" />
        <circle cx={75.5} cy={47.5} r={1.4} fill="#fff" stroke="none" />
        <line x1={46} y1={39} x2={58} y2={41} />
        <line x1={80} y1={39} x2={68} y2={41} />
        {/* sourire confiant */}
        <path d="M56 61 Q 63 66 70 61" fill="none" />
      </g>
    </svg>
  )
}
