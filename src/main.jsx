import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';

const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </Provider>
);