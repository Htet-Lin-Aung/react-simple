import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Router from "./Router.tsx";
import "./index.css";
import store from "./store/index.ts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Router />
				<ToastContainer />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
