import React, { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

const Signup = () => {
    const { signup, isAuthenticated, isLoading } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [fieldErrors, setFieldErrors] = useState({})
    const [formError, setFormError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const redirectTo = location.state?.from || '/'

    if (!isLoading && isAuthenticated) {
        return <Navigate to={redirectTo} replace />
    }

    const updateField = (event) => {
        const { name, value } = event.target
        setForm((prev) => ({ ...prev, [name]: value }))
        setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSubmitting(true)
        setFormError('')
        setFieldErrors({})

        try {
            await signup(form.name.trim(), form.email.trim(), form.password)
            navigate(redirectTo, { replace: true })
        } catch (error) {
            setFormError(error.message)
            setFieldErrors(error.fieldErrors || {})
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <Navbar />
            <div className="auth-page">
                <div className="auth-card">
                    <h1>Create your account</h1>
                    <p className="auth-sub">One account for the whole store.</p>

                    <form onSubmit={handleSubmit} noValidate>
                        {formError !== '' && (
                            <div className="auth-alert" role="alert">
                                {formError}
                            </div>
                        )}

                        <label className="auth-field">
                            <span>Name</span>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={updateField}
                                autoComplete="name"
                                placeholder="Your name"
                                aria-invalid={fieldErrors.name ? 'true' : 'false'}
                            />
                            {fieldErrors.name && (
                                <small className="auth-error">{fieldErrors.name}</small>
                            )}
                        </label>

                        <label className="auth-field">
                            <span>Email</span>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={updateField}
                                autoComplete="email"
                                placeholder="you@example.com"
                                aria-invalid={fieldErrors.email ? 'true' : 'false'}
                            />
                            {fieldErrors.email && (
                                <small className="auth-error">{fieldErrors.email}</small>
                            )}
                        </label>

                        <label className="auth-field">
                            <span>Password</span>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={updateField}
                                autoComplete="new-password"
                                placeholder="At least 8 characters"
                                aria-invalid={fieldErrors.password ? 'true' : 'false'}
                            />
                            {fieldErrors.password ? (
                                <small className="auth-error">{fieldErrors.password}</small>
                            ) : (
                                <small className="auth-hint">Between 8 and 72 characters.</small>
                            )}
                        </label>

                        <button type="submit" className="auth-submit" disabled={submitting}>
                            {submitting ? 'Creating account…' : 'Create Account'}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Signup
