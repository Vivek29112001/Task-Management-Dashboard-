import React, { useState } from 'react';
import { useTaskList } from '../hooks/useTasks';
import ShimmerUI from './ShimmerUI';
import Error from './Error';
import { Link } from 'react-router-dom';

/**
 * FilterPage component displays a list of tasks that can be filtered
 * by priority and status. Each task is rendered with its details along with
 * Edit and Delete buttons. When no tasks match the filters, an appropriate message is shown.
 */
const FilterPage = () => {
    // Retrieve tasks and API mutation functions along with the loading/error state
    const { tasks, isLoading, error, mutationDelete } = useTaskList();

    // Local state for filter controls
    const [selectedPriority, setSelectedPriority] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');

    // Display shimmer effect if tasks are being loaded
    if (isLoading) return <ShimmerUI />;
    // Display error message if API call fails
    if (error) return <Error />;

    // Filter tasks based on selected priority and status
    const filteredTasks = tasks.filter(task => {
        const matchesPriority = selectedPriority === 'All' || task.priority === selectedPriority;
        const matchesStatus = selectedStatus === 'All' || task.status === selectedStatus;
        return matchesPriority && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Page Title */}
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">All Tasks</h2>

            {/* Filter Controls */}
            <div className="mb-4 flex justify-center space-x-4">
                <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                >
                    <option value="All">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                >
                    <option value="All">All Statuses</option>
                    <option value="To-Do">To-Do</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            {/* Task List */}
            <ul className="space-y-4">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <li 
                            key={task._id} 
                            className="bg-white p-4 rounded-md shadow flex justify-between items-center"
                        >
                            {/* Task Details */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-800">
                                    {task.title}
                                </h3>
                                {task.description && (
                                    <p className="text-gray-600 mt-1">{task.description}</p>
                                )}
                                <p className="mt-1 text-sm font-semibold">
                                    Status: {task.status}
                                </p>
                                <p className="mt-1 text-sm font-semibold">
                                    Priority: {task.priority}
                                </p>
                            </div>
                            {/* Action Buttons: Edit and Delete */}
                            <div className="flex space-x-2">
                                <Link to={`/task/${task._id}`}>
                                    <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                        Edit
                                    </button>
                                </Link>
                                <button
                                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    onClick={() => mutationDelete.mutate(task._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-600">
                        No tasks found for the selected filters.
                    </p>
                )}
            </ul>
        </div>
    );
};

export default FilterPage;