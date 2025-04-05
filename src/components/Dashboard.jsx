import React from 'react';
import TaskList from './TaskList';

/**
 * Dashboard component serves as the landing page for the Task Manager app.
 * It displays a header and a main section that contains the TaskList component.
 */
const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header Section */}
            <header className="text-amber-950 p-5 text-center">
                <h1 className="text-5xl font-bold">Dashboard Page</h1>
            </header>
            {/* Main Content Area */}
            <main className="p-6">
                <section className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4">Task Manager</h2>
                    <TaskList />
                </section>
            </main>
        </div>
    );
};

export default Dashboard;