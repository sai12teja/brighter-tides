import useTypewriter from "../../hooks/useTypewriter";

/**
 * A word that types itself in behind a blinking caret, holds, clears, and
 * gives way to the next one - looping the list forever.
 *
 * The whole component is built around one problem: text that grows a
 * character at a time is text that changes width, and in a display-size
 * headline that means every line under it - paragraph, buttons, the scroll
 * rail - moves on every keystroke. Worse with a rotating list, where the
 * words are different lengths and can wrap to different numbers of lines.
 *
 * So every phrase is rendered, stacked in a single CSS grid cell at zero
 * opacity, with the live text laid in the same cell on top. The row is
 * auto-sized, so its height is the tallest phrase's - whichever word is
 * being typed, and however far through it is, the box is already the size
 * the longest one will need. Nothing on the page moves while it types.
 *
 * The typed text is hidden from assistive technology (it is a partial word
 * that changes sixteen times a second) and `readAs` is exposed in its place,
 * so the heading is announced and copied as one settled line.
 *
 * @param {{phrases: string[], readAs?: string, className?: string}} props
 *   `phrases` cycles in order; a list of one types, clears and retypes.
 *   `readAs` is what screen readers and the clipboard get - default is the
 *   phrases run together, which is right when they read as one sentence.
 */
export default function TypedText({ phrases, readAs, className = "" }) {
  const { text, resting } = useTypewriter(phrases);

  return (
    <span className={`bt-typed ${className}`.trim()}>
      {phrases.map((phrase, index) => (
        <span key={`${index}-${phrase}`} className="bt-typed-ghost" aria-hidden="true">
          {phrase}
        </span>
      ))}
      <span className="bt-typed-live" aria-hidden="true">
        {text}
        <span className="bt-typed-caret" data-resting={resting ? "true" : "false"}></span>
      </span>
      <span className="visually-hidden">{readAs ?? phrases.join(" ")}</span>
    </span>
  );
}
