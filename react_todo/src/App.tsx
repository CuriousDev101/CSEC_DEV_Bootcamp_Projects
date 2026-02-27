import { useState, type SubmitEvent } from "react";
import { TaskStat } from "./components/TaskStat";
import { TaskList } from "./components/TaskList";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [useTasks, setTasks] = useState<Task[]>([
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
  ]);

  const active = useTasks.filter((task) => !task.completed).length;
  const completed = useTasks.filter((task) => task.completed).length;
  const total = useTasks.length;

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id: number, newTitle: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task,
      ),
    );
  };

  const [useTask, setTask] = useState("");
  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (useTask.trim()) {
      const newTask: Task = {
        id: Math.random() * 1000,
        title: useTask,
        completed: false,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTask("");
    }
  };

  return (
    <>
      <div className="container">
        <header>
          <div className="title">
            <div className="logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-check-icon lucide-circle-check todo-icon"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h1>To-Do List</h1>
          </div>
          <p>Stay organized and productive</p>
        </header>

        <div className="task-form">
          <form onSubmit={(e) => submit(e)}>
            <input
              type="text"
              onChange={(e) => setTask(e.target.value)}
              value={useTask}
              placeholder="Add a new task..."
            />
            <button type="submit">+ Add</button>
          </form>
        </div>

        <div className="task-status">
          <TaskStat statCount={active} statName="Active" style="active" />
          <TaskStat
            statCount={completed}
            statName="Completed"
            style="completed"
          />
          <TaskStat statCount={total} statName="Total" style="total" />
        </div>

        <TaskList
          tasks={useTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      </div>
    </>
  );
}

export default App;
