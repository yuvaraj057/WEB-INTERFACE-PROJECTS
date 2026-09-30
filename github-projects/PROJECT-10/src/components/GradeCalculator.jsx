export const MARK_LIMITS = { internal: 20, assignment: 10, practical: 20, theory: 50 }
export const DEFAULT_SUBJECTS = ['Tamil', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Computer Science']

export function subjectTotal(subject) {
  return ['internal', 'assignment', 'practical', 'theory'].reduce((total, key) => total + (Number(subject[key]) || 0), 0)
}

export function gradeFor(percentage) {
  if (percentage >= 90) return 'A+'
  if (percentage >= 80) return 'A'
  if (percentage >= 70) return 'B+'
  if (percentage >= 60) return 'B'
  if (percentage >= 50) return 'C'
  if (percentage >= 40) return 'D'
  return 'F'
}

export function calculateStudent(student) {
  const subjectCount = student.subjects?.length || 0
  const maximumMarks = subjectCount * 100
  const totalMarks = (student.subjects || []).reduce((total, subject) => total + subjectTotal(subject), 0)
  const percentage = maximumMarks ? (totalMarks / maximumMarks) * 100 : 0
  const averageMark = subjectCount ? totalMarks / subjectCount : 0
  const passed = subjectCount > 0 && student.subjects.every((subject) => subjectTotal(subject) >= 40)
  return { totalMarks, maximumMarks, percentage, averageMark, grade: gradeFor(percentage), result: passed ? 'PASS' : 'FAIL' }
}

export function studentRank(students, student) {
  const target = calculateStudent(student).percentage
  const peers = students.filter((item) => item.className === student.className && item.section === student.section && item.academicYear === student.academicYear)
  return 1 + peers.filter((item) => calculateStudent(item).percentage > target).length
}