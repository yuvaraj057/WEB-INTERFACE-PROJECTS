import { useState } from 'react'
import { BarChart3, TrendingDown, TrendingUp, Users } from 'lucide-react'
import { useStudents } from '../StudentContext.jsx'
import { calculateStudent, subjectTotal } from '../components/GradeCalculator.jsx'

export default function Results() {
  const { students } = useStudents()
  const [classFilter, setClassFilter] = useState('all')
  const [sectionFilter, setSectionFilter] = useState('all')
  const [yearFilter, setYearFilter] = useState('all')
  const classes = [...new Set(students.map((student) => student.className))].sort()
  const filtered = students.filter((student) => (classFilter === 'all' || student.className === classFilter) && (sectionFilter === 'all' || student.section === sectionFilter) && (yearFilter === 'all' || student.academicYear === yearFilter))
  const results = filtered.map((student) => ({ student, ...calculateStudent(student) })).sort((a, b) => b.percentage - a.percentage)
  const scores = results.map((result) => result.percentage)
  const passed = results.filter((result) => result.result === 'PASS').length
  const average = scores.length ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0
  const highest = scores.length ? Math.max(...scores) : 0
  const lowest = scores.length ? Math.min(...scores) : 0
  const gradeCounts = ['A+', 'A', 'B+', 'B', 'C', 'D', 'F'].map((grade) => ({ grade, count: results.filter((result) => result.grade === grade).length }))
  const subjectNames = [...new Set(filtered.flatMap((student) => student.subjects.map((subject) => subject.name)))]
  const subjectAverages = subjectNames.map((name) => {
    const marks = filtered.flatMap((student) => student.subjects.filter((subject) => subject.name === name).map(subjectTotal))
    return { name, average: marks.length ? marks.reduce((sum, mark) => sum + mark, 0) / marks.length : 0 }
  })
  const sections = [...new Set(students.filter((student) => classFilter === 'all' || student.className === classFilter).map((student) => student.section))].sort()
  const years = [...new Set(students.map((student) => student.academicYear))].sort()

  return <div className="results-page"><div className="page-intro"><div><div className="eyebrow"><BarChart3 size={15} /> RESULTS & ANALYSIS</div><h1>Performance results</h1><p>Compare academic outcomes across students, classes, and subjects.</p></div></div>
    <div className="results-filters"><label>Class<select value={classFilter} onChange={(event) => setClassFilter(event.target.value)}><option value="all">All classes</option>{classes.map((item) => <option key={item}>{item}</option>)}</select></label><label>Section<select value={sectionFilter} onChange={(event) => setSectionFilter(event.target.value)}><option value="all">All sections</option>{sections.map((item) => <option key={item}>{item}</option>)}</select></label><label>Academic year<select value={yearFilter} onChange={(event) => setYearFilter(event.target.value)}><option value="all">All years</option>{years.map((item) => <option key={item}>{item}</option>)}</select></label></div>
    <div className="results-kpis"><article><span className="stat-icon blue"><TrendingUp size={18} /></span><small>Highest percentage</small><strong>{highest.toFixed(1)}%</strong></article><article><span className="stat-icon violet"><TrendingDown size={18} /></span><small>Lowest percentage</small><strong>{lowest.toFixed(1)}%</strong></article><article><span className="stat-icon green"><BarChart3 size={18} /></span><small>Average percentage</small><strong>{average.toFixed(1)}%</strong></article><article><span className="stat-icon green"><Users size={18} /></span><small>Total passed</small><strong>{passed}</strong></article><article><span className="stat-icon red"><Users size={18} /></span><small>Total failed</small><strong>{results.length - passed}</strong></article></div>
    <div className="results-chart-grid"><section className="panel result-chart"><div className="panel-heading"><div><h2>Subject-wise performance</h2><p>Average marks by subject</p></div></div>{subjectAverages.length ? <div className="horizontal-bars">{subjectAverages.map(({ name, average: score }) => <div className="horizontal-bar-row" key={name}><span>{name}</span><div><i style={{ width: `${Math.min(100, score)}%` }} /></div><strong>{score.toFixed(0)}</strong></div>)}</div> : <p className="chart-empty">No subject marks to analyze yet.</p>}</section>
      <section className="panel result-chart"><div className="panel-heading"><div><h2>Grade distribution</h2><p>Student count by overall grade</p></div></div><div className="grade-distribution">{gradeCounts.map(({ grade, count }) => <div key={grade}><span>{grade}</span><div><i style={{ height: `${results.length ? Math.max(count ? 6 : 0, count / results.length * 100) : 0}%` }} /></div><small>{count}</small></div>)}</div></section>
      <section className="panel result-chart"><div className="panel-heading"><div><h2>Pass vs fail</h2><p>Outcome for filtered students</p></div></div><div className="outcome-chart"><div className="outcome-ring" style={{ '--pass': `${results.length ? passed / results.length * 100 : 0}%` }}><strong>{results.length ? Math.round(passed / results.length * 100) : 0}%</strong><small>pass rate</small></div><div className="outcome-legend"><span><i className="pass-dot" /> Passed <strong>{passed}</strong></span><span><i className="fail-dot" /> Failed <strong>{results.length - passed}</strong></span></div></div></section>
      <section className="panel result-chart"><div className="panel-heading"><div><h2>Student comparison</h2><p>Top student percentages</p></div></div><div className="horizontal-bars student-comparison">{results.slice(0, 5).map(({ student, percentage }) => <div className="horizontal-bar-row" key={student.id}><span>{student.name}</span><div><i style={{ width: `${percentage}%` }} /></div><strong>{percentage.toFixed(0)}%</strong></div>)}</div></section></div>
    <section className="panel results-table-panel"><div className="panel-heading"><div><h2>Student results</h2><p>{results.length} students in current selection</p></div></div><div className="student-table-scroll"><table className="student-table results-table"><thead><tr><th>Rank</th><th>Roll number</th><th>Student name</th><th>Class</th><th>Total marks</th><th>Percentage</th><th>Grade</th><th>Result</th></tr></thead><tbody>{results.map(({ student, totalMarks, percentage, grade, result }, index) => <tr key={student.id}><td><strong>#{index + 1}</strong></td><td>{student.rollNumber}</td><td>{student.name}</td><td>{student.className}</td><td>{totalMarks}</td><td>{percentage.toFixed(1)}%</td><td><span className="grade-pill">{grade}</span></td><td><span className={`status-pill ${result === 'PASS' ? 'status-pass' : 'status-fail'}`}><i />{result}</span></td></tr>)}</tbody></table></div></section>
  </div>
}