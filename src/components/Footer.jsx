import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer component renders a stylish footer for the application.
 * All navigation uses React Router's Link component.
 */
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-200 py-6">
            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
                {/* Footer text */}
                <p className="text-center text-sm">
                    © {new Date().getFullYear()} VivekSharma. All rights reserved.
                </p>
                {/* Social/Navigation Links */}
                <div className="mt-4 flex space-x-4">
                    <Link 
                        to="https://github.com/Vivek29112001" 
                        className="text-gray-400 hover:text-white text-sm" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </Link>
                    <Link 
                        to="https://www.linkedin.com/in/vivek2911/" 
                        className="text-gray-400 hover:text-white text-sm" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        LinkedIn
                    </Link>
                    <Link 
                        to="mailto:2911vivek@gmail.com" 
                        className="text-gray-400 hover:text-white text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;