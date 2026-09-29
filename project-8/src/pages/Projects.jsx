const projects = [
  {
    number: "01",
    title: "CricketVerse",
    description: "A cricket-focused fan website with teams, players, tournaments and an interactive cricket experience.",
    tech: ["HTML", "CSS", "JavaScript"],
    icon: "🏏"
  },
  {
    number: "02",
    title: "Student Diary",
    description: "A student productivity concept for daily tasks, weekly planning, reports, calendar tracking and completed work.",
    tech: ["React", "JavaScript", "CSS"],
    icon: "📘"
  },
  {
    number: "03",
    title: "Student Attendance Tracker",
    description: "A React application for managing attendance, changing student status and calculating attendance percentage.",
    tech: ["React", "JavaScript", "CSS"],
    icon: "📊"
  },
  {
    number: "04",
    title: "Personal Introduction Page",
    description: "A React learning project demonstrating components, props, arrays and reusable UI sections.",
    tech: ["React", "JSX", "CSS"],
    icon: "💻"
  }
];

function Projects() {
  return (
    <section className="page inner-page">
      <div className="section-heading">
        <span className="eyebrow">PROJECTS</span>
        <h1>Things I've been <span className="gradient-text">building</span>.</h1>
        <p>College projects and practice applications that help me turn concepts into practical experience.</p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.number}>
            <div className="project-top">
              <span className="project-icon">{project.icon}</span>
              <span>{project.number}</span>
            </div>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="tech-list">
              {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
            </div>
            <div className="project-actions">
              <a href="https://github.com/yuvaraj057" target="_blank" rel="noreferrer">GitHub ↗</a>
              <span className="demo-placeholder">Demo placeholder</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
