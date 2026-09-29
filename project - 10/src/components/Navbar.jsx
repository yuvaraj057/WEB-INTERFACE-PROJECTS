import { NavLink, Link } from 'react-router-dom'
import { BookOpenCheck, GraduationCap, Moon, Sun } from 'lucide-react'
import { useStudents } from '../StudentContext.jsx'

const links = [
  ['Home', '/'], ['Dashboard', '/dashboard'], ['Students', '/students'], ['Add Student', '/students/new'],
  ['Marks', '/marks'], ['Reports', '/reports'], ['Results', '/results'], ['About', '/about'], ['Contact', '/contact'],
]

export default function Navbar() {
  const { darkMode, setDarkMode } = useStudents()
  return <header className="site-header"><div className="site-header-main"><Link to="/" className="brand"><span className="brand-mark"><GraduationCap size={22} /></span><span><span className="brand-name">Student Report Card</span><small>MANAGEMENT SYSTEM</small></span></Link><span className="header-year"><BookOpenCheck size={15} /> 2026–2027</span><button className="icon-button theme-switch" type="button" onClick={() => setDarkMode(!darkMode)} aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}>{darkMode ? <Sun size={17} /> : <Moon size={17} />}</button></div><nav className="site-nav" aria-label="Main navigation">{links.map(([label, path]) => <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>)}</nav></header>
}