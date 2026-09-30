const skillGroups = [
  { title: "Programming", icon: "⌘", skills: ["Java", "Python"] },
  { title: "Web Development", icon: "</>", skills: ["HTML", "CSS", "JavaScript", "React"] },
  { title: "Database", icon: "◈", skills: ["SQL", "DBMS Fundamentals"] },
  { title: "Cloud Computing", icon: "☁", skills: ["Cloud Concepts", "Cloud Platforms — Learning"] },
  { title: "DevOps", icon: "∞", skills: ["Git", "GitHub", "Development Workflow"] },
  { title: "Tools", icon: "⚙", skills: ["VS Code", "Vite", "GitHub"] }
];

function Skills() {
  return (
    <section className="page inner-page">
      <div className="section-heading">
        <span className="eyebrow">SKILLS</span>
        <h1>My <span className="gradient-text">technology stack</span>.</h1>
        <p>Skills I use today and areas I am exploring as I continue my Computer Science journey.</p>
      </div>

      <div className="skills-grid">
        {skillGroups.map((group) => (
          <article className="skill-card" key={group.title}>
            <div className="skill-icon">{group.icon}</div>
            <h2>{group.title}</h2>
            <div className="badge-list">
              {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </article>
        ))}
      </div>

      <div className="skill-note">
        <span>☁</span>
        <div>
          <strong>Always learning.</strong>
          <p>Technology changes quickly, so I am focused on improving one concept and one project at a time.</p>
        </div>
      </div>
    </section>
  );
}

export default Skills;
