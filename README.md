<<<<<<< HEAD
# Task-Management-Dashboard

A responsive task manager built with **React**, **Next.js**, and **Tailwind CSS**. Features include task creation, editing, filtering by status/priority, search, and REST API integration. Uses **Context API**, custom hooks, and supports SSR/SSG for performance. Optional deployment on **Vercel**.


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, read, update, and delete tasks
- Filter tasks by status and priority
- Responsive design for a better user experience

## Technologies Used

### Backend:
- MongoDB
- Mongoose

### Frontend:
- React
- React Router
- React Query
- Redux Toolkit
- Tailwind CSS

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/task-manager.git
cd task-manager
2. Install Dependencies
bash
Copy
Edit
npm install
3. Run Backend
bash
Copy
Edit
cd backend
npm start
4. Run Frontend
bash
Copy
Edit
cd frontend
npm start
API Endpoints
GET /api/tasks - Fetch all tasks

POST /api/tasks - Add a new task

PUT /api/tasks/:id - Update a task

DELETE /api/tasks/:id - Delete a task

Usage
Visit (http://localhost:5173/ to access the application locally after setup.
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> d2fd793 (Initial commit with client and server)
