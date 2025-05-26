"use client"
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Dashboard from "./components/Dashboard"
import {AuthProvider, useAuth} from "./context/AuthContext"
import "./App.css"
import PublicBlogPage from "./components/PublicBlogPage.jsx";

// Protected route component
const ProtectedRoute = ({children}) => {
    const {user} = useAuth()

    if (!user) {
        return <Navigate to="/"/>
    }
    return children
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard/>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/blog/public/:id" element={<PublicBlogPage/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
