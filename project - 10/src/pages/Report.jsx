import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useStudents } from '../StudentContext.jsx'
import ReportCard from '../components/ReportCard.jsx'

export default function Report() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const { students } = useStudents()
  const student = students.find((item) => item.id === id)
  const shouldPrint = searchParams.get('print') === '1'
  useEffect(() => {
    if (shouldPrint && student) window.print()
  }, [shouldPrint, student])
  if (!student) return <div className="report-not-found"><h1>Report card unavailable</h1><p>This student may have been removed from the directory.</p><Link to="/students" className="button button-primary"><ArrowLeft size={16} /> Return to students</Link></div>
  return <div className="report-page"><div className="report-toolbar"><Link to="/students" className="back-link"><ArrowLeft size={16} /> Back to students</Link><span>REPORT PREVIEW <i /> {student.academicYear}</span></div><ReportCard student={student} students={students} /></div>
}