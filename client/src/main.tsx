
import ReactDOM from "react-dom/client";
import { TasksProvider } from "./context";
import TaskComponentWrapper from "./components/TasksComponent";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import Router from "./Router.tsx";
// import "./index.css";
// import store from "./store/index.ts";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
	<TasksProvider>
		<div>
			<h1>Task Manager</h1>
			<TaskComponentWrapper />
		</div>
	</TasksProvider>
);