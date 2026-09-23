import { useState } from 'react'

const initialValues = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
}

function validate(values) {
	const nextErrors = {}

	if (!values.name.trim()) nextErrors.name = 'Name is required.'
	if (!values.email.trim()) {
		nextErrors.email = 'Email is required.'
	} else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
		nextErrors.email = 'Enter a valid email address.'
	}
	if (values.password.length < 8) {
		nextErrors.password = 'Password must be at least 8 characters.'
	}
	if (values.confirmPassword !== values.password) {
		nextErrors.confirmPassword = 'Passwords do not match.'
	}

	return nextErrors
}

function FormValidation() {
	const [values, setValues] = useState(initialValues)
	const [errors, setErrors] = useState({})
	const [submitted, setSubmitted] = useState(false)

	function handleChange(event) {
		const { name, value } = event.target
		setValues((currentValues) => ({ ...currentValues, [name]: value }))
		setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
		setSubmitted(false)
	}

	function handleSubmit(event) {
		event.preventDefault()
		const nextErrors = validate(values)
		setErrors(nextErrors)
		setSubmitted(Object.keys(nextErrors).length === 0)
	}

	return (
		<section className="form-card" aria-labelledby="form-title">
			<p className="eyebrow">React form validation</p>
			<h2 id="form-title">Create an account</h2>
			<p className="form-description">All fields are checked before the form is submitted.</p>

			<form onSubmit={handleSubmit} noValidate>
				<label htmlFor="name">Name</label>
				<input
					id="name"
					name="name"
					type="text"
					value={values.name}
					onChange={handleChange}
					aria-invalid={Boolean(errors.name)}
					aria-describedby={errors.name ? 'name-error' : undefined}
				/>
				{errors.name && <p id="name-error" className="field-error">{errors.name}</p>}

				<label htmlFor="email">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					value={values.email}
					onChange={handleChange}
					aria-invalid={Boolean(errors.email)}
					aria-describedby={errors.email ? 'email-error' : undefined}
				/>
				{errors.email && <p id="email-error" className="field-error">{errors.email}</p>}

				<label htmlFor="password">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					value={values.password}
					onChange={handleChange}
					aria-invalid={Boolean(errors.password)}
					aria-describedby={errors.password ? 'password-error' : undefined}
				/>
				{errors.password && <p id="password-error" className="field-error">{errors.password}</p>}

				<label htmlFor="confirmPassword">Confirm password</label>
				<input
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					value={values.confirmPassword}
					onChange={handleChange}
					aria-invalid={Boolean(errors.confirmPassword)}
					aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
				/>
				{errors.confirmPassword && (
					<p id="confirm-password-error" className="field-error">{errors.confirmPassword}</p>
				)}

				<button type="submit">Submit</button>
				{submitted && <p className="success-message" role="status">Form submitted successfully.</p>}
			</form>
		</section>
	)
}

export default FormValidation
