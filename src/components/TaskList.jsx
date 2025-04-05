import React, { useState } from 'react';
import { useTaskList } from '../hooks/useTasks';
import EditTask from './EditTask';
import ShimmerUI from './ShimmerUI';
import Error from './Error';
import { Link } from 'react-router-dom';

const TaskList = () => {
    const { tasks, isLoading, error, mutationAdd, mutationDelete } = useTaskList();
    const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To-Do', priority: 'Low' });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!newTask.title) newErrors.title = 'Title is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        mutationAdd.mutate(newTask);
        setNewTask({ title: '', description: '', status: 'To-Do', priority: 'Low' });
    };

    if (isLoading) return <ShimmerUI />;
    if (error) return <Error />;

    return (
        <div>
            <form onSubmit={handleAddTask} className="mb-8 bg-white p-6 rounded-md shadow">
                <div className="mb-4">
                    {/* Input for Task Title */}
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={newTask.title}
                        onChange={(e) => 
                            // Update newTask state with the new title as user types
                            setNewTask({ ...newTask, title: e.target.value })
                        }
                        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:border-blue-500 ${
                            errors.title ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.title && (
                        // Display validation error if title is missing
                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                </div>

                {/* Textarea for Task Description */}
                <div className="mb-4">
                    <textarea
                        placeholder="Description"
                        value={newTask.description}
                        onChange={(e) =>
                            // Update newTask state with the new description as user types
                            setNewTask({ ...newTask, description: e.target.value })
                        }
                        rows="4"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:border-blue-500"
                    ></textarea>
                </div>

                {/* Grid container for Status and Priority selectors */}
                <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Status Selector */}
                    <select
                        value={newTask.status}
                        onChange={(e) =>
                            // Update newTask state with the selected status
                            setNewTask({ ...newTask, status: e.target.value })
                        }
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:border-blue-500"
                    >
                        <option value="To-Do">To-Do</option>
                        <option value="In-Progress">In-Progress</option>
                        <option value="Completed">Completed</option>
                    </select>

                    {/* Priority Selector */}
                    <select
                        value={newTask.priority}
                        onChange={(e) =>
                            // Update newTask state with the selected priority
                            setNewTask({ ...newTask, priority: e.target.value })
                        }
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:border-blue-500"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                    Add Task
                </button>
            </form>

            <Link to="/filter" className="text-blue-500 py-3 text-fuchsia-700 text-1xl md:font-bold mb-5 block">View All Tasks</Link>

 
        </div>
    );
};

export default TaskList;