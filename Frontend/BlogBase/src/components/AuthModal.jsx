"use client"

import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {AnimatePresence, motion} from "framer-motion"
import {login, signup} from "../services/authService.js";
import {useAuth} from "../context/AuthContext.jsx";

const AuthModal = ({isLogin, onClose, onSwitchMode}) => {

    const [error, setError] = useState("")
    const navigate = useNavigate()
    const {authLogin} = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            let response;
            if (isLogin) {
                response = await login(formData);
            } else {
                if (!formData.username) {
                    setError("Name is required");
                    return;
                }
                response = await signup(formData);
            }
            console.log("Authenticated user:", response); // optional debug
            authLogin(response);

            onClose();
            navigate("/dashboard");

        } catch (error) {
            console.error("Auth error:", error);
            const message = error.response?.data?.message || "Authentication failed. Please try again.";
            setError(message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Background overlay */}
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 0.7}}
                exit={{opacity: 0}}
                className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Animate modal shell size with layout */}
            <motion.div
                layout
                transition={{type: "spring", damping: 20, stiffness: 150}}
                className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md z-10 relative overflow-hidden"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={isLogin.toString()} // switch key triggers AnimatePresence
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -10}}
                        transition={{duration: 0.1}}
                        layout // enables auto height animation
                    >
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                            {isLogin ? "Welcome Back" : "Join BlogBase"}
                        </h2>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <motion.div layout>
                                    <div className="flex justify-between gap-2 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">First
                                                Name</label>
                                            <input
                                                name="firstName"
                                                type="text"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Last
                                                Name</label>
                                            <input
                                                name="lastName"
                                                type="text"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                                        required
                                    />
                                </motion.div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <input
                                    name="username"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
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
                                <button
                                    onClick={onSwitchMode}
                                    className="ml-1 text-gray-800 font-medium hover:underline"
                                >
                                    {isLogin ? "Sign up" : "Login"}
                                </button>
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default AuthModal
