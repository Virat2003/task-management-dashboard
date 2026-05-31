"use client";
import { useState } from "react";
import TaskTable from "@/components/tasks/TaskTable";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { addTask, deleteTask, updateTask } from "@/redux/taskSlice";
import toast from "react-hot-toast";

export default function TasksPage() {
    const dispatch = useDispatch();
    const taskList = useSelector((state: RootState) => state.tasks);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [newTaskPriority, setNewTaskPriority] = useState<"Low" | "Medium" | "High">("Medium");
    const [newTaskStatus, setNewTaskStatus] = useState<"Pending" | "In Progress" | "Completed">("Pending");
    const [newAssignedUser, setNewAssignedUser] = useState("");
    const [newDueDate, setNewDueDate] = useState("");
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);


    const [isSubmitting, setIsSubmitting] = useState(false);

    const filteredTasks = taskList.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "" || task.status === statusFilter;
        const matchesPriority = priorityFilter === "" || task.priority === priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
    });


    const resetForm = () => {
        setNewTaskTitle("");
        setNewTaskDescription("");
        setNewTaskPriority("Medium");
        setNewTaskStatus("Pending");
        setNewAssignedUser("");
        setNewDueDate("");
        setEditingTaskId(null);
        setShowForm(false);
    };

    const handleAddTask = async () => {
        if (!newTaskTitle.trim()) {
            toast.error("Task title is required");
            return;
        }
        if (!newAssignedUser.trim()) {
            toast.error("Assigned user is required");
            return;
        }

        if (!newDueDate) {
            toast.error("Due date is required");
            return;
        }

        try {
            setIsSubmitting(true);

            await new Promise((resolve) =>
                setTimeout(resolve, 600)
            );

            if (editingTaskId) {
                dispatch(
                    updateTask({
                        id: editingTaskId,
                        title: newTaskTitle,
                        description: newTaskDescription,
                        priority: newTaskPriority,
                        status: newTaskStatus,
                        assignedUser: newAssignedUser,
                        dueDate: newDueDate,
                    })
                );

                toast.success("Task updated successfully!");
            } else {
                dispatch(
                    addTask({
                        id: Date.now().toString(),
                        title: newTaskTitle,
                        description: newTaskDescription,
                        priority: newTaskPriority,
                        status: newTaskStatus,
                        assignedUser: newAssignedUser,
                        dueDate: newDueDate,
                    })
                );

                toast.success("Task created successfully!");
            }

            resetForm();

        } catch (error) {
            console.error(error);
            toast.error("Failed to save task");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteTask = (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) return;

        dispatch(deleteTask(id));

        toast.success("Task deleted successfully!");
    };

    const handleEditTask = (id: string) => {
        const task = taskList.find((task) => task.id === id);
        if (!task) return;

        setEditingTaskId(id);
        setNewTaskTitle(task.title);
        setNewTaskDescription(task.description);
        setNewTaskPriority(task.priority);
        setNewTaskStatus(task.status);
        setNewAssignedUser(task.assignedUser);
        setNewDueDate(task.dueDate);
        setShowForm(true);
    };


    const activeFilterCount = [search, statusFilter, priorityFilter].filter(Boolean).length;

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("");
        setPriorityFilter("");
    };

    return (
        <div className="p-4 md:p-6">

            {/* ── Page Header ── */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                        Tasks
                    </h1>
                    <p className="text-sm text-slate-400 mt-0.5">
                        Showing{" "}
                        <span className="font-bold text-white">
                            {filteredTasks.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-bold text-white">
                            {taskList.length}
                        </span>{" "}
                        tasks
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded-lg cursor-pointer text-sm md:text-base flex items-center gap-2"
                >
                    {/* Plus icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Task
                </button>
            </div>

            {/* ── Search & Filters ── */}
            <div className="flex flex-col md:flex-row gap-3 mb-2">
                <div className="relative w-full md:flex-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-slate-300 p-2 pl-9 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                    />
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-slate-300 p-2 rounded-lg w-full md:w-auto cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option className="text-slate-700" value="">All Status</option>
                    <option className="text-slate-700" value="Pending">Pending</option>
                    <option className="text-slate-700" value="In Progress">In Progress</option>
                    <option className="text-slate-700" value="Completed">Completed</option>
                </select>

                <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="border border-slate-300 p-2 rounded-lg w-full md:w-auto cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option className="text-slate-700" value="">All Priority</option>
                    <option className="text-slate-700" value="Low">Low</option>
                    <option className="text-slate-700" value="Medium">Medium</option>
                    <option className="text-slate-700" value="High">High</option>
                </select>
            </div>

            {activeFilterCount > 0 && (
                <div className="flex items-center gap-2 mb-4 mt-1">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                        {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active
                    </span>
                    <button
                        onClick={clearFilters}
                        className="text-xs text-slate-400 hover:text-slate-600 transition-colors cursor-pointer underline"
                    >
                        Clear all
                    </button>
                </div>
            )}

            {showForm && (
                <div className="border border-slate-200 bg-white shadow-sm p-4 md:p-6 rounded-lg mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-slate-800">
                            {editingTaskId ? "Edit Task" : "Create Task"}
                        </h2>

                        <button
                            onClick={resetForm}
                            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                            aria-label="Close form"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Task Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter task title"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                disabled={isSubmitting}
                                className="border text-black border-slate-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Description
                            </label>
                            <input
                                type="text"
                                placeholder="Enter description"
                                value={newTaskDescription}
                                onChange={(e) => setNewTaskDescription(e.target.value)}
                                disabled={isSubmitting}
                                className="border text-black border-slate-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Priority
                            </label>
                            <select
                                value={newTaskPriority}
                                onChange={(e) =>
                                    setNewTaskPriority(e.target.value as "Low" | "Medium" | "High")
                                }
                                disabled={isSubmitting}
                                className="border text-black border-slate-300 p-2 rounded-lg w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                required
                            >
                                <option className="text-black" value="Low">Low</option>
                                <option className="text-black" value="Medium">Medium</option>
                                <option className="text-black" value="High">High</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Status
                            </label>
                            <select
                                value={newTaskStatus}
                                required
                                onChange={(e) =>
                                    setNewTaskStatus(
                                        e.target.value as "Pending" | "In Progress" | "Completed"
                                    )
                                }
                                disabled={isSubmitting}
                                className="border text-black border-slate-300 p-2 rounded-lg w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <option className="text-black" value="Pending">Pending</option>
                                <option className="text-black" value="In Progress">In Progress</option>
                                <option className="text-black" value="Completed">Completed</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Assigned User <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter assigned user"
                                value={newAssignedUser}
                                onChange={(e) => setNewAssignedUser(e.target.value)}
                                disabled={isSubmitting}
                                className="border text-black border-slate-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Due Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={newDueDate}
                                onChange={(e) => setNewDueDate(e.target.value)}
                                disabled={isSubmitting}
                                className="border text-black border-slate-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                required
                            />
                        </div>

                        <div className="md:col-span-2 flex gap-3 pt-2">
                            <button
                                onClick={handleAddTask}
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded-lg cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    editingTaskId ? "Update Task" : "Create Task"
                                )}
                            </button>

                            <button
                                onClick={resetForm}
                                disabled={isSubmitting}
                                className="bg-slate-100 hover:bg-slate-200 transition-colors text-slate-700 px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Task Table ── */}
            <div className="overflow-x-auto rounded-lg border border-slate-200">
                <TaskTable
                    tasks={filteredTasks}
                    onDelete={handleDeleteTask}
                    onEdit={handleEditTask}
                />
            </div>
        </div>
    );
}