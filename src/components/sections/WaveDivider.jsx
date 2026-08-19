/**
 * A wave divider for the foot of a dark section.
 *
 * The path is a single S-curve drawn across a 1440x120 box and closed along
 * the bottom, so the fill is everything *below* the wave - which is what makes
 * it read as the next section rising into this one rather than as a line drawn
 * on top of it.
 *
 * `preserveAspectRatio="none"` lets that one shape stretch to any width, so a
 * phone and a wide desktop show the same wave rather than a cropped or
 * squashed one; only its height changes, and that is a clamp in CSS.
 *
 * `colour` is the section that follows, since that is what the wave is filled
 * with - pass it whenever the next section is not the usual pale band.
 *
 * Decoration only, so it is `aria-hidden`.
 */
export default function WaveDivider({ colour }) {
  return (
    <div className="bt-wave-divider" aria-hidden="true" style={colour ? { "--bt-wave-fill": colour } : undefined}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" focusable="false">
        <path d="M0,64 C240,120 480,0 720,32 C960,64 1200,120 1440,64 L1440,120 L0,120 Z" />
      </svg>
    </div>
  );
}
