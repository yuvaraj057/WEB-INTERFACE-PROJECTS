import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ClipboardList } from 'lucide-react'
import { useStudents } from '../StudentContext.jsx'
import StudentForm from '../components/StudentForm.jsx'

export default function AddStudent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { students, saveStudent } = useStudents()
  const student = id ? students.find((item) => item.id === id) : null

  if (id && !student) return <div className="not-found"><h1>Student not found</h1><Link to="/students">Return to students</Link></div>

  function handleSave(nextStudent) {
    saveStudent(nextStudent)
    navigate('/students', { state: { notice: student ? 'Student details updated.' : 'Student profile created. Add marks from the Marks page.' } })
  }

  return <div className="form-page"><Link to="/students" className="back-link"><ArrowLeft size={16} /> Back to students</Link><div className="page-intro form-intro"><div><div className="eyebrow"><ClipboardList size={15} /> STUDENT RECORD</div><h1>{student ? 'Edit student' : 'Add a student'}</h1><p>{student ? 'Update personal, guardian, and academic profile details.' : 'Create a student profile. Subject marks are entered separately.'}</p></div><span className="record-id">{student ? student.studentId || student.id : 'NEW RECORD'}</span></div><StudentForm initialStudent={student} onSave={handleSave} /></div>
}