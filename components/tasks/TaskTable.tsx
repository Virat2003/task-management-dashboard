import { Task } from "@/types/task";

interface TaskTableProps {
    tasks: Task[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

function getPriorityBadge(priority: Task["priority"]) {
    const base = "px-2 py-1 rounded-full text-xs font-semibold";
    if (priority === "High") return `${base} bg-red-100 text-red-700`;
    if (priority === "Medium") return `${base} bg-yellow-100 text-yellow-700`;
    return `${base} bg-green-100 text-green-700`; // Low
}

function getStatusBadge(status: Task["status"]) {
    const base = "px-2 py-1 rounded-full text-xs font-semibold";
    if (status === "Completed") return `${base} bg-green-100 text-green-700`;
    if (status === "In Progress") return `${base} bg-blue-100 text-blue-700`;
    return `${base} bg-yellow-100 text-yellow-700`; // Pending
}

export default function TaskTable({ tasks, onDelete, onEdit }: TaskTableProps) {

    return (
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-x-auto">
            <table className="w-full min-w-[700px]">
                <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                        <th className="p-4 text-left text-sm font-semibold text-slate-600">Title</th>
                        <th className="p-4 text-left text-sm font-semibold text-slate-600">Description</th>
                        <th className="p-4 text-left text-sm font-semibold text-slate-600">Priority</th>
                        <th className="p-4 text-left text-sm font-semibold text-slate-600">Status</th>
                        <th className="p-4 text-left text-sm font-semibold text-slate-600">Assigned User</th>
                        <th className="p-4 text-left text-sm font-semibold text-slate-600">Due Date</th>
                        <th className="p-4 text-left text-sm font-semibold text-slate-600">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.length === 0 ? (
                        <tr>
                            <td
                                colSpan={7}
                                className="p-8 text-center text-slate-400 text-sm"
                            >
                                No tasks found. Try adjusting your filters or add a new task.
                            </td>
                        </tr>
                    ) : (
                        tasks.map((task) => (
                            <tr
                                key={task.id}
                                className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                            >
                                {/* Title */}
                                <td className="p-4 text-sm font-medium text-slate-800">
                                    {task.title}
                                </td>

                                {/* Description — muted color, slightly smaller */}
                                <td className="p-4 text-sm text-slate-500 max-w-[200px] truncate">
                                    {task.description}
                                </td>

                                {/* Priority Badge */}
                                <td className="p-4">
                                    <span className={getPriorityBadge(task.priority)}>
                                        {task.priority}
                                    </span>
                                </td>

                                {/* Status Badge */}
                                <td className="p-4">
                                    <span className={getStatusBadge(task.status)}>
                                        {task.status}
                                    </span>
                                </td>

                                {/* Assigned User */}
                                <td className="p-4 text-sm text-slate-600">
                                    {task.assignedUser}
                                </td>

                                {/* Due Date */}
                                <td className="p-4 text-sm text-slate-600">
                                    {task.dueDate}
                                </td>

                                {/* Actions */}
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onEdit(task.id)}
                                            className="bg-amber-500 hover:bg-amber-600 transition-colors text-white px-3 py-1 rounded text-sm cursor-pointer"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => onDelete(task.id)}
                                            className="bg-red-500 hover:bg-red-600 transition-colors text-white px-3 py-1 rounded text-sm cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}