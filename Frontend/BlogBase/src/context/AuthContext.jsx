"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Simulate checking for a saved user in localStorage
    useEffect(() => {
        const savedUser = localStorage.getItem("blogbase_user")
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])

    // Login function
    const login = (email, password) => {
        // This is a mock login - in a real app, you'd validate against a backend
        const user = { id: 1, name: "Grogu", email }
        setCurrentUser(user)
        localStorage.setItem("blogbase_user", JSON.stringify(user))
        return user
    }

    // Signup function
    const signup = (name, email, password) => {
        // This is a mock signup - in a real app, you'd create a user in your backend
        const user = { id: Date.now(), name, email }
        setCurrentUser(user)
        localStorage.setItem("blogbase_user", JSON.stringify(user))
        return user
    }

    // Logout function
    const logout = () => {
        setCurrentUser(null)
        localStorage.removeItem("blogbase_user")
    }

    const value = {
        currentUser,
        login,
        signup,
        logout,
    }

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
