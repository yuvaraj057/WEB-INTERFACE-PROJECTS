import "./project.css";

function Header(props) {
  return (
    <header className="header">
      <h1>{props.title}</h1>
      <h3>{props.subtitle}</h3>
    </header>
  );
}

function About(props) {
  return (
    <section className="section">
      <h2>About Me</h2>
      <p>{props.bio}</p>
    </section>
  );
}

function Skills(props) {
  return (
    <section className="section">
      <h2>Skills</h2>
      <ul className="skills-list">
        {props.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

function Goal(props) {
  return (
    <section className="section">
      <h2>Career Objective</h2>
      <p>{props.objective}</p>
    </section>
  );
}

function Contact(props) {
  return (
    <section className="section">
      <h2>Contact</h2>

      <p>
        <b>Email:</b> {props.email}
      </p>

      <p>
        <b>Phone:</b> {props.phone}
      </p>

      <p>
        <b>GitHub:</b>{" "}
        <a
          href={props.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit GitHub
        </a>
      </p>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <p>© 2026 Yuvaraj | Personal Introduction Page</p>
    </footer>
  );
}

function App() {
  const skills = [
    "Java",
    "Python",
    "HTML & CSS",
    "JavaScript",
    "React"
  ];

  return (
    <div className="container">

      <Header
        title="Yuvaraj"
        subtitle="Computer Science Student & Web Developer"
      />

      <About
        bio="Hello! I am Yuvaraj, a passionate computer science student interested in programming and web development. I enjoy learning new technologies and creating useful applications."
      />

      <Skills skills={skills} />

      <Goal
        objective="To become a skilled software developer and build innovative, user-friendly applications using modern technologies."
      />

      <Contact
        email="selvarasuyuvaj057@example.com"
        phone="+91 9342714754"
        github="https://github.com/"
      />

      <Footer />

    </div>
  );
}

export default App;