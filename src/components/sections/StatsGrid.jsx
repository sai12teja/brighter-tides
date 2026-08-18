import StatValue from "./StatValue";

/**
 * A row of headline figures with captions, used for Shannon's credentials on
 * both the home and about pages.
 *
 * Deliberately not the template's `.tj-counter-section`, whose `.number` is
 * set at 70px for pure digits: half of these credentials are words
 * ("Fortune 500", "Executive"), which wrap and break the baseline at that
 * size. This keeps the template's heading face and colour tokens at a size
 * that carries both kinds.
 */
export default function StatsGrid({ items, delayFrom = 0.1 }) {
  return (
    <ul className="bt-stats-grid">
      {items.map((item, i) => (
        <li className="wow fadeInUp" data-wow-delay={`${delayFrom + i * 0.1}s`} key={item.label}>
          <StatValue stat={item} />
          <span className="label">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
