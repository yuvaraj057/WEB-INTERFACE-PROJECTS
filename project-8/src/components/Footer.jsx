import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <strong>YUVARAJ S</strong>
          <p>Computer Science student • Software Development</p>
        </div>
        <div className="footer-links">
          <Link to="/projects">Projects</Link>
          <Link to="/skills">Skills</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <p className="copyright">© 2026 Yuvaraj S. Built with React.</p>
      </div>
    </footer>
  );
}

export default Footer;
