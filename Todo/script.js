const taskForm = document.querySelector("form");
const taskItemTemplate = document.querySelector("#template");
const taskList = document.querySelector(".task-list");
const taskInput = taskForm.querySelector("input");

let tasks = [
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
	{ id: Math.random() * 1000, title: "Hover to delete items", completed: true },
];

const activeStatus = document.querySelector(".status.active");
const completedStatus = document.querySelector(".status.completed");
const totalStatus = document.querySelector(".status.total");

const updateStatus = () => {
	const active = tasks.filter((task) => !task.completed).length;
	const completed = tasks.filter((task) => task.completed).length;
	const total = tasks.length;

	activeStatus.textContent = active;
	completedStatus.textContent = completed;
	totalStatus.textContent = total;
};

const renderTasks = () => {
	taskList.innerHTML = "";
	tasks.forEach((task) => {
		const taskItem = document
			.importNode(taskItemTemplate.content, true)
			.querySelector(".task-item");

		const input = taskItem.querySelector("input");
		const taskTitle = taskItem.querySelector(".task-title");
		const editBtn = taskItem.querySelector(".btn-edit");
		const deleteBtn = taskItem.querySelector(".btn-delete");

		taskTitle.textContent = task.title;
		input.checked = task.completed;
		if (task.completed) {
			taskTitle.classList.add("task-completed");
		}

		input.addEventListener("change", () => {
			task.completed = input.checked;
			taskTitle.classList.toggle("task-completed", task.completed);
			updateStatus();
		});

		deleteBtn.addEventListener("click", () => {
			tasks = tasks.filter((t) => t.id !== task.id);
			renderTasks();
			updateStatus();
		});

		editBtn.addEventListener("click", () => {
			const currentTitle = task.title;
			const editInput = document.createElement("input");
			editInput.type = "text";
			editInput.value = currentTitle;
			editInput.className = "edit-input";

			taskTitle.replaceWith(editInput);
			editInput.focus();

			const saveEdit = () => {
				const newTitle = editInput.value.trim();
				if (newTitle) {
					task.title = newTitle;
					renderTasks();
				} else {
					editInput.replaceWith(taskTitle);
				}
			};

			editInput.addEventListener("blur", saveEdit);
			editInput.addEventListener("keydown", (e) => {
				if (e.key === "Enter") saveEdit();
				if (e.key === "Escape") {
					editInput.removeEventListener("blur", saveEdit);
					renderTasks();
				}
			});
		});

		taskList.append(taskItem);
	});
};

taskForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const title = taskInput.value.trim();
	if (title) {
		tasks.push({
			id: Math.random() * 1000,
			title,
			completed: false,
		});
		taskInput.value = "";
		renderTasks();
		updateStatus();
	}
});

renderTasks();
updateStatus();
