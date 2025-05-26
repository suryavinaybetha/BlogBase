"use client"

import {LucideCopy} from "lucide-react";
import React, {useState} from "react"
import {useAuth} from "../context/AuthContext"
import BlogEditor from "./BlogEditor"
import {AnimatePresence, motion} from "framer-motion"
import {addBlog, deleteBlog, publishBlog, unPublishBlog, updateBlog} from "../services/blogService.js";
import {login} from "../services/authService.js";
import {BlogDeletor} from "./BlogDeletor.jsx";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const {user, refreshAuth, authLogout} = useAuth()
    const [showEditor, setShowEditor] = useState(false)
    const [currentBlog, setCurrentBlog] = useState(null)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        authLogout();
        navigate("/");
    };


    const handleCreateBlog = () => {
        setCurrentBlog(null)
        setShowEditor(true)
    }

    const handleEditBlog = (blog) => {
        setCurrentBlog(blog)
        setShowEditor(true)
    }

    async function refreshData() {
        let response = await login()
        if (response) {
            refreshAuth();
        }
    }

    const handleSaveBlog = async (blogData) => {
        let response
        if (blogData.id) {
            response = await updateBlog(blogData)
        } else {
            response = await addBlog(blogData)
        }
        console.log(response)
        await refreshData()
        setShowEditor(false)
    }

    async function handleDeleteBlog(id) {
        let response = await deleteBlog(id)
        console.log(response)
        await refreshData()
    }

    async function handlePublish(blog) {
        let response
        if (!blog.isPublished) {
            response = await publishBlog(blog.id)

        } else {
            response = await unPublishBlog(blog.id);
        }
        console.log(response)
        await refreshData()
    }

    function handleCopy(blog) {
        const blogLink = `${window.location.origin}/blog/public/` + blog.id;

        navigator.clipboard.writeText(blogLink);
        alert("Link copied to clipboard!");
    }

    const confirmDeleteBlog = (blog) => {
        setBlogToDelete(blog);
        setShowDeleteConfirm(true);
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setBlogToDelete(null);
    };

    const proceedDelete = async () => {
        if (blogToDelete) {
            await handleDeleteBlog(blogToDelete.id);
            setShowDeleteConfirm(false);
            setBlogToDelete(null);
        }
    };

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <button onClick={() => {
                            navigate("/");
                            authLogout()
                        }} className="text-2xl font-bold text-gray-800">
                            BlogBase
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">Hello, {user.firstName}</span>
                        <button
                            onClick={handleLogoutClick}
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
                {user?.blogs?.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 mb-4">You haven't created any blog yet.</p>
                        <button
                            onClick={handleCreateBlog}
                            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                        >
                            Write Your First Blog
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {user?.blogs?.map((blog) => (
                            <motion.div
                                key={blog.id}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.4}}
                                className="relative bg-white rounded-lg shadow-sm overflow-hidden"
                            >
                                {/* Copy Link Icon */}
                                {blog.isPublished && (
                                    <button
                                        onClick={() => handleCopy(blog)}
                                        className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100"
                                        title="Copy blog link"
                                    >
                                        <LucideCopy className="w-5 h-5 text-gray-500 hover:text-gray-800"/>
                                    </button>
                                )
                                }

                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-2 text-gray-800">{blog.title}</h2>
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {blog.content.substring(0, 30)}...
                                    </p>
                                    <div className="text-sm text-gray-500 mb-4">
                                        {new Date(blog.createdAt).toLocaleString("en-US", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </div>
                                    <div className="flex justify-between gap-2">
                                        <div className="flex justify-start gap-2">
                                            <button
                                                onClick={() => handleEditBlog(blog)}
                                                className="px-3 py-1 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => confirmDeleteBlog(blog)}
                                                className="px-3 py-1 text-sm border border-red-300 rounded text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handlePublish(blog)}
                                            className="px-3 py-1 text-sm bg-gray-800 rounded text-white hover:bg-gray-700 transition-colors"
                                        >
                                            {blog.isPublished ? "Un-Publish" : "Publish"}
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
                {showEditor &&
                    <BlogEditor blog={currentBlog} onSave={handleSaveBlog}
                                onClose={() => setShowEditor(false)}/>}
            </AnimatePresence>
            <AnimatePresence>
                {showDeleteConfirm && (
                    <BlogDeletor onClickCancel={cancelDelete} blogToDelete={blogToDelete}
                                 onClickDelete={proceedDelete}/>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {showLogoutModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* Background overlay with blur and fade-in */}
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 0.7}}
                            exit={{opacity: 0}}
                            className="absolute inset-0 bg-red-300 bg-opacity-50 backdrop-blur-sm"
                            onClick={cancelLogout}
                        />

                        {/* Modal content */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: 20}}
                            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm z-10 relative"
                        >
                            <button
                                onClick={cancelLogout}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>

                            <h3 className="text-lg font-bold text-gray-800 mb-4">Logout Confirmation</h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to <span className="font-semibold text-red-600">logout</span>?
                                Your session will end.
                            </p>
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    onClick={cancelLogout}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Dashboard
