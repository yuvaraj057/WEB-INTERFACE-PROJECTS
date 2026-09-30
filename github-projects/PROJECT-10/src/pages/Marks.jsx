import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Check, ClipboardList, RotateCcw, Save } from 'lucide-react'
import { useStudents } from '../StudentContext.jsx'
import { calculateStudent, DEFAULT_SUBJECTS, gradeFor, MARK_LIMITS, subjectTotal } from '../components/GradeCalculator.jsx'

function subjectsFor(student) {
  return student?.subjects?.length
    ? student.subjects.map((subject) => ({ ...subject }))
    : DEFAULT_SUBJECTS.map((name) => ({ name, internal: 0, assignment: 0, practical: 0, theory: 0 }))
}

export default function Marks() {
  const { students, saveStudent } = useStudents()
  const [searchParams] = useSearchParams()
  const requestedId = searchParams.get('student')
  const firstId = students.some((student) => student.id === requestedId) ? requestedId : students[0]?.id || ''
  const [selectedId, setSelectedId] = useState(firstId)
  const [drafts, setDrafts] = useState({})
  const [message, setMessage] = useState('')
  const activeId = students.some((item) => item.id === requestedId) ? requestedId : selectedId
  const student = students.find((item) => item.id === activeId)
  const rows = drafts[activeId] || subjectsFor(student)
  const draftStudent = student ? { ...student, subjects: rows.map((subject) => ({ ...subject, internal: Number(subject.internal) || 0, assignment: Number(subject.assignment) || 0, practical: Number(subject.practical) || 0, theory: Number(subject.theory) || 0 })) } : null
  const totals = draftStudent ? calculateStudent(draftStudent) : null

  function chooseStudent(id) {
    setSelectedId(id)
    setMessage('')
  }

  function updateMark(index, key, value) {
    if (value !== '' && (!/^\d{0,3}(\.\d{0,2})?$/.test(value) || Number(value) > MARK_LIMITS[key])) return
    setDrafts((current) => ({ ...current, [activeId]: (current[activeId] || subjectsFor(student)).map((subject, rowIndex) => rowIndex === index ? { ...subject, [key]: value } : subject) }))
    setMessage('')
  }

  function saveMarks(event) {
    event.preventDefault()
    if (!student || rows.some((subject) => Object.keys(MARK_LIMITS).some((key) => subject[key] === '' || Number(subject[key]) > MARK_LIMITS[key]))) {
      setMessage('Enter valid marks within each component limit before saving.')
      return
    }
    saveStudent({ ...student, subjects: draftStudent.subjects })
    setMessage('Marks saved successfully.')
  }

  function resetMarks() {
    setDrafts((current) => {
      const next = { ...current }
      delete next[activeId]
      return next
    })
    setMessage('Marks reset to the last saved values.')
  }

  if (!students.length) return <div className="empty-state marks-empty"><div><ClipboardList size={22} /></div><h3>Add a student first</h3><p>Student records are needed before marks can be entered.</p><Link to="/students/new" className="button button-primary">Add student</Link></div>

  return <div className="marks-page"><div className="page-intro"><div><div className="eyebrow"><ClipboardList size={15} /> ASSESSMENT ENTRY</div><h1>Marks management</h1><p>Enter subject marks and review calculated results before saving.</p></div><Link to="/reports" className="button button-outline">View reports</Link></div>
    <section className="panel marks-student-panel"><label className="marks-student-select"><span>Select student</span><select value={selectedId} onChange={(event) => chooseStudent(event.target.value)}>{students.map((item) => <option key={item.id} value={item.id}>{item.name} · Roll {item.rollNumber}</option>)}</select></label>{student && <div className="marks-student-details"><div><small>STUDENT</small><strong>{student.name}</strong></div><div><small>ROLL NUMBER</small><strong>{student.rollNumber}</strong></div><div><small>CLASS / SECTION</small><strong>{student.className} · {student.section}</strong></div><div><small>ACADEMIC YEAR</small><strong>{student.academicYear}</strong></div></div>}</section>
    {student && <form className="panel marks-entry-panel" onSubmit={saveMarks}><div className="panel-heading"><div><h2>Subject marks</h2><p>Maximum 100 marks per subject · Pass mark 40</p></div><span className="record-id">{student.studentId || student.id}</span></div><div className="marks-form-scroll"><table className="marks-entry-table marks-management-table"><thead><tr><th>Subject</th><th>Internal <small>/ 20</small></th><th>Assignment <small>/ 10</small></th><th>Practical <small>/ 20</small></th><th>Theory <small>/ 50</small></th><th>Total</th><th>Grade</th><th>Result</th></tr></thead><tbody>{rows.map((subject, index) => { const total = subjectTotal(subject); return <tr key={`${subject.name}-${index}`}><td><strong>{subject.name}</strong></td>{Object.keys(MARK_LIMITS).map((key) => <td key={key}><input type="number" min="0" max={MARK_LIMITS[key]} step="0.5" value={subject[key]} aria-label={`${subject.name} ${key}`} onChange={(event) => updateMark(index, key, event.target.value)} /></td>)}<td className="strong-cell">{total}</td><td><span className="grade-pill">{gradeFor(total)}</span></td><td><span className={`result-text ${total >= 40 ? 'pass' : 'fail'}`}>{total >= 40 ? 'PASS' : 'FAIL'}</span></td></tr> })}</tbody></table></div>
      {totals && <div className="marks-summary"><div><small>Total marks</small><strong>{totals.totalMarks} <i>/ {totals.maximumMarks}</i></strong></div><div><small>Percentage</small><strong>{totals.percentage.toFixed(1)}%</strong></div><div><small>Average</small><strong>{totals.averageMark.toFixed(1)}</strong></div><div><small>Overall grade</small><strong>{totals.grade}</strong></div><div><small>Overall result</small><strong className={totals.result === 'PASS' ? 'pass' : 'fail'}>{totals.result}</strong></div></div>}
      <div className="marks-form-footer">{message && <span className={`form-message ${message.startsWith('Marks saved') ? 'success' : ''}`} role="status">{message.startsWith('Marks saved') ? <Check size={14} /> : null}{message}</span>}<div><button type="button" className="button button-outline" onClick={resetMarks}><RotateCcw size={15} /> Reset</button><Link to={`/report/${student.id}`} className="button button-outline"><ArrowLeft size={15} /> Generate report</Link><button type="submit" className="button button-primary"><Save size={15} /> Save marks</button></div></div>
    </form>}
  </div>
}