"use client"

import {useState} from "react"
import {motion} from "framer-motion"

const BlogEditor = ({blog, onSave, onClose}) => {
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        ...blog
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (blog) {
            // handle Update
        } else {
            if (!formData.title.trim()) {
                setError("Title is required")
                return
            }

            if (!formData.content.trim()) {
                setError("Content is required")
                return
            }
        }
        onSave(formData)
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 0.7}}
                exit={{opacity: 0}}
                className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm"
                onClick={onClose}
            />

            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 20}}
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl z-10 relative max-h-[90vh] overflow-y-auto"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-6 text-gray-800">{blog ? "Edit Blog" : "Create New Blog"}</h2>

                {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                            placeholder="Enter blog title"
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[300px]"
                            placeholder="Write your blog content here..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            {blog ? "Update Blog" : "Create Blog"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default BlogEditor
