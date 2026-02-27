import { TaskItem } from "./TaskItem";

interface Task {
	id: number;
	title: string;
	completed: boolean;
}

interface Props {
	tasks: Task[];
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	onEdit: (id: number, title: string) => void;
}

export const TaskList = ({ tasks, onToggle, onDelete, onEdit }: Props) => {
	return (
		<div className="task-list">
			{tasks.length === 0 ? (
				<div className="empty-wrapper">
					<div className="empty-box">
						<p className="empty-text">
							No tasks yet. Add one above to get started!
						</p>
					</div>
				</div>
			) : (
				tasks.map((task) => (
					<TaskItem
						key={task.id}
						task={task}
						onToggle={onToggle}
						onDelete={onDelete}
						onEdit={onEdit}
					/>
				))
			)}
		</div>
	);
};
