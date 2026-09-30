import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Introduction", path: "/introduction" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Contact", path: "/contact" },
];

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">&lt;/&gt;</span>
          <span>YUVARAJ S</span>
        </NavLink>

        <nav className="nav-links" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
