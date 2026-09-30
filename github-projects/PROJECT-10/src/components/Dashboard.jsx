import { ArrowUpRight, Award, BookOpenCheck, CircleCheck, CircleX, FileText, GraduationCap, Plus, Users, UsersRound } from 'lucide-react'
import { calculateStudent, subjectTotal } from './GradeCalculator.jsx'
import { Link } from 'react-router-dom'

export default function Dashboard({ students }) {
  const results = students.map((student) => ({ student, ...calculateStudent(student) }))
  const passed = results.filter((item) => item.result === 'PASS').length
  const average = results.length ? results.reduce((sum, item) => sum + item.percentage, 0) / results.length : 0
  const highest = results.length ? Math.max(...results.map((item) => item.totalMarks)) : 0
  const topStudent = [...results].sort((a, b) => b.percentage - a.percentage)[0]
  const subjectNames = [...new Set(students.flatMap((student) => student.subjects.map((subject) => subject.name)))]
  const subjectAverages = subjectNames.map((name) => {
    const marks = students.flatMap((student) => student.subjects.filter((subject) => subject.name === name).map(subjectTotal))
    return { name, average: marks.length ? marks.reduce((sum, mark) => sum + mark, 0) / marks.length : 0 }
  })
  const grades = ['A+', 'A', 'B+', 'B', 'C', 'D', 'F'].map((grade) => ({ grade, count: results.filter((item) => item.grade === grade).length }))
  const comparison = [...results].sort((a, b) => b.percentage - a.percentage).slice(0, 6)
  const subjectCount = subjectNames.length
  const stats = [
    { label: 'Total students', value: students.length, note: 'All registered profiles', icon: Users, color: 'blue' },
    { label: 'Passed students', value: passed, note: 'All subjects cleared', icon: CircleCheck, color: 'green' },
    { label: 'Failed students', value: students.length - passed, note: 'Need academic support', icon: CircleX, color: 'red' },
    { label: 'Average percentage', value: `${average.toFixed(1)}%`, note: 'Current student average', icon: Award, color: 'violet' },
    { label: 'Highest total', value: highest, note: `Out of ${topStudent?.maximumMarks || 0} marks`, icon: GraduationCap, color: 'blue' },
    { label: 'Total subjects', value: subjectCount, note: 'Distinct subjects assessed', icon: BookOpenCheck, color: 'violet' },
  ]
  return <div className="dashboard-grid">
    <section className="welcome-band"><div><span className="welcome-label">STUDENT REPORT CARD MANAGEMENT · ACADEMIC OVERVIEW</span><h1>Good morning, Admin</h1><p>Your student records and academic performance, at a glance.</p></div><div className="welcome-art"><GraduationCap size={78} strokeWidth={1.1} /><span>2026<br />— 27</span></div></section>
    <div className="stats-grid">{stats.map(({ label, value, note, icon: Icon, color }) => <article className="stat-card" key={label}><div className={`stat-icon ${color}`}><Icon size={19} /></div><span className="stat-label">{label}</span><strong className="stat-value">{value}</strong><small>{note}</small></article>)}</div>
    <div className="quick-actions"><span>QUICK ACTIONS</span><Link to="/students/new"><Plus size={16} /> Add student</Link><Link to="/marks"><BookOpenCheck size={16} /> Enter marks</Link><Link to="/students"><UsersRound size={16} /> View students</Link><Link to="/reports"><FileText size={16} /> Generate report</Link></div>
    <div className="analytics-grid"><section className="panel analytics-panel"><div className="panel-heading"><div><h2>Subject-wise average</h2><p>Average mark out of 100 per subject</p></div></div><div className="horizontal-bars">{subjectAverages.length ? subjectAverages.map(({ name, average: score }) => <div className="horizontal-bar-row" key={name}><span>{name}</span><div><i style={{ width: `${Math.min(100, score)}%` }} /></div><strong>{score.toFixed(0)}</strong></div>) : <p className="chart-empty">Add marks to see subject performance.</p>}</div></section>
      <section className="panel analytics-panel"><div className="panel-heading"><div><h2>Pass vs fail</h2><p>Results from saved student records</p></div></div><div className="outcome-chart"><div className="outcome-ring" style={{ '--pass': `${students.length ? passed / students.length * 100 : 0}%` }}><strong>{students.length ? Math.round(passed / students.length * 100) : 0}%</strong><small>pass rate</small></div><div className="outcome-legend"><span><i className="pass-dot" /> Passed <strong>{passed}</strong></span><span><i className="fail-dot" /> Failed <strong>{students.length - passed}</strong></span></div></div></section>
      <section className="panel analytics-panel"><div className="panel-heading"><div><h2>Grade distribution</h2><p>Students by overall grade</p></div></div><div className="grade-distribution">{grades.map(({ grade, count }) => <div key={grade}><span>{grade}</span><div><i style={{ height: `${students.length ? Math.max(count ? 6 : 0, count / students.length * 100) : 0}%` }} /></div><small>{count}</small></div>)}</div></section>
      <section className="panel analytics-panel"><div className="panel-heading"><div><h2>Student performance</h2><p>Leading percentages this term</p></div></div><div className="horizontal-bars">{comparison.length ? comparison.map(({ student, percentage }) => <div className="horizontal-bar-row" key={student.id}><span>{student.name}</span><div><i style={{ width: `${percentage}%` }} /></div><strong>{percentage.toFixed(0)}%</strong></div>) : <p className="chart-empty">Student results will appear here.</p>}</div></section></div>
    <section className="panel recent-panel dashboard-recent"><div className="panel-heading"><div><h2>Recent student results</h2><p>Latest performance across the student directory</p></div><Link to="/students" className="text-link">View all students <ArrowUpRight size={15} /></Link></div><div className="student-table-scroll"><table className="student-table dashboard-table"><thead><tr><th>Roll number</th><th>Student name</th><th>Class</th><th>Percentage</th><th>Grade</th><th>Result</th><th></th></tr></thead><tbody>{results.slice(0, 6).map(({ student, percentage, grade, result }) => <tr key={student.id}><td>{student.rollNumber}</td><td>{student.name}</td><td>{student.className}</td><td><strong>{percentage.toFixed(1)}%</strong></td><td><span className="grade-pill">{grade}</span></td><td><span className={`status-pill ${result === 'PASS' ? 'status-pass' : 'status-fail'}`}><i />{result}</span></td><td><Link to={`/report/${student.id}`} className="report-open-link">View report <ArrowUpRight size={13} /></Link></td></tr>)}</tbody></table></div></section>
  </div>
}