"use client"

import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {useAuth} from "../context/AuthContext"
import AuthModal from "./AuthModal"
import {motion} from "framer-motion"
import {allPublished} from "../services/landingPageService.js";

const LandingPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [view, setView] = useState("home")
    const {currentUser, logout} = useAuth()
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState({})

    const handleAuthClick = (isLoginMode) => {
        setIsLogin(isLoginMode)
        setShowModal(true)
    }

    const handleCreateBlog = () => {
        if (currentUser) {
            navigate("/dashboard")
        } else {
            setIsLogin(false) // Set to signup mode
            setShowModal(true)
        }
    }

    const handleView = async function () {
        let response
        if (view === "home") {
            response = await allPublished();
            setBlogs(response)
            console.log(response)
        }
        setView(view === "home" ? "published" : "home");
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
            {/* Navigation */}
            <nav className="px-6 py-4 flex justify-between items-center">
                <motion.div
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="text-2xl font-bold text-gray-800 cursor-pointer"
                >
                    BlogBase
                </motion.div>
                <div className="flex gap-4">

                    <button
                        onClick={handleView}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        {view === "home" ? "View Published" : "Back to Home"}
                    </button>

                    {currentUser ? (
                        <>
                            <span className="text-gray-600">Hello, {currentUser.name}</span>
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                            >
                                My Blogs
                            </button>
                            <button
                                onClick={logout}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => handleAuthClick(true)}
                                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => handleAuthClick(false)}
                                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {view === "home" ? (
                <>
                    {/* Hero Section */}
                    <motion.section
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.8}}
                        className="max-w-6xl mx-auto px-6 py-20 text-center"
                    >
                        <motion.h1
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.2, duration: 0.6}}
                            className="text-5xl font-bold text-gray-800 mb-6"
                        >
                            Share Your Story with the World
                        </motion.h1>
                        <motion.p
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.4, duration: 0.6}}
                            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
                        >
                            Join a thriving community of writers, thinkers, and creators. BlogBase is where ideas come
                            to life and
                            experiences are shared.
                        </motion.p>
                        <motion.button
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.6, duration: 0.6}}
                            onClick={handleCreateBlog}
                            className="px-8 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-lg cursor-pointer"
                        >
                            Create Your Own Blog
                        </motion.button>
                    </motion.section>

                    {/* Features Section */}
                    <section className="pb-16 bg-white">
                        <div className="max-w-6xl mx-auto px-6">
                            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Join BlogBase?</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                <motion.div
                                    initial={{opacity: 0, y: 20}}
                                    whileInView={{opacity: 1, y: 0}}
                                    transition={{duration: 0.5}}
                                    viewport={{once: true}}
                                    className="p-6 bg-gray-100 rounded-lg shadow-md"
                                >
                                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Join Communities</h3>
                                    <p className="text-gray-600">
                                        Connect with like-minded individuals in tech, art, science, and more. Find your
                                        tribe and grow together.
                                    </p>
                                </motion.div>
                                <motion.div
                                    initial={{opacity: 0, y: 20}}
                                    whileInView={{opacity: 1, y: 0}}
                                    transition={{duration: 0.5, delay: 0.2}}
                                    viewport={{once: true}}
                                    className="p-6 bg-gray-100 rounded-lg shadow-md"
                                >
                                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Share Experiences</h3>
                                    <p className="text-gray-600">
                                        Your journey matters. Share your experiences, insights, and lessons learned with
                                        a global audience.
                                    </p>
                                </motion.div>
                                <motion.div
                                    initial={{opacity: 0, y: 20}}
                                    whileInView={{opacity: 1, y: 0}}
                                    transition={{duration: 0.5, delay: 0.4}}
                                    viewport={{once: true}}
                                    className="p-6 bg-gray-100 rounded-lg shadow-md"
                                >
                                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Grow Your Skills</h3>
                                    <p className="text-gray-600">
                                        Improve your writing, receive feedback, and build a portfolio of content that
                                        showcases your expertise.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Testimonials */}
                    <section className="py-16 bg-gray-50">
                        <div className="max-w-6xl mx-auto px-6">
                            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Community
                                Says</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <motion.div
                                    initial={{opacity: 0, x: -20}}
                                    whileInView={{opacity: 1, x: 0}}
                                    transition={{duration: 0.5}}
                                    viewport={{once: true}}
                                    className="p-6 bg-white rounded-lg shadow-md"
                                >
                                    <p className="text-gray-600 mb-4">
                                        "BlogBase has transformed how I share my tech journey. The community feedback
                                        has been invaluable for my
                                        growth as a developer."
                                    </p>
                                    <p className="font-medium text-gray-800">- Alex Chen, Software Engineer</p>
                                </motion.div>
                                <motion.div
                                    initial={{opacity: 0, x: 20}}
                                    whileInView={{opacity: 1, x: 0}}
                                    transition={{duration: 0.5}}
                                    viewport={{once: true}}
                                    className="p-6 bg-white rounded-lg shadow-md"
                                >
                                    <p className="text-gray-600 mb-4">
                                        "I've found my voice through writing on BlogBase. The platform is intuitive and
                                        the community is so
                                        supportive."
                                    </p>
                                    <p className="font-medium text-gray-800">- Maya Johnson, Content Creator</p>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Call to Action */}
                    <section className="py-20 bg-white">
                        <div className="max-w-4xl mx-auto px-6 text-center">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Start Your Blogging
                                Journey?</h2>
                            <p className="text-xl text-gray-600 mb-8">
                                Join thousands of writers who have already found their home on BlogBase.
                            </p>
                            <button
                                onClick={handleCreateBlog}
                                className="px-8 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-lg cursor-pointer"
                            >
                                Create Your Own Blog
                            </button>
                        </div>
                    </section>
                </>
            ) : (
                <>
                    {/* Published Blogs Section */}
                    <section className="py-20 bg-white">
                        <div className="max-w-6xl mx-auto px-6">
                            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                                Published Blogs
                            </h2>

                            {/* Check if users exist and map through them */}
                            <div className="">
                                {blogs.map((user) =>
                                    user.blogs.length > 0 ? (
                                        user.blogs.map((blog, index) => (
                                            <motion.div
                                                initial={{opacity: 0, y: 20}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{duration: 0.4}}
                                                key={`${user.username}-${index}`}
                                                className="p-4 bg-gray-100 rounded shadow mb-4"
                                            >
                                                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                                                    {blog.title || "Untitled Blog"}
                                                </h3>
                                                <p className="text-gray-600 text-sm">
                                                    {blog.content || "No description available."}
                                                </p>
                                                <p className="text-sm text-gray-400 mt-2">
                                                    by {user.firstName} {user.lastName}
                                                </p>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div
                                            key={user.username}
                                            className="p-4 mb-4 bg-gray-50 rounded shadow col-span-1 text-center text-sm text-gray-500"
                                        >
                                            {user.firstName} {user.lastName} hasn’t published any blogs.
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </section>
                </>

            )}

            {/* Footer */}
            <footer className="py-8 bg-gray-100">
                <div className="max-w-6xl mx-auto px-6 text-center text-gray-600">
                    <p>© {new Date().getFullYear()} BlogBase. All rights reserved.</p>
                </div>
            </footer>

            {/* Auth Modal */}
            {showModal && (
                <AuthModal isLogin={isLogin} onClose={() => setShowModal(false)}
                           onSwitchMode={() => setIsLogin(!isLogin)}/>
            )}
        </div>
    )
}

export default LandingPage
