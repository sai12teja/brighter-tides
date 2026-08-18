import { credentials } from "../../data/about";
import StatsGrid from "../sections/StatsGrid";

/** "Experience & Credentials" - the figures behind the founder story. */
export default function Credentials() {
  return (
    <section className="bt-credentials-section section-bottom-space">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <StatsGrid items={credentials} />
          </div>
        </div>
      </div>
    </section>
  );
}
