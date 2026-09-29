function About() {
  return (
    <section className="page inner-page">
      <div className="section-heading">
        <span className="eyebrow">ABOUT ME</span>
        <h1>A little more about <span className="gradient-text">my journey</span>.</h1>
        <p>Not a resume — this is the story behind the person who enjoys learning, building and experimenting with technology.</p>
      </div>

      <div className="about-layout">
        <div className="glass-card about-story">
          <span className="card-number">01</span>
          <h2>Who I am</h2>
          <p>
            I am <strong>YUVARAJ S</strong>, a second-year B.E. student at
            <strong> Prince Dr. K. Vasudevan College of Engineering and Technology</strong>.
            My interest in Computer Science comes from enjoying the process of solving
            problems and seeing an idea become a working application.
          </p>
          <p>
            I like learning through projects rather than only theory. Every small
            application I build helps me understand programming, user interfaces,
            databases and the way modern software is developed.
          </p>
        </div>

        <div className="about-side">
          <div className="info-tile">
            <span>🎓</span>
            <div><small>EDUCATION</small><strong>B.E. • II Year</strong><p>Computer Science Engineering</p></div>
          </div>
          <div className="info-tile">
            <span>🏏</span>
            <div><small>INTEREST</small><strong>Cricket</strong><p>A sport I enjoy following and playing.</p></div>
          </div>
          <div className="info-tile">
            <span>💡</span>
            <div><small>LEARNING STYLE</small><strong>Build & Experiment</strong><p>Learning concepts by creating practical projects.</p></div>
          </div>
        </div>
      </div>

      <div className="journey-strip">
        <div><span>01</span><strong>Learn</strong><p>Understand programming fundamentals.</p></div>
        <div><span>02</span><strong>Build</strong><p>Create useful web and software projects.</p></div>
        <div><span>03</span><strong>Improve</strong><p>Explore better tools and development practices.</p></div>
        <div><span>04</span><strong>Grow</strong><p>Move toward a software development career.</p></div>
      </div>
    </section>
  );
}

export default About;
