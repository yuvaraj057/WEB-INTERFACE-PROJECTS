import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, SlidersHorizontal, Users } from 'lucide-react'
import { useStudents } from '../StudentContext.jsx'
import StudentList from '../components/StudentList.jsx'
import { calculateStudent } from '../components/GradeCalculator.jsx'
import './Students.css'

export default function Students() {
  const { students, deleteStudent } = useStudents()
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [classFilter, setClassFilter] = useState('all')
  const [sectionFilter, setSectionFilter] = useState('all')
  const [resultFilter, setResultFilter] = useState('all')
  const classes = [...new Set(students.map((student) => student.className))].sort()
  const sections = [...new Set(students.map((student) => student.section))].sort()
  const filtered = useMemo(() => students.filter((student) => {
    const matchesQuery = `${student.name} ${student.rollNumber} ${student.department}`.toLowerCase().includes(query.toLowerCase())
    const matchesClass = classFilter === 'all' || student.className === classFilter
    const matchesSection = sectionFilter === 'all' || student.section === sectionFilter
    const matchesResult = resultFilter === 'all' || calculateStudent(student).result === resultFilter
    return matchesQuery && matchesClass && matchesSection && matchesResult
  }), [students, query, classFilter, sectionFilter, resultFilter])

  function confirmDelete(student) {
    if (window.confirm(`Delete ${student.name} and their report card? This cannot be undone.`)) deleteStudent(student.id)
  }

  return <div className="roster-page"><div className="page-intro"><div><div className="eyebrow"><Users size={15} /> STUDENT DIRECTORY</div><h1>Student management</h1><p>{students.length} student records · Manage profiles and academic results.</p></div><Link to="/students/new" className="button button-primary">＋ Add student</Link></div>{location.state?.notice && <p className="notice-banner" role="status">{location.state.notice}</p>}<section className="panel roster-panel"><div className="roster-toolbar"><div className="roster-count"><strong>{filtered.length}</strong> students <span>in this view</span></div><label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name or roll number" aria-label="Search students by name or roll number" />{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">×</button>}</label><label className="filter-box"><SlidersHorizontal size={16} /><select value={classFilter} onChange={(event) => setClassFilter(event.target.value)} aria-label="Filter by class"><option value="all">All classes</option>{classes.map((className) => <option key={className} value={className}>{className}</option>)}</select></label><label className="filter-box"><select value={sectionFilter} onChange={(event) => setSectionFilter(event.target.value)} aria-label="Filter by section"><option value="all">All sections</option>{sections.map((section) => <option key={section} value={section}>{section}</option>)}</select></label><label className="filter-box"><select value={resultFilter} onChange={(event) => setResultFilter(event.target.value)} aria-label="Filter by result"><option value="all">All results</option><option value="PASS">Passed</option><option value="FAIL">Failed</option></select></label></div><StudentList students={filtered} onDelete={confirmDelete} /><div className="roster-footer">Showing {filtered.length} of {students.length} students<span>Results update automatically when marks are changed.</span></div></section></div>
}