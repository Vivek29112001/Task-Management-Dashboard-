import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Async thunk to fetch all tasks from the API.
 * Makes a GET request to the tasks API endpoint, and returns the response in JSON format.
 */
export const fetchData = createAsyncThunk('tasks/fetchData', async () => {
    const response = await fetch('http://localhost:5000/api/tasks');
    return response.json();
});

/**
 * Async thunk to add a new task.
 * Sends a POST request with the new task data (serialized to JSON) and returns the created task.
 */
export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
    const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    return response.json();
});

/**
 * Async thunk to edit an existing task.
 * Sends a PUT request with updated task data and returns the updated task.
 * Note: The task id is expected to be provided as task.id.
 */
export const editTask = createAsyncThunk('tasks/editTask', async (task) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    return response.json();
});

/**
 * Async thunk to delete a task by its id.
 * Sends a DELETE request to remove the task, and returns the id for updating the store.
 */
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'DELETE' });
    return id;
});

// Initial state for the tasks slice
const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

// Create a slice for tasks that includes reducers and extraReducers to handle async thunk actions.
const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle pending state for fetching tasks
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
            })
            // Handle fulfilled state for fetching tasks; update list and clear loading flag
            .addCase(fetchData.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            // Handle rejected state for fetching tasks; clear loading flag and store error message
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // On successful task addition, append the new task to the list
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            // On successful task edit, update the corresponding task in the list
            .addCase(editTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(task => task._id === action.payload._id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            // On successful deletion, remove the task from the list by filtering out using the id
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task._id !== action.payload);
            });
    },
});

// Export the reducer to be used in the store configuration
export default taskSlice.reducer;