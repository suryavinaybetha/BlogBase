// src/components/Footer.jsx
import {Github} from "lucide-react";

const collaborators = [
    {name: "Surya Vinay", github: "https://github.com/suryavinaybetha"},
    {name: "Bhagya Charan", github: "https://github.com/abhagyacharan"},
];

const Footer = () => {
    return (
        <footer className="py-10 bg-gray-100">
            <div className="max-w-6xl mx-auto px-6 text-center text-gray-600">
                <p className="text-sm mb-3">
                    © {new Date().getFullYear()} BlogBase. All rights reserved.
                </p>
                <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-700">
                    <span className="text-gray-500">Made with ❤️ by</span>
                    {collaborators.map((dev) => (
                        <a
                            key={dev.name}
                            href={dev.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-blue-600 transition-colors duration-300"
                        >
                            <Github className="w-4 h-4"/>
                            <span className="font-medium">{dev.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
