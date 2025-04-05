import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTasks, addTask, deleteTask, fetchTask, editTask } from '../api/Api';

/**
 * Custom hook for managing the task list.
 * - Fetches all tasks using fetchTasks.
 * - Provides mutations to add and delete tasks.
 */
export const useTaskList = () => {
    const queryClient = useQueryClient();

    // Fetch tasks with React Query; the query key "tasks" is used to cache the result.
    const { data: tasks, isLoading, error } = useQuery({
        queryKey: ['tasks'],
        queryFn: fetchTasks,
    });

    // Mutation for adding a new task; invalidates tasks cache on success.
    const mutationAdd = useMutation({
        mutationFn: addTask,
        onSuccess: () => queryClient.invalidateQueries(['tasks']),
    });

    // Mutation for deleting a task; invalidates tasks cache on success.
    const mutationDelete = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => queryClient.invalidateQueries(['tasks']),
    });

    return { tasks, isLoading, error, mutationAdd, mutationDelete };
};

/**
 * Custom hook for managing a single task.
 * - Fetches a task by id.
 * - Provides a mutation to edit the task, invalidating the overall tasks cache to trigger refetch.
 *
 * @param {string} id - The id of the task to fetch.
 */

export const useTask = (id) => {
    const queryClient = useQueryClient();

    // Fetch a single task; using enabled flag so we only fetch if id is provided.
    const { data: task, isLoading, error } = useQuery({
        queryKey: ['task', id],
        queryFn: () => fetchTask(id),
        enabled: !!id,
    });

    // Mutation for editing a task; on success, make sure to refresh the tasks list.
    const mutationEdit = useMutation({
        mutationFn: editTask,
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
        },
    });

    return { task, isLoading, error, mutationEdit };
};