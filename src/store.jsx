import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './hooks/Taskslice';

// Configure and create the Redux store with our task reducer.
export const store = configureStore({
    reducer: {
        tasks: taskReducer,
    },
});