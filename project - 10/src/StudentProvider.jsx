import { useEffect, useState } from 'react'
import { StudentContext } from './StudentContext.jsx'

const STORAGE_KEY = 'scholarsuite-students'

const demoSubjects = [
  { name: 'Tamil', internal: 18, assignment: 9, practical: 18, theory: 43 },
  { name: 'English', internal: 19, assignment: 9, practical: 18, theory: 44 },
  { name: 'Mathematics', internal: 20, assignment: 10, practical: 19, theory: 47 },
  { name: 'Physics', internal: 18, assignment: 9, practical: 18, theory: 42 },
  { name: 'Chemistry', internal: 19, assignment: 9, practical: 18, theory: 45 },
  { name: 'Computer Science', internal: 20, assignment: 10, practical: 20, theory: 48 },
]

const initialStudents = [
  { id: 'ST-1001', name: 'Ananya Raman', rollNumber: '101', className: 'B.E. Computer Science', section: 'A', department: 'Computer Science', academicYear: '2026-2027', dateOfBirth: '2007-04-12', email: 'ananya.raman@school.edu', phone: '+91 98765 43210', subjects: demoSubjects },
  { id: 'ST-1002', name: 'Arjun Kumar', rollNumber: '102', className: 'B.E. Computer Science', section: 'A', department: 'Computer Science', academicYear: '2026-2027', dateOfBirth: '2007-08-22', email: 'arjun.kumar@school.edu', phone: '+91 98765 43211', subjects: demoSubjects.map((subject, index) => ({ ...subject, internal: Math.max(0, subject.internal - (index % 3)), theory: Math.max(0, subject.theory - (index % 4) - 2) })) },
  { id: 'ST-1003', name: 'Meera Krishnan', rollNumber: '103', className: 'B.E. Computer Science', section: 'B', department: 'Computer Science', academicYear: '2026-2027', dateOfBirth: '2007-01-30', email: 'meera.krishnan@school.edu', phone: '+91 98765 43212', subjects: demoSubjects.map((subject, index) => ({ ...subject, internal: Math.max(0, subject.internal - (index % 2) - 2), theory: Math.max(0, subject.theory - (index % 4) - 7) })) },
  { id: 'ST-1004', name: 'Rohan Dev', rollNumber: '104', className: 'B.E. Computer Science', section: 'B', department: 'Computer Science', academicYear: '2026-2027', dateOfBirth: '2007-11-05', email: 'rohan.dev@school.edu', phone: '+91 98765 43213', subjects: demoSubjects.map((subject, index) => ({ ...subject, internal: index === 3 ? 7 : subject.internal - 4, assignment: index === 3 ? 4 : subject.assignment - 2, practical: index === 3 ? 7 : subject.practical - 3, theory: index === 3 ? 18 : subject.theory - 11 })) },
]

export function StudentProvider({ children }) {
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : initialStudents
    } catch {
      return initialStudents
    }
  })
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('scholarsuite-theme') === 'dark')

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(students)), [students])
  useEffect(() => {
    localStorage.setItem('scholarsuite-theme', darkMode ? 'dark' : 'light')
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  function saveStudent(student) {
    setStudents((current) => {
      const exists = current.some((item) => item.id === student.id)
      return exists ? current.map((item) => item.id === student.id ? student : item) : [...current, student]
    })
  }

  function deleteStudent(id) {
    setStudents((current) => current.filter((student) => student.id !== id))
  }

  return <StudentContext.Provider value={{ students, saveStudent, deleteStudent, darkMode, setDarkMode }}>{children}</StudentContext.Provider>
}