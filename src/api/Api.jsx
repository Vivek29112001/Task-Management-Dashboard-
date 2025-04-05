/**
 * Fetches all tasks from the local API endpoint.
 * If the local fetch fails, it attempts to fetch from a placeholder API.
 *
 * @returns {Promise<Array>} An array of tasks.
 * @throws Error if both fetches fail.
 */
export const fetchTasks = async () => {
    // Attempt to fetch tasks from the local API
    const response = await fetch('http://localhost:5000/api/tasks');
    if (!response.ok) {
        // If local API fails, use the placeholder API as a fallback
        const placeholderResponse = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
        if (!placeholderResponse.ok) 
            throw new Error('Failed to fetch tasks');
        return placeholderResponse.json();
    }
    return response.json();
};


/**
 * Adds a new task by sending a POST request with the task details.
 *
 * @param {Object} newTask - The new task data.
 * @returns {Promise<Object>} The created task object.
 * @throws Error with status and error message if the request fails.
 */
export const addTask = async (newTask) => {
    const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
    });
    if (!response.ok) {
        // Capture detailed error information from the server
        const errorMessage = await response.text();
        throw new Error(`Failed to add task (Status ${response.status}): ${errorMessage}`);
    }
    return response.json();
};

/**
 * Deletes a task by ID. 
 * Sends a DELETE request to remove the task from the server.
 *
 * @param {string|number} id - The identifier of the task to delete.
 * @returns {Promise<string|number>} The id of the deleted task.
 * @throws Error with status and error message if the deletion fails.
 */
export const deleteTask = async (id) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to delete task (Status ${response.status}): ${errorMessage}`);
    }
    return id;
};

/**
 * Fetches a single task using its ID.
 * Sends a GET request to retrieve task details.
 *
 * @param {string|number} id - The identifier of the task to fetch.
 * @returns {Promise<Object>} The fetched task object.
 * @throws Error if the response is not OK.
 */
export const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

/**
 * Edits an existing task by sending a PUT request with the updated task data.
 *
 * @param {Object} task - The updated task object (must include _id).
 * @returns {Promise<Object>} The updated task object.
 * @throws Error with status and error message if the update fails.
 */
export const editTask = async (task) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to edit task (Status ${response.status}): ${errorMessage}`);
    }
    return response.json();
};
