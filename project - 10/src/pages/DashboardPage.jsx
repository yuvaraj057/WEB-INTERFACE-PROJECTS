import { useStudents } from '../StudentContext.jsx'
import Dashboard from '../components/Dashboard.jsx'

export default function DashboardPage() {
  const { students } = useStudents()
  return <div className="page-content"><Dashboard students={students} /></div>
}