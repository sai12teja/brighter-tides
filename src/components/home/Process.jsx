import { process } from "../../data/home";

/** Three-step engagement flow - deliberately plain, numbers doing the work. */
export default function Process() {
  return (
    <section className="bt-process-section section-space">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading text-center bt-narrow-heading">
              <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                {process.eyebrow}
              </span>
              <h2 className="sec-title text-anim">{process.title}</h2>
            </div>
          </div>
        </div>
        <div className="row rg-30">
          {process.steps.map((step, i) => (
            <div className="col-lg-4 col-md-6" key={step.number}>
              <div className="bt-process-item wow fadeInUp" data-wow-delay={`${0.1 + i * 0.2}s`}>
                <span className="bt-process-index">{step.number}</span>
                <h4 className="title">{step.title}</h4>
                <div className="desc">
                  <p>{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
