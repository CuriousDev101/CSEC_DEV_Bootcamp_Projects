import { create } from "zustand";

type Task = {
	id: number;
	title: string;
	completed: boolean;
};

type TaskStore = {
	tasks: Task[];
	activeCount: () => number;
	completedCount: () => number;
	totalCount: () => number;
};

type TaskActions = {
	toggleTask: (id: number) => void;
	deleteTask: (id: number) => void;
	editTask: (id: number, newTitle: string) => void;
	addTask: (newTask: Task) => void;
};

type TaskState = TaskStore & TaskActions;

const initialTask: Task[] = [
	{
		id: Math.random() * 1000,
		title: "Welcome to your to-do list!",
		completed: false,
	},
	{
		id: Math.random() * 1000,
		title: "Click the checkbox to mark as complete ",
		completed: false,
	},
	{
		id: Math.random() * 1000,
		title: "Hover to delete items",
		completed: true,
	},
];

export const useTaskStore = create<TaskState>((set, get) => ({
	tasks: initialTask,
	activeCount: () => get().tasks.filter((task) => !task.completed).length,
	completedCount: () => get().tasks.filter((task) => task.completed).length,
	totalCount: () => get().tasks.length,
	toggleTask: (id) =>
		set((state: TaskStore) => {
			const newTasks = state.tasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task,
			);

			return { tasks: newTasks };
		}),
	deleteTask: (id) =>
		set((state) => {
			const newTasks = state.tasks.filter((task) => task.id !== id);

			return { tasks: newTasks };
		}),
	editTask: (id, newTitle) =>
		set((state) => {
			const newTasks = state.tasks.map((task) => {
				return task.id === id ? { ...task, title: newTitle } : task;
			});
			return { tasks: newTasks };
		}),
	addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
}));
