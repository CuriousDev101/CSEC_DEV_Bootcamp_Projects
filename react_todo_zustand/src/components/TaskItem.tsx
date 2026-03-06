import { useState } from "react";
import { useTaskStore } from "../stores/useTaskStore";
import { Pencil, Trash2 } from "lucide-react";

interface Task {
	id: number;
	title: string;
	completed: boolean;
}

interface Props {
	task: Task;
}

export const TaskItem = ({ task }: Props) => {
	const toggleTask = useTaskStore((state) => state.toggleTask);
	const deleteTask = useTaskStore((state) => state.deleteTask);
	const editTask = useTaskStore((state) => state.editTask);

	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(task.title);

	const handleEditSubmit = () => {
		if (editedTitle.trim()) {
			editTask(task.id, editedTitle);
			setIsEditing(false);
		}
	};

	return (
		<div className="flex items-center gap-3 p-3 border border-[#e5e7eb] rounded-lg group bg-white dark:bg-[#121212]">
			<input
				className="w-4.5 h-4.5 cursor-pointer"
				type="checkbox"
				checked={task.completed}
				onChange={() => toggleTask(task.id)}
			/>

			{isEditing ? (
				<input
					className="flex-1 w-4.5 px-3 dark:text-white"
					value={editedTitle}
					onChange={(e) => setEditedTitle(e.target.value)}
					onBlur={handleEditSubmit}
					onKeyDown={(e) => e.key === "Enter" && handleEditSubmit()}
					autoFocus
				/>
			) : (
				<p
					className={`flex-1 ${task.completed ? "line-through text-[#9ca3af]" : "dark:text-white"}`}
				>
					{task.title}
				</p>
			)}
			<div className="flex gap-1.5 opacity-0 group-hover:opacity-100">
				<button
					className="rounded-lg cursor-pointer p-1.5 text-[#3b82f6] hover:bg-[#dbeafe]"
					type="button"
					onClick={() => setIsEditing(true)}
				>
					<Pencil className="bg-transparent w-4.5 h-4.5" />
				</button>

				<button
					className="rounded-lg cursor-pointer p-1.5 text-[#ef4444] hover:bg-[#fee2e2]"
					type="button"
					onClick={() => deleteTask(task.id)}
				>
					<Trash2 className="bg-transparent w-4.5 h-4.5" />
				</button>
			</div>
		</div>
	);
};
