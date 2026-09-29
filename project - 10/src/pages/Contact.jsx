import { useState } from 'react'
import { Mail, MapPin, Phone, Send } from 'lucide-react'

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: '' }))
    setSent(false)
  }

  function submit(event) {
    event.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) next.phone = 'Enter a 10-digit phone number.'
    if (!form.subject.trim()) next.subject = 'Enter a subject.'
    if (form.message.trim().length < 10) next.message = 'Message must be at least 10 characters.'
    setErrors(next)
    if (!Object.keys(next).length) setSent(true)
  }

  function reset() {
    setForm(initialForm)
    setErrors({})
    setSent(false)
  }

  return <div className="contact-page"><div className="page-intro"><div><div className="eyebrow"><Mail size={15} /> CONTACT</div><h1>Let’s talk</h1><p>Reach the Student Report Card Management System team for product support and academic workflow questions.</p></div></div><div className="contact-layout"><section className="contact-information"><span className="contact-kicker">WE’RE HERE TO HELP</span><h2>Make your next school year a little simpler.</h2><p>Send us a note and our team will get back to you during business hours.</p><div className="contact-detail"><MapPin size={18} /><span><strong>Visit</strong><small>12 College Road, Chennai, Tamil Nadu</small></span></div><div className="contact-detail"><Mail size={18} /><span><strong>Email</strong><small>hello@edureport.edu</small></span></div><div className="contact-detail"><Phone size={18} /><span><strong>Call</strong><small>+91 44 4000 2026</small></span></div><div className="contact-hours">MONDAY – FRIDAY <strong>9:00 AM – 5:00 PM IST</strong></div></section><form className="panel contact-form" onSubmit={submit} noValidate><div className="contact-form-heading"><h2>Send a message</h2><p>Fields marked * are required.</p></div><div className="contact-form-grid">{[['name', 'Full name', 'text'], ['email', 'Email address', 'email'], ['phone', 'Phone number', 'tel'], ['subject', 'Subject', 'text']].map(([key, label, type]) => <label className="field" key={key}><span>{label}<i>*</i></span><input type={type} value={form[key]} onChange={(event) => update(key, event.target.value)} aria-invalid={Boolean(errors[key])} />{errors[key] && <small className="field-error">{errors[key]}</small>}</label>)}</div><label className="field contact-message"><span>Message<i>*</i></span><textarea rows="5" value={form.message} onChange={(event) => update('message', event.target.value)} aria-invalid={Boolean(errors.message)} />{errors.message && <small className="field-error">{errors.message}</small>}</label>{sent && <p className="contact-success" role="status">Thanks, {form.name}. Your message is ready for our team.</p>}<div className="contact-form-actions"><button className="button button-outline" type="button" onClick={reset}>Reset</button><button className="button button-primary" type="submit"><Send size={15} /> Send message</button></div></form></div></div>
}