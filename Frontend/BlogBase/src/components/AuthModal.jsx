"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { motion, AnimatePresence } from "framer-motion"

const AuthModal = ({ isLogin, onClose, onSwitchMode }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    try {
      if (isLogin) {
        login(email, password)
      } else {
        if (!name) {
          setError("Name is required")
          return
        }
        signup(name, email, password)
      }
      onClose()
      navigate("/dashboard")
    } catch (error) {
      setError("Authentication failed. Please try again.")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md z-10 relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            ✕
          </button>

          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            {isLogin ? "Welcome Back" : "Join BlogBase"}
          </h2>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="Your name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button onClick={onSwitchMode} className="ml-1 text-gray-800 font-medium hover:underline">
                {isLogin ? "Sign up" : "Login"}
              </button>
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default AuthModal
