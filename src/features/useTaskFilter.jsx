/**
 * Filter tasks based on search term, status, and priority.
 */

const useTaskFilter = (tasks, searchTerm, filterStatus, filterPriority) => {
    return tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
        const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
        return matchesSearch && matchesStatus && matchesPriority;
    });
};

export default useTaskFilter;