import { Link } from "react-router-dom";
import { brand } from "../../data/navigation";

/**
 * Text wordmark standing in for a logo file. Swap the inner markup for an
 * <img> once a real Brighter Tides logo asset exists - the `className`
 * contract stays the same.
 */
export default function BrandLogo({ className = "logo" }) {
  return (
    <Link to="/" className={`${className} brand-wordmark`} aria-label="Brighter Tides - home">
      {brand.first} <span className="brand-accent">{brand.second}</span>
    </Link>
  );
}
