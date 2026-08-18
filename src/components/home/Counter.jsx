import { counters } from "../../data/counters";

export default function Counter() {
  return (
    <section className="tj-counter-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="counter-wrapper">
              {counters.map((item) => (
                <div className="counter-item" key={item.label}>
                  <div className="bottom-line d-md-none"></div>
                  <div className="number">
                    {item.value ? (
                      <span className="number-text">{item.value}</span>
                    ) : (
                      <>
                        {item.prefix}
                        <span className="odometer" data-count={item.count}>
                          0
                        </span>
                        {item.suffix}
                        {item.sup && <sup>{item.sup}</sup>}
                      </>
                    )}
                  </div>
                  <span className="sub-title">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
