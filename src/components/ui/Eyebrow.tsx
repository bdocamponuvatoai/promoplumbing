/**
 * Eyebrow with the short decorative rule in front. Plain eyebrows stay plain
 * `<p className="eyebrow">` elements.
 */
export function Eyebrow({ children }: { children: string }) {
  return (
    <p className="eyebrow">
      <span className="mini-line" />
      {` ${children}`}
    </p>
  );
}
