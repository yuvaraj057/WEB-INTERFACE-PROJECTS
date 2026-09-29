import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, BookOpenCheck, FileBadge2, GraduationCap, UsersRound } from 'lucide-react'
import yuvi from '../assets/yuvi.png'
import { useStudents } from '../StudentContext.jsx'
import { calculateStudent } from '../components/GradeCalculator.jsx'

const features = [
  { icon: UsersRound, title: 'Student management', text: 'Keep student profiles, class details, and contact information in one organized place.' },
  { icon: BookOpenCheck, title: 'Marks management', text: 'Record assessment marks by subject with clear limits and instant totals.' },
  { icon: BarChart3, title: 'Automatic grading', text: 'Turn subject marks into grades, pass status, averages, and class rank.' },
  { icon: FileBadge2, title: 'Report cards', text: 'Create consistent, printable academic records from each student profile.' },
]

export default function Home() {
  const { students } = useStudents()
  const passed = students.filter((student) => calculateStudent(student).result === 'PASS').length
  const average = students.length ? students.reduce((sum, student) => sum + calculateStudent(student).percentage, 0) / students.length : 0
  const subjects = new Set(students.flatMap((student) => student.subjects.map((subject) => subject.name))).size

  return <div className="landing-page">
    <section className="landing-hero"><div className="landing-copy"><span className="landing-eyebrow"><i /> EDUCATION, WELL ORGANIZED</span><h1>Student Report Card <span>Management System</span></h1><p>One calm, connected workspace for student records, marks, results, and polished report cards.</p><div className="landing-actions"><Link to="/dashboard" className="button button-primary">Get started <ArrowRight size={16} /></Link><Link to="/reports" className="button button-outline">View reports</Link></div><div className="landing-trust"><span className="avatar-stack"><i>ER</i><i>AC</i><i>ST</i></span><span>Student progress, made clear</span></div></div><div className="landing-visual"><img src={yuvi} alt="Graduates celebrating and holding a student report card" /></div></section>
    <section className="landing-stats" aria-label="Academic overview"><div><strong>{students.length}</strong><span>Total students</span></div><div><strong>{subjects}</strong><span>Total subjects</span></div><div><strong>{passed}</strong><span>Passed students</span></div><div><strong>{average.toFixed(1)}%</strong><span>Average percentage</span></div></section>
    <section className="landing-features"><div className="landing-section-heading"><div><span>STUDENT REPORT CARD WORKSPACE</span><h2>Everything academic,<br />in one place.</h2></div><p>Practical tools for the work educators do every day: keep records accurate, results transparent, and reporting simple.</p></div><div className="feature-grid">{features.map(({ icon: Icon, title, text }, index) => <article className="feature-item" key={title}><span className="feature-number">0{index + 1}</span><span className="feature-icon"><Icon size={20} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="landing-cta"><div><span>READY FOR THE NEXT TERM?</span><h2>Give every result a clear story.</h2></div><Link to="/students/new" className="button button-light">Add a student <ArrowRight size={16} /></Link></section>
    <footer className="landing-footer"><Link to="/" className="footer-brand"><GraduationCap size={19} /> Student Report Card Management System</Link><span>Academic records, thoughtfully managed.</span><div><Link to="/about">About</Link><Link to="/contact">Contact</Link><Link to="/reports">Reports</Link></div></footer>
  </div>
}