import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TaskManagement from './components/TaskManagement';
import FilterPage from './components/FatchPage1';
import EditTask from './components/EditTask';
import Footer from './components/Footer';

/**
 * App component sets up the routing and layout for the Task Manager application.
 * It wraps the content with a Router and includes persistent Header and Footer components.
 * The Routes component defines the following navigation:
 * - "/" renders the Dashboard component.
 * - "/task/:id" renders the TaskManagement component to manage a single task.
 * - "/filter" renders the FilterPage component to display all tasks with filtering options.
 * - "/edit" renders the EditTask component which lists tasks with options to edit.
 */
const App = () => (
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/task/:id" element={<TaskManagement />} />
            <Route path="/filter" element={<FilterPage />} />
            <Route path="/edit" element={<EditTask />} /> 
        </Routes>
        <Footer />
    </Router>
);

export default App;