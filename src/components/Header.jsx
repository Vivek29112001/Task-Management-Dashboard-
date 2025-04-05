import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Header component renders the application title and navigation.
 * It utilizes a gradient background and Flexbox layout for alignment.
 */
const Header = () => {
    return (
        <header className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 shadow-lg">
            {/* Application Title */}
            <h1 className="text-3xl font-extrabold">Task Manager</h1>
            {/* Navigation Links */}
            <nav className="mt-0"> {/* Removed mt-4 to align with flex layout */}
                <Link to="/" className="mr-6 text-lg font-medium hover:underline">
                    Dashboard
                </Link>
                <Link to="/filter" className="text-lg font-medium hover:underline">
                    Filter Tasks
                </Link>
                <Link to="/edit" className="ml-6 text-lg font-medium hover:underline">
                    Edit Task
                </Link>
            </nav>
        </header>
    );
};

export default Header;