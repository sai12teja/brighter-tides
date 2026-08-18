import { skills } from "../../data/skills";

export default function Skills() {
  return (
    <section className="tj-skill-section" data-bg-image="/assets/images/experience/experience-bg.webp">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-wrapper">
              <h2 className="title text-anim">Skill and experience</h2>
              <div className="desc wow fadeInUp" data-wow-delay="0.1s">
                <p>
                  In today's dynamic business environment, the key to success lies in strategic planning and operational
                </p>
              </div>
              <div className="tj-progress-bar wow fadeInUp" data-wow-delay="0.3s">
                <ul className="tj-progress__list style-2 mt-0">
                  {skills.map((skill) => (
                    <li key={skill.title}>
                      <h6 className="tj-progress__title">{skill.title}</h6>
                      <div className="tj-progress">
                        <div className="tj-progress__bar" data-perchant={skill.percent}>
                          <span className="tj-progress__perchant">{skill.percent}%</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
