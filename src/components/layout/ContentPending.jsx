/**
 * Temporary stand-in for pages whose copy has not been supplied yet.
 * Deliberately not filled with invented marketing copy - replace the whole
 * component with the real sections as content arrives.
 */
export default function ContentPending({ page }) {
  return (
    <section className="section-space">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading text-center">
              <span className="sub-title">Content pending</span>
              <h2 className="sec-title">{page}</h2>
              <div className="desc">
                <p>
                  This page is wired into the site structure and navigation. Its copy is waiting on the Brighter Tides
                  content guide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
