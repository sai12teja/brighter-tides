import { projects } from "../../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="tj-project-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading text-center">
              <span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                Our projects
              </span>
              <h2 className="sec-title text-anim">Breakthrough projects</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="project-slider-one">
              <div className="swiper project-slider swiper-container">
                <div className="swiper-wrapper leftSwipeWrap not-hide-cursor" data-cursor="DRAG">
                  {projects.map((project) => (
                    <div className="swiper-slide left-swipe" key={project.title}>
                      <div className="project-item">
                        <div className="project-image">
                          <a className="cursor-hide" href="#projects">
                            <img src={project.image} alt="Images" />
                          </a>
                        </div>
                        <div className="project-content">
                          <div className="project-title">
                            <h4 className="title">
                              <a href="#projects">
                                {project.title}
                                <i className="tji-arrow-right"></i>
                              </a>
                            </h4>
                          </div>
                          <div className="tag-list">
                            {project.tags.map((tag) => (
                              <a href="#projects" key={tag}>
                                {tag}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="tj-cursor">
              <i className="tji-angle-left"></i>Drag<i className="tji-angle-right"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
