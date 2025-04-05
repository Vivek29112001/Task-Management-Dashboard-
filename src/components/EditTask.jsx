import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskList } from '../hooks/useTasks';

/**
 * EditTask component renders a page showing all tasks with an "Edit" button.
 * When a user clicks "Edit," they are navigated to the individual task edit page (/task/:id).
 * The component displays loading and error messages based on the task fetching state.
 */
const EditTask = () => {
    // Retrieve tasks, along with loading and error states, from our custom hook.
    const { tasks, isLoading, error } = useTaskList();
    const navigate = useNavigate();

    // Show a loading message if tasks are still being fetched
    if (isLoading) return <div>Loading tasks...</div>;

    // Display an error message if there is an issue fetching tasks
    if (error) return <div>Error: {error.message}</div>;

    /**
     * Navigates to the individual task edit page by task id.
     *
     * @param {string} id - The unique identifier of the task to edit.
     */
    const handleEdit = (id) => {
        navigate(`/task/${id}`);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Page Title */}
            <h2 className="text-3xl font-bold mb-6 text-center">Edit Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <li
                        key={task._id}
                        className="flex items-center justify-between bg-white p-4 rounded-md shadow mb-4"
                    >
                        {/* Display task title */}
                        <span className="text-lg">{task.title}</span>
                        {/* Edit button triggers navigation to the task's edit page */}
                        <button
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => handleEdit(task._id)}
                            aria-label={`Edit task ${task.title}`}
                        >
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EditTask;