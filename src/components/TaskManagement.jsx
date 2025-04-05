import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTask } from '../hooks/useTasks';

/**
 * TaskManagement component renders a page for editing an existing task.
 * It fetches task details using the task id from URL params, displays a pre-filled form,
 * allows the user to edit task properties, and updates the task using mutationEdit.
 */
const TaskManagement = () => {
    // Retrieve the task id from the URL and the navigation function
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch a single task along with mutation functions and loading/error states
    const { task, isLoading, error, mutationEdit } = useTask(id);

    // Local state to manage the form data for the task
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'To-Do',
        priority: 'Low',
    });

    // Local state to manage any form validation errors
    const [errors, setErrors] = useState({});

    // Once the task is fetched, populate the formData state with task details.
    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
            });
        }
    }, [task]);

    /**
     * validateForm checks whether the required fields are filled
     * and updates the errors state.
     *
     * @returns {boolean} true if the form is valid, otherwise false.
     */
    const validateForm = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = 'Title is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * handleSubmit processes the form submission.
     * It first validates the form, and if valid, triggers the edit mutation.
     * On success, it navigates the user back to the dashboard.
     *
     * @param {Event} e - The form submission event.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Trigger the task update and navigate back on success.
        mutationEdit.mutate({ _id: id, ...formData }, {
            onSuccess: () => navigate('/'),
        });
    };

    // If tasks are still loading, display a loading message
    if (isLoading) return <p className="text-center text-xl mt-6">Loading task...</p>;
    // If an error occurs during fetching, display the error message
    if (error) return <p className="text-center text-red-500 mt-6">Error: {error.message}</p>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-md">
            {/* Page Title */}
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
                Edit Task (ID: {id})
            </h2>
            {/* Task Edit Form */}
            <form onSubmit={handleSubmit}>
                {/* Task Title Input */}
                <div className="mb-4">
                    <input 
                        type="text" 
                        placeholder="Task Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:border-blue-500 focus:ring-blue-500 ${
                            errors.title ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>
                {/* Task Description Textarea */}
                <div className="mb-4">
                    <textarea 
                        placeholder="Description" 
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows="4" 
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:border-blue-500 focus:ring-blue-500"
                    ></textarea>
                </div>
                {/* Task Status Selector */}
                <div className="mb-4">
                    <select 
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="To-Do">To-Do</option>
                        <option value="In-Progress">In-Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                {/* Task Priority Selector */}
                <div className="mb-4">
                    <select 
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Update Task
                </button>
            </form>
        </div>
    );
};

export default TaskManagement;