import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, FileBadge2, FileText, Printer, Search, Users } from 'lucide-react'
import { useStudents } from '../StudentContext.jsx'
import { calculateStudent, studentRank } from '../components/GradeCalculator.jsx'

export default function Reports() {
  const { students } = useStudents()
  const [query, setQuery] = useState('')
  const [classFilter, setClassFilter] = useState('all')
  const [sectionFilter, setSectionFilter] = useState('all')
  const [yearFilter, setYearFilter] = useState('all')
  const [resultFilter, setResultFilter] = useState('all')
  const [gradeFilter, setGradeFilter] = useState('all')
  const markedStudents = students.filter((student) => student.subjects?.some((subject) => ['internal', 'assignment', 'practical', 'theory'].some((key) => Number(subject[key]) > 0)))
  const classes = [...new Set(markedStudents.map((student) => student.className))].sort()
  const sections = [...new Set(markedStudents.map((student) => student.section))].sort()
  const years = [...new Set(markedStudents.map((student) => student.academicYear))].sort()
  const records = markedStudents.filter((student) => {
    const totals = calculateStudent(student)
    const matchesQuery = `${student.name} ${student.rollNumber} ${student.department}`.toLowerCase().includes(query.toLowerCase())
    const matchesClass = classFilter === 'all' || student.className === classFilter
    const matchesSection = sectionFilter === 'all' || student.section === sectionFilter
    const matchesYear = yearFilter === 'all' || student.academicYear === yearFilter
    const matchesResult = resultFilter === 'all' || totals.result === resultFilter
    const matchesGrade = gradeFilter === 'all' || totals.grade === gradeFilter
    return matchesQuery && matchesClass && matchesSection && matchesYear && matchesResult && matchesGrade
  })
  const passedCount = markedStudents.filter((student) => calculateStudent(student).result === 'PASS').length
  const averagePercentage = markedStudents.length
    ? markedStudents.reduce((sum, student) => sum + calculateStudent(student).percentage, 0) / markedStudents.length
    : 0

  return <div className="reports-page">
    <div className="page-intro reports-intro"><div><div className="eyebrow"><FileText size={15} /> ACADEMIC RECORDS</div><h1>Report cards</h1><p>Review, filter, and print student academic records.</p></div><Link to="/students" className="button button-outline"><Users size={15} /> Student directory</Link></div>
    <section className="report-overview" aria-label="Report overview">
      <div><span className="report-overview-icon"><FileText size={17} /></span><small>Records available</small><strong>{markedStudents.length}</strong></div>
      <div><span className="report-overview-icon report-overview-green"><Users size={17} /></span><small>Students passed</small><strong>{passedCount}<em> / {markedStudents.length}</em></strong></div>
      <div><span className="report-overview-icon report-overview-violet">%</span><small>Average percentage</small><strong>{averagePercentage.toFixed(1)}<em>%</em></strong></div>
    </section>
    <section className="panel report-directory">
      <div className="report-directory-heading"><div><h2>Student records</h2><p>{records.length} report{records.length === 1 ? '' : 's'} match the current filters</p></div></div>
      <div className="report-directory-controls">
        <label className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search student or roll number" aria-label="Search reports" />{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">×</button>}</label>
        <label className="filter-box"><span className="sr-only">Filter by class</span><select value={classFilter} onChange={(event) => setClassFilter(event.target.value)}><option value="all">All classes</option>{classes.map((className) => <option key={className} value={className}>{className}</option>)}</select></label>
        <label className="filter-box"><span className="sr-only">Filter by section</span><select value={sectionFilter} onChange={(event) => setSectionFilter(event.target.value)}><option value="all">All sections</option>{sections.map((section) => <option key={section} value={section}>{section}</option>)}</select></label>
        <label className="filter-box"><span className="sr-only">Filter by academic year</span><select value={yearFilter} onChange={(event) => setYearFilter(event.target.value)}><option value="all">All years</option>{years.map((year) => <option key={year} value={year}>{year}</option>)}</select></label>
        <label className="filter-box"><span className="sr-only">Filter by result</span><select value={resultFilter} onChange={(event) => setResultFilter(event.target.value)}><option value="all">All results</option><option value="PASS">Passed</option><option value="FAIL">Failed</option></select></label>
        <label className="filter-box"><span className="sr-only">Filter by grade</span><select value={gradeFilter} onChange={(event) => setGradeFilter(event.target.value)}><option value="all">All grades</option>{['A+', 'A', 'B+', 'B', 'C', 'D', 'F'].map((grade) => <option key={grade}>{grade}</option>)}</select></label>
      </div>
      {records.length ? <div className="report-card-grid">{records.map((student) => {
        const totals = calculateStudent(student)
        return <article className="report-list-card" key={student.id}><div className="report-list-card-top"><span className="report-card-symbol"><FileBadge2 size={18} /></span><span className={`status-pill ${totals.result === 'PASS' ? 'status-pass' : 'status-fail'}`}><i />{totals.result}</span></div><h3>{student.name}</h3><p>Roll {student.rollNumber} <i /> {student.className} · Section {student.section}</p><div className="report-card-facts"><span><small>PERCENTAGE</small><strong>{totals.percentage.toFixed(1)}%</strong></span><span><small>GRADE</small><strong><span className="grade-pill">{totals.grade}</span></strong></span><span><small>CLASS RANK</small><strong>#{studentRank(students, student)}</strong></span></div><div className="report-card-actions"><Link to={`/report/${student.id}`} className="button button-outline button-small">View report <ArrowUpRight size={14} /></Link><Link to={`/report/${student.id}?print=1`} className="icon-button" aria-label={`Print ${student.name}'s report`} title="Print report"><Printer size={15} /></Link><Link to={`/report/${student.id}?print=1`} className="icon-button" aria-label={`Download ${student.name}'s report as PDF`} title="Save as PDF"><FileText size={15} /></Link></div></article>
      })}</div> : <div className="empty-state"><div><FileText size={22} /></div><h3>{markedStudents.length ? 'No matching reports' : 'No marks entered yet'}</h3><p>{markedStudents.length ? 'Change your search or filters to see more records.' : 'Enter and save subject marks to generate report cards.'}</p>{!markedStudents.length && <Link to="/marks" className="button button-primary">Enter marks</Link>}</div>}
      <div className="report-directory-footer">Reports use each student’s latest saved marks<span>Print or save as PDF from any report card</span></div>
    </section>
  </div>
}