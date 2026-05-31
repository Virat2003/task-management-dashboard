import { Task } from "@/types/task";

export const tasks: Task[] = [
  {
    id: "1",
    title: "Design Dashboard",
    description: "Create dashboard UI",
    priority: "High",
    status: "Pending",
    assignedUser: "Virat",
    dueDate: "2026-06-10",
  },
  {
    id: "2",
    title: "Implement Login",
    description: "Build login page",
    priority: "Medium",
    status: "Completed",
    assignedUser: "Rahul",
    dueDate: "2026-06-05",
  },
  {
    id: "3",
    title: "Create Task Module",
    description: "CRUD operations",
    priority: "High",
    status: "In Progress",
    assignedUser: "Amit",
    dueDate: "2026-06-15",
  },
];