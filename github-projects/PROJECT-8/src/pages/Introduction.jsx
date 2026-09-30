function Introduction() {
  const milestones = [
    ["01", "Starting with Computer Science", "My journey began with an interest in programming and understanding how software works."],
    ["02", "Learning by Practice", "I started creating small applications and gradually explored Java, Python and web technologies."],
    ["03", "Building with React", "React introduced me to component-based interfaces, reusable code and modern frontend development."],
    ["04", "Looking Ahead", "My goal is to keep building real projects and develop the skills needed for software development."]
  ];

  return (
    <section className="page inner-page">
      <div className="section-heading">
        <span className="eyebrow">INTRODUCTION</span>
        <h1>From curiosity to <span className="gradient-text">creation</span>.</h1>
        <p>A simple timeline of how I am developing my skills as a Computer Science student.</p>
      </div>

      <div className="timeline">
        {milestones.map(([number, title, text]) => (
          <div className="timeline-item" key={number}>
            <div className="timeline-marker">{number}</div>
            <div className="timeline-card">
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="learning-grid">
        <div className="glass-card">
          <span className="card-icon">⌘</span>
          <h2>Currently Learning</h2>
          <p>Java, Python, React, web development concepts and practical software development workflows.</p>
        </div>
        <div className="glass-card">
          <span className="card-icon">☁</span>
          <h2>Interests</h2>
          <p>Web interfaces, programming, cloud technology, software projects and cricket.</p>
        </div>
        <div className="glass-card">
          <span className="card-icon">↗</span>
          <h2>Future Goal</h2>
          <p>Become a software developer who can design, build and improve useful applications.</p>
        </div>
      </div>
    </section>
  );
}

export default Introduction;
