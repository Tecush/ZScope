/**
 * Schematic Nyquist plot of a Randles-type circuit, Rs + (Rct ‖ C) + W,
 * drawn as crisp SVG. The semicircle starts on the Z″ = 0 axis at Rs and
 * ends at Rs + Rct; the diffusion (Warburg) tail rises at 45°.
 * The fitted curve draws in on mount; points and annotations fade in after.
 */
export default function NyquistPlot() {
  // Semicircle: centre (150,270), r = 95, plus 3 points along the 45° tail (small scatter)
  const points = [
    [56.4, 253.5], [67.7, 222.5], [88.9, 197.2], [117.5, 180.7],
    [150, 175], [182.5, 180.7], [211.1, 197.2], [232.3, 222.5], [243.6, 253.5],
    [254.5, 261], [266.5, 248.5], [279, 237],
  ];
  const note = { fontSize: 9, fontFamily: "JetBrains Mono, monospace" };
  const fade = (d) => ({ animationDelay: `${d}s` });

  return (
    <svg viewBox="0 0 320 310" className="h-full w-full" role="img" aria-label="Schematic Nyquist impedance plot of a Randles-type circuit with fitted curve and data points">
      <defs>
        <linearGradient id="fitGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0052FF" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
      </defs>

      {/* grid */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={30 + i * 32} y1="30" x2={30 + i * 32} y2="270" stroke="#E2E8F0" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`h${i}`} x1="30" y1={30 + i * 32} x2="286" y2={30 + i * 32} stroke="#E2E8F0" strokeWidth="0.5" />
      ))}

      {/* axes */}
      <line x1="30" y1="270" x2="286" y2="270" stroke="#94A3B8" strokeWidth="1" />
      <line x1="30" y1="30" x2="30" y2="270" stroke="#94A3B8" strokeWidth="1" />

      {/* fitted curve: semicircle + Warburg tail (pathLength normalised for the draw-in animation) */}
      <path
        className="nyquist-fit"
        pathLength="1"
        d="M 55 270 A 95 95 0 0 1 245 270 L 286 229"
        fill="none"
        stroke="url(#fitGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* measured points */}
      {points.map(([x, y], i) => (
        <circle
          key={i}
          className="nyquist-point"
          cx={x}
          cy={y}
          r="3.5"
          fill="#10B981"
          stroke="#ffffff"
          strokeWidth="1.2"
          style={fade(1.2 + i * 0.08)}
        />
      ))}

      {/* annotations */}
      <g className="nyquist-point" style={fade(2.4)}>
        <circle cx="55" cy="270" r="2.5" fill="#fff" stroke="#0052FF" strokeWidth="1.2" />
        <circle cx="245" cy="270" r="2.5" fill="#fff" stroke="#0052FF" strokeWidth="1.2" />
        <line x1="55" y1="279" x2="245" y2="279" stroke="#0052FF" strokeWidth="1" />
        <line x1="55" y1="275" x2="55" y2="283" stroke="#0052FF" strokeWidth="1" />
        <line x1="245" y1="275" x2="245" y2="283" stroke="#0052FF" strokeWidth="1" />
        <text x="55" y="294" textAnchor="middle" className="fill-slate-500" style={note}>Rs</text>
        <text x="150" y="294" textAnchor="middle" className="fill-[#0052FF]" style={note}>Rct</text>
        <text x="245" y="294" textAnchor="middle" className="fill-slate-500" style={note}>Rs + Rct</text>
        <text x="150" y="162" textAnchor="middle" className="fill-slate-500" style={note}>ω_max</text>
        <text x="282" y="214" textAnchor="end" className="fill-slate-500" style={note}>ω → 0</text>
      </g>

      {/* axis labels */}
      <text x="160" y="307" textAnchor="middle" className="fill-slate-400" style={{ ...note, fontSize: 10 }}>
        Z′ (Ω) — Real
      </text>
      <text x="14" y="160" textAnchor="middle" transform="rotate(-90 14 160)" className="fill-slate-400" style={{ ...note, fontSize: 10 }}>
        −Z″ (Ω) — Imaginary
      </text>
    </svg>
  );
}
