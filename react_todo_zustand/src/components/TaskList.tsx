import { useTaskStore } from "../stores/useTaskStore";
import { TaskItem } from "./TaskItem";

export const TaskList = () => {
	const tasks = useTaskStore((state) => state.tasks);
	return (
		<div className="flex flex-col gap-2.5">
			{tasks.length === 0 ? (
				<div className="empty-wrapper">
					<div className="text-center py-9 px-0 border rounded-lg border-[#e5e7eb] bg-white dark:bg-[#121212]">
						<p className="text-[#9ca3af]">
							No tasks yet. Add one above to get started!
						</p>
					</div>
				</div>
			) : (
				tasks.map((task) => <TaskItem key={task.id} task={task} />)
			)}
		</div>
	);
};
