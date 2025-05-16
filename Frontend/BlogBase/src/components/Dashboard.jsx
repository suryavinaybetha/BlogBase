"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import BlogEditor from "./BlogEditor"
import { motion, AnimatePresence } from "framer-motion"

const Dashboard = () => {
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])
    const [showEditor, setShowEditor] = useState(false)
    const [currentBlog, setCurrentBlog] = useState(null)

    // Load blogs from localStorage
    useEffect(() => {
        const savedBlogs = localStorage.getItem(`blogbase_blogs_${currentUser.id}`)
        if (savedBlogs) {
            setBlogs(JSON.parse(savedBlogs))
        }
    }, [currentUser.id])

    // Save blogs to localStorage
    const saveBlogs = (updatedBlogs) => {
        localStorage.setItem(`blogbase_blogs_${currentUser.id}`, JSON.stringify(updatedBlogs))
        setBlogs(updatedBlogs)
    }

    const handleCreateBlog = () => {
        setCurrentBlog(null)
        setShowEditor(true)
    }

    const handleEditBlog = (blog) => {
        setCurrentBlog(blog)
        setShowEditor(true)
    }

    const handleDeleteBlog = (blogId) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            const updatedBlogs = blogs.filter((blog) => blog.id !== blogId)
            saveBlogs(updatedBlogs)
        }
    }

    const handleSaveBlog = (blogData) => {
        let updatedBlogs

        if (currentBlog) {
            // Edit existing blog
            updatedBlogs = blogs.map((blog) => (blog.id === currentBlog.id ? { ...blog, ...blogData } : blog))
        } else {
            // Create new blog
            const newBlog = {
                id: Date.now(),
                ...blogData,
                author: currentUser.name,
                authorId: currentUser.id,
                createdAt: new Date().toISOString(),
            }
            updatedBlogs = [...blogs, newBlog]
        }

        saveBlogs(updatedBlogs)
        setShowEditor(false)
    }

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <button onClick={() => navigate("/")} className="text-2xl font-bold text-gray-800">
                            BlogBase
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">Hello, {currentUser.name}</span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Dashboard Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Your Blog Shelf</h1>
                    <button
                        onClick={handleCreateBlog}
                        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                        Create New Blog
                    </button>
                </div>

                {/* Blog List */}
                {blogs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 mb-4">You haven't created any blogs yet.</p>
                        <button
                            onClick={handleCreateBlog}
                            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                        >
                            Write Your First Blog
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog) => (
                            <motion.div
                                key={blog.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="bg-white rounded-lg shadow-sm overflow-hidden"
                            >
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-2 text-gray-800">{blog.title}</h2>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{blog.content.substring(0, 150)}...</p>
                                    <div className="text-sm text-gray-500 mb-4">{new Date(blog.createdAt).toLocaleDateString()}</div>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => handleEditBlog(blog)}
                                            className="px-3 py-1 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteBlog(blog.id)}
                                            className="px-3 py-1 text-sm border border-red-300 rounded text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Blog Editor Modal */}
            <AnimatePresence>
                {showEditor && <BlogEditor blog={currentBlog} onSave={handleSaveBlog} onClose={() => setShowEditor(false)} />}
            </AnimatePresence>
        </div>
    )
}

export default Dashboard
