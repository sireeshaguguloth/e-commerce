import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'

const API = '/api/auth'

/**
 * The backend rotates the refresh token on every /refresh call and treats a second
 * use of an already-rotated token as theft, revoking every session for that user.
 * React StrictMode runs effects twice in development, so two refreshes firing at
 * once would both send the same cookie and trip that defence, logging the user
 * straight out. Sharing one in-flight promise keeps it to a single request.
 */
let inFlightRefresh = null

/** Thrown by login/signup so forms can read both the message and the per-field errors. */
export class ApiError extends Error {
    constructor(message, fieldErrors) {
        super(message)
        this.name = 'ApiError'
        this.fieldErrors = fieldErrors || {}
    }
}

const toApiError = async (response) => {
    try {
        const body = await response.json()
        return new ApiError(
            body.message || 'Something went wrong. Please try again.',
            body.fieldErrors
        )
    } catch {
        // Backend down, or a proxy returned HTML instead of JSON.
        return new ApiError(
            response.status === 502 || response.status === 504
                ? 'Cannot reach the server. Is the backend running on port 8081?'
                : `Request failed (${response.status})`
        )
    }
}

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    // 'loading' until the silent refresh settles, so the navbar does not flash
    // "SignIn / SignUp" at someone who is actually still logged in.
    const [status, setStatus] = useState('loading')

    // The access token is deliberately kept in a ref rather than localStorage: it
    // never touches disk, so an XSS bug cannot walk off with a durable credential.
    const tokenRef = useRef(null)
    const didBootstrap = useRef(false)

    const applySession = useCallback((payload) => {
        tokenRef.current = payload.accessToken
        setUser(payload.user)
        setStatus('authenticated')
    }, [])

    const clearSession = useCallback(() => {
        tokenRef.current = null
        setUser(null)
        setStatus('anonymous')
    }, [])

    /**
     * Trades the httpOnly refresh cookie for a new access token. The cookie survives
     * a page reload even though the token in memory does not, which is what makes the
     * session feel persistent without storing anything stealable.
     */
    const refresh = useCallback(async () => {
        if (!inFlightRefresh) {
            const request = fetch(`${API}/refresh`, {
                method: 'POST',
                credentials: 'include',
            })
                .then((response) => (response.ok ? response.json() : null))
                .catch(() => null)

            inFlightRefresh = request
            request.finally(() => {
                if (inFlightRefresh === request) {
                    inFlightRefresh = null
                }
            })
        }

        const payload = await inFlightRefresh
        if (payload && payload.accessToken) {
            applySession(payload)
            return payload.accessToken
        }
        clearSession()
        return null
    }, [applySession, clearSession])

    // One silent refresh on boot. The ref guard survives StrictMode's double mount.
    useEffect(() => {
        if (didBootstrap.current) return
        didBootstrap.current = true
        refresh()
    }, [refresh])

    const submitCredentials = useCallback(
        async (path, body) => {
            const response = await fetch(`${API}/${path}`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })

            if (!response.ok) {
                throw await toApiError(response)
            }
            applySession(await response.json())
        },
        [applySession]
    )

    const login = useCallback(
        (email, password) => submitCredentials('login', { email, password }),
        [submitCredentials]
    )

    const signup = useCallback(
        (name, email, password) => submitCredentials('signup', { name, email, password }),
        [submitCredentials]
    )

    const logout = useCallback(async () => {
        try {
            await fetch(`${API}/logout`, { method: 'POST', credentials: 'include' })
        } catch {
            // Network down: still drop the session locally rather than stranding the user.
        } finally {
            clearSession()
        }
    }, [clearSession])

    /**
     * fetch() for any protected endpoint. Attaches the bearer token and, when the
     * 15-minute access token has expired, refreshes once and replays the request.
     * Bodies must be strings or plain objects, not streams, so the replay can reuse them.
     */
    const authFetch = useCallback(
        async (input, init = {}) => {
            const withAuth = (token) => ({
                ...init,
                credentials: 'include',
                headers: {
                    ...(init.headers || {}),
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            })

            const response = await fetch(input, withAuth(tokenRef.current))
            if (response.status !== 401) return response

            const freshToken = await refresh()
            if (!freshToken) return response
            return fetch(input, withAuth(freshToken))
        },
        [refresh]
    )

    const value = useMemo(
        () => ({
            user,
            status,
            isAuthenticated: status === 'authenticated',
            isLoading: status === 'loading',
            login,
            signup,
            logout,
            refresh,
            authFetch,
        }),
        [user, status, login, signup, logout, refresh, authFetch]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used inside an AuthProvider')
    }
    return context
}
