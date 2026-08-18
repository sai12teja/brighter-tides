import { Link } from "react-router-dom";
import { brand } from "../../data/navigation";

/**
 * The Brighter Tides logo.
 *
 * Two variants ship: the full-colour lockup for light surfaces, and a
 * reversed one - navy script knocked out to white, wave and sun untouched -
 * for the navy header, drawer and footer. Both are the horizontal lockup
 * rather than the stacked mark: at the ~46px a header row allows, the
 * stacked version's script and tagline would be illegible.
 *
 * Sized by height in theme.css (`.bt-logo img`), so the intrinsic
 * dimensions here only reserve the right aspect ratio while the file loads.
 */
export default function BrandLogo({ className = "logo", variant = "light" }) {
  const src =
    variant === "light"
      ? "/assets/images/logos/brighter-tides-lockup-light.png"
      : "/assets/images/logos/brighter-tides-lockup.png";

  return (
    <Link to="/" className={`${className} bt-logo`} aria-label={`${brand.first} ${brand.second} - home`}>
      <img src={src} alt={`${brand.first} ${brand.second}`} width="875" height="172" />
    </Link>
  );
}
