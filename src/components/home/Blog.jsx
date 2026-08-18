import { blogPosts } from "../../data/blogPosts";

function ExploreButton() {
  return (
    <a href="#blog" className="tj-primary-btn">
      <div className="btn_inner">
        <div className="btn_icon">
          <span>
            <i className="tji-arrow-right"></i>
            <i className="tji-arrow-right"></i>
          </span>
        </div>
        <div className="btn_text">
          <span>Explore more</span>
        </div>
      </div>
    </a>
  );
}

export default function Blog() {
  return (
    <section id="blog" className="tj-blog-section with-shape">
      <div className="tj-blog-section-wrap">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sec-heading">
                <div className="sec-text">
                  <span className="sub-title wow fadeInDown" data-wow-delay="0.1s">
                    Latest news
                  </span>
                  <h2 className="sec-title text-anim">Tip and tricks for success</h2>
                </div>
                <div className="blog-button d-none d-lg-inline-flex wow fadeInDown" data-wow-delay="0.3s">
                  <ExploreButton />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="blog-wrapper">
                {blogPosts.map((post, i) => (
                  <div className="blog-item wow fadeInUp" data-wow-delay={`${0.1 + i * 0.2}s`} key={post.title}>
                    <div className="blog-images hover:shine">
                      <a href="#blog">
                        <img src={post.image} alt="Images" />
                      </a>
                    </div>
                    <div className="blog-content">
                      <div className="blog-meta">
                        <ul>
                          <li className="category">
                            <a href="#blog">{post.category}</a>
                          </li>
                          <li>{post.date}</li>
                          <li>{post.comments}</li>
                        </ul>
                      </div>
                      <h4 className="blog-title">
                        <a href="#blog">{post.title}</a>
                      </h4>
                      {post.desc && <div className="desc">{post.desc}</div>}
                      <a className="blog-button text-btn" href="#blog">
                        Read more <i className="tji-arrow-right"></i>
                      </a>
                      <div className="blog-meta meta-2 mb-0">
                        <ul>
                          <li>{post.date}</li>
                          <li>{post.comments}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="blog-button d-lg-none text-center wow fadeInUp" data-wow-delay="0.9s">
                <ExploreButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
