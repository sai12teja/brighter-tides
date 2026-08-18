import useCountUp from "../../hooks/useCountUp";

/**
 * A statistic figure. Numeric ones (`count`) roll up when they scroll into
 * view; the rest ("Fortune 500", "Executive") are words and render as-is, so
 * the two kinds still share one type size and one baseline.
 */
export default function StatValue({ stat, className = "value" }) {
  const [ref, current] = useCountUp(stat.count ?? 0);

  if (stat.count === undefined) {
    return <span className={className}>{stat.text}</span>;
  }

  return (
    <span className={className} ref={ref}>
      {stat.prefix}
      <span className="num">{current}</span>
      {stat.suffix}
    </span>
  );
}
