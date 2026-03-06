import { useState, type SubmitEvent } from "react";
import { TaskStat } from "./components/TaskStat";
import { TaskList } from "./components/TaskList";
import { useTaskStore } from "./stores/useTaskStore";
import { useThemeStore } from "./stores/useThemeStore";
import { CircleCheck, Moon, Sun } from "lucide-react";

interface Task {
	id: number;
	title: string;
	completed: boolean;
}

function App() {
	const addTask = useTaskStore((state) => state.addTask);
	const theme = useThemeStore((state) => state.theme);
	const toggleTheme = useThemeStore((state) => state.toggleTheme);

	const activeCount = useTaskStore((state) => state.activeCount());
	const completedCount = useTaskStore((state) => state.completedCount());
	const totalCount = useTaskStore((state) => state.totalCount());

	const [useTask, setTask] = useState("");

	const submit = (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (useTask.trim()) {
			const newTask: Task = {
				id: Math.random() * 1000,
				title: useTask,
				completed: false,
			};

			addTask(newTask);
			setTask("");
		}
	};

	return (
		<>
			<div className="fixed top-4 right-4">
				<button
					className="rounded-full p-2 border dark:border-white dark:bg-white shadow-md hover:opacity-85"
					onClick={toggleTheme}
				>
					{theme === "dark" ? <Sun /> : <Moon />}
				</button>
			</div>

			<div className="mx-auto max-w-175">
				<header className=" text-center mb-8">
					<div className="flex justify-center items-center gap-3 mb-2">
						<div className="">
							<CircleCheck className="w-10 h-10 text-[#2563eb]" />
						</div>
						<h1 className="text-[36px] text-bold dark:text-white">
							To-Do List
						</h1>
					</div>
					<p className="text-[#6b7280]">Stay organized and productive</p>
				</header>

				<div className="mb-6">
					<form className="flex gap-2" onSubmit={(e) => submit(e)}>
						<input
							className="flex-1 py-3 px-4 border border-[#d1d5db] rounded-lg outline-none text-base dark:text-white"
							type="text"
							onChange={(e) => setTask(e.target.value)}
							value={useTask}
							placeholder="Add a new task..."
						/>
						<button
							className="flex items-center gap-1.5 py-3 px-5 rounded-lg bg-[#2563eb] text-white text-[18px] cursor-pointer font-medium"
							type="submit"
						>
							+ Add
						</button>
					</form>
				</div>

				<div className="flex gap-4 mb-6">
					<TaskStat statCount={activeCount} statName="Active" style="active" />
					<TaskStat
						statCount={completedCount}
						statName="Completed"
						style="completed"
					/>
					<TaskStat statCount={totalCount} statName="Total" style="total" />
				</div>

				<TaskList />
			</div>
		</>
	);
}

export default App;
