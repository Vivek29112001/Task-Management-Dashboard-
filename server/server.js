const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = "mongodb://127.0.0.1:27017/taskmanager"; // Replace with your credentials
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Task model
const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ['To-Do', 'In-Progress', 'Completed'], default: 'To-Do' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
});

const Task = mongoose.model('Task', TaskSchema);

// API Endpoints
app.get('/api/tasks', async (req, res) => {
    try {
        // Try to fetch tasks from the local MongoDB database
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.error("Error fetching tasks from database, falling back to placeholder API:", err);
        try {
            // Fallback: fetch tasks from jsonplaceholder API
            const placeholderResponse = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
            if (!placeholderResponse.ok) {
                // If the placeholder API also fails, throw an error
                throw new Error('Placeholder API response not OK');
            }
            const placeholderTasks = await placeholderResponse.json();
            res.json(placeholderTasks);
        } catch (fallbackErr) {
            res.status(500).json({ message: fallbackErr.message });
        }
    }
});

app.post('/api/tasks', async (req, res) => {
    const newTask = new Task(req.body);
    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/api/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting task:', err); // Log the error for debugging
        res.status(500).json({ message: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});