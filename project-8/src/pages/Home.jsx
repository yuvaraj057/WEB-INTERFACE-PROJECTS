import { Link } from "react-router-dom";
import profile from "../assets/yuvaraj-profile.png";

function Home() {
  return (
    <section className="page home-page">
      <div className="cloud cloud-one" />
      <div className="cloud cloud-two" />
      <div className="home-grid">
        <div className="home-content">
          <span className="eyebrow"><span className="status-dot" /> Available to learn & build</span>
          <h1>Hello, I'm <span className="gradient-text">Yuvaraj</span>.</h1>
          <h2>Computer Science Student & Aspiring Software Developer</h2>
          <p className="hero-description">
            I am a second-year B.E. student who enjoys programming, web development,
            and creating practical digital experiences. I am continuously learning
            modern technologies and turning ideas into working projects.
          </p>

          <div className="hero-actions">
            <Link className="primary-btn" to="/projects">View My Projects <span>→</span></Link>
            <Link className="secondary-btn" to="/contact">Contact Me</Link>
          </div>

          <div className="quick-stats">
            <div><strong>B.E</strong><span>Degree</span></div>
            <div><strong>II</strong><span>Year</span></div>
            <div><strong>3+</strong><span>Core Skills</span></div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="code-orbit orbit-one" />
          <div className="code-orbit orbit-two" />
          <div className="profile-card">
            <div className="profile-glow" />
            <img src={profile} alt="Yuvaraj S" />
            <div className="profile-tag">
              <span className="tag-icon">☁</span>
              <div>
                <strong>YUVARAJ S</strong>
                <small>Learning • Building • Growing</small>
              </div>
            </div>
          </div>
          <span className="floating-chip chip-java">Java</span>
          <span className="floating-chip chip-python">Python</span>
          <span className="floating-chip chip-react">React</span>
        </div>
      </div>

      <div className="home-bottom">
        <div>
          <span className="mini-label">01 / PROFILE</span>
          <p>Passionate about software development and technology.</p>
        </div>
        <div>
          <span className="mini-label">02 / INTEREST</span>
          <p>Cricket, coding and exploring new ideas.</p>
        </div>
        <div>
          <span className="mini-label">03 / GOAL</span>
          <p>Grow into a skilled software developer.</p>
        </div>
      </div>
    </section>
  );
}

export default Home;
