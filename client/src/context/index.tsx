import React, { createContext, useState } from "react";

export const TasksContext = createContext([]);

export const TasksProvider = ({ children}) => {
	const [tasks, setTasks] = useState([]);
	const [history, setHistory] = useState([]);

	const updateTasks = (newTasks) => {
		setHistory(history => [...history, tasks]);
		setTasks(newTasks);
	}

	const createTask = (task) => {
		updateTasks([...tasks,task]);
	}

	const updateTask = (updatedTask) => {
		updateTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
	}

	const deleteTask = (taskId) => {
		updateTasks(tasks.filter(task => task.id !== taskId));
	}

	const undoTask = () => {
		if(history.length > 0) {
			setTasks(history[history.length -1 ]);
			setHistory(history.slice(0, history.length -1 ));
		}
	}

	return (
		<TasksContext.Provider value={{ tasks, createTask, updateTask, deleteTask, undoTask}}>
			{children}
		</TasksContext.Provider>
	)
}