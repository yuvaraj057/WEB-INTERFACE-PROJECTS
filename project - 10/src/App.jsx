import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import Students from './pages/Students.jsx'
import StudentDetail from './pages/StudentDetail.jsx'
import AddStudent from './pages/AddStudent.jsx'
import Marks from './pages/Marks.jsx'
import Report from './pages/Report.jsx'
import Reports from './pages/Reports.jsx'
import Results from './pages/Results.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Navbar from './components/Navbar.jsx'
import { StudentProvider } from './StudentProvider.jsx'
import './App.css'

function AppLayout() {
  const location = useLocation()
  const isReport = location.pathname.includes('/report/')

  if (isReport) {
    return <main className="report-route"><Routes><Route path="/report/:id" element={<Report />} /></Routes></main>
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-panel"><Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/new" element={<AddStudent />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/students/:id/edit" element={<AddStudent />} />
        <Route path="/marks" element={<Marks />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/results" element={<Results />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes></main>
    </div>
  )
}

export default function App() {
  return <StudentProvider><BrowserRouter><AppLayout /></BrowserRouter></StudentProvider>
}