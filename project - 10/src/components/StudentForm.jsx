import { useState } from 'react'
import { RotateCcw } from 'lucide-react'

const emptyStudent = {
  studentId: '', name: '', rollNumber: '', dateOfBirth: '', gender: '', className: '', section: '',
  department: '', academicYear: '2026-2027', email: '', phone: '', parentName: '', parentPhone: '', address: '',
}

const studentFields = [
  ['studentId', 'Student ID', 'text', 'e.g. ST-1025'], ['name', 'Student name', 'text', 'e.g. Ananya Raman'],
  ['rollNumber', 'Roll number', 'text', 'e.g. 101'], ['dateOfBirth', 'Date of birth', 'date', ''],
  ['gender', 'Gender', 'select', ''], ['className', 'Class', 'text', 'e.g. B.E. Computer Science'],
  ['section', 'Section', 'text', 'e.g. A'], ['department', 'Department', 'text', 'e.g. Computer Science'],
  ['academicYear', 'Academic year', 'text', 'e.g. 2026-2027'], ['email', 'Email address', 'email', 'student@school.edu'],
  ['phone', 'Mobile number', 'tel', '10-digit number'], ['parentName', 'Parent / guardian name', 'text', 'Full name'],
  ['parentPhone', 'Parent mobile number', 'tel', '10-digit number'], ['address', 'Home address', 'text', 'Street, city, postal code'],
]
const requiredFields = ['studentId', 'name', 'rollNumber', 'dateOfBirth', 'gender', 'className', 'section', 'department', 'academicYear', 'email', 'phone']

export default function StudentForm({ initialStudent, onSave }) {
  const [form, setForm] = useState(() => initialStudent ? { ...emptyStudent, ...initialStudent, studentId: initialStudent.studentId || initialStudent.id } : structuredClone(emptyStudent))
  const [errors, setErrors] = useState({})

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: '' }))
  }

  function validate() {
    const nextErrors = {}
    for (const [key, label] of studentFields.filter(([key]) => requiredFields.includes(key))) {
      if (!String(form[key] || '').trim()) nextErrors[key] = `${label} is required.`
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (form.phone && !/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) nextErrors.phone = 'Enter a valid 10-digit mobile number.'
    if (form.parentPhone && !/^\d{10}$/.test(form.parentPhone.replace(/\D/g, ''))) nextErrors.parentPhone = 'Enter a valid 10-digit mobile number.'
    if (form.studentId && !/^[A-Za-z0-9-]{3,20}$/.test(form.studentId)) nextErrors.studentId = 'Use 3–20 letters, numbers, or hyphens.'
    if (form.rollNumber && !/^[A-Za-z0-9/-]{1,20}$/.test(form.rollNumber)) nextErrors.rollNumber = 'Use letters, numbers, slash, or hyphen only.'
    if (form.dateOfBirth && (Number.isNaN(Date.parse(`${form.dateOfBirth}T00:00:00`)) || form.dateOfBirth > new Date().toISOString().slice(0, 10))) nextErrors.dateOfBirth = 'Enter a valid date of birth.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!validate()) return
    onSave({ ...initialStudent, ...form, id: initialStudent?.id || `ST-${Date.now().toString().slice(-6)}`, studentId: form.studentId.trim(), rollNumber: form.rollNumber.trim(), name: form.name.trim(), subjects: initialStudent?.subjects || [] })
  }

  function resetForm() {
    setForm(initialStudent ? { ...emptyStudent, ...initialStudent, studentId: initialStudent.studentId || initialStudent.id } : structuredClone(emptyStudent))
    setErrors({})
  }

  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      <section className="form-section"><div className="section-heading"><div><span className="step-index">01</span><div><h2>Student information</h2><p>Identity and academic details</p></div></div><span className="required-note">* Required fields</span></div>
        <div className="form-grid profile-form-grid">{studentFields.map(([key, label, type, placeholder]) => <label className={`field ${key === 'address' ? 'field-wide' : ''}`} key={key}><span>{label}{requiredFields.includes(key) && <i>*</i>}</span>{type === 'select' ? <select value={form[key] || ''} onChange={(event) => updateField(key, event.target.value)} aria-invalid={Boolean(errors[key])}><option value="">Select gender</option><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option></select> : key === 'address' ? <textarea rows="3" value={form[key] || ''} placeholder={placeholder} onChange={(event) => updateField(key, event.target.value)} aria-invalid={Boolean(errors[key])} /> : <input type={type} value={form[key] || ''} placeholder={placeholder} onChange={(event) => updateField(key, event.target.value)} aria-invalid={Boolean(errors[key])} />}{errors[key] && <small className="field-error">{errors[key]}</small>}</label>)}</div>
      </section>
      <div className="form-actions"><button type="button" className="button button-outline" onClick={resetForm}><RotateCcw size={16} /> Reset</button><button type="button" className="button button-outline" onClick={() => window.history.back()}>Cancel</button><button type="submit" className="button button-primary">Save student <span aria-hidden="true">→</span></button></div>
    </form>
  )
}