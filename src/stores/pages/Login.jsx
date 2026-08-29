import React, { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const { login, isAuthenticated, isLoading } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const [form, setForm] = useState({ email: '', password: '' })
    const [fieldErrors, setFieldErrors] = useState({})
    const [formError, setFormError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    // Where to land after signing in: back where they came from, else the storefront.
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
            await login(form.email.trim(), form.password)
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
                    <h1>Welcome back</h1>
                    <p className="auth-sub">Sign in to continue shopping.</p>

                    <form onSubmit={handleSubmit} noValidate>
                        {formError !== '' && (
                            <div className="auth-alert" role="alert">
                                {formError}
                            </div>
                        )}

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
                                autoComplete="current-password"
                                placeholder="Your password"
                                aria-invalid={fieldErrors.password ? 'true' : 'false'}
                            />
                            {fieldErrors.password && (
                                <small className="auth-error">{fieldErrors.password}</small>
                            )}
                        </label>

                        <button type="submit" className="auth-submit" disabled={submitting}>
                            {submitting ? 'Signing in…' : 'Sign In'}
                        </button>
                    </form>

                    <p className="auth-switch">
                        New here? <Link to="/signup">Create an account</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login
