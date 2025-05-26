import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {publishedBlog} from "../services/landingPageService.js";
import {motion} from "framer-motion";
import Footer from "./Footer.jsx";

const PublicBlogPage = () => {
    const {id} = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBlog() {
            const response = await publishedBlog(id);
            setUser(response);
            console.log(response);
        }

        fetchBlog();
    }, []);

    return (
        <>
            <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
                {/* Content */}
                <div className="flex-grow">
                    <nav className="px-6 py-4 flex justify-between items-center">
                        <motion.div
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5}}
                            onClick={() => navigate("/")}
                            className="text-2xl font-bold text-gray-800 cursor-pointer"
                        >
                            BlogBase
                        </motion.div>
                    </nav>

                    <div className="max-w-6xl mx-auto px-4 py-10">
                        {!user ? (
                            <p className="text-center text-gray-500">Loading blogs...</p>
                        ) : user?.blogs?.length === 1 ? (<motion.div
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.4}}
                                className="bg-white rounded-lg shadow-md p-6"
                            >
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">{user?.blogs[0]?.title}</h1>
                                <p className="text-sm text-gray-500 mb-6">
                                    By {user?.firstName} {user?.lastName} ({user?.username})
                                </p>
                                <div className="prose prose-lg max-w-none text-gray-700">
                                    <p>{user?.blogs[0]?.content}</p>
                                </div>
                                {user?.blogs[0]?.createdAt && (
                                    <p className="mt-6 text-sm text-gray-400">
                                        Published on{" "}
                                        {new Date(user?.blogs[0]?.createdAt).toLocaleDateString("en-US", {
                                            dateStyle: "medium",
                                        })}
                                    </p>
                                )}
                            </motion.div>)
                            : (<motion.div
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.4}} className="max-w-7xl mx-auto px-4 py-5">
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                    {user?.firstName} {user?.lastName}
                                </h1>
                                <p className="text-sm text-gray-500 mb-6">By ({user?.username})</p>

                                <div className="">
                                    {user?.blogs?.map((blog) => (
                                        <div key={blog?.id}
                                             className=" mb-6 bg-gray-100 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog?.title}</h2>
                                            <p className="text-gray-600 line-clamp-3 mb-4">{blog?.content}</p>
                                            <p className="text-sm text-gray-400">
                                                {new Date(blog?.createdAt).toLocaleString("en-US", {
                                                    dateStyle: "medium",
                                                    timeStyle: "short",
                                                })}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>)}
                    </div>
                </div>

                {/* Footer */}
                <Footer/>
            </div>

        </>
    );
};

export default PublicBlogPage;
