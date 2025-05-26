import {motion} from "framer-motion";

export function BlogDeletor(props) {
    return <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Background overlay with blur and fade-in */}
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 0.7}}
            exit={{opacity: 0}}
            className="absolute inset-0 bg-red-300 bg-opacity-50 backdrop-blur-sm"
            onClick={props.onClickCancel}
        />

        {/* Modal content */}
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 20}}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm z-10 relative"
        >
            <button
                onClick={props.onClickCancel}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
                ✕
            </button>

            <h3 className="text-lg font-bold text-gray-800 mb-4">Delete Blog</h3>
            <p className="text-gray-600 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-medium text-gray-900">"{props.blogToDelete?.title}"</span>
                ? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
                <button
                    onClick={props.onClickCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={props.onClickDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors"
                >
                    Delete
                </button>
            </div>
        </motion.div>
    </div>;
}