import { useRoutes, Navigate, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/auth/Dashboard";
import Login from "./pages/guest/Login";
import Register from "./pages/guest/Register";
import { useEffect } from "react";
import Loading from "./pages/Loading";
import { useAppDispatch, useAppSelector } from "./store";
import { login, logout } from "./store/reducers/auth.reducer";
import { whoamiService } from "./api/auth";
import Home from "./pages/guest/Home";
import Layout from "./pages/layout/Layout";
import Blog from "./pages/auth/Blog";
import Task from "./pages/auth/Task";

const Router = () => {
	const dispatch = useAppDispatch();
	const { checked, authorized } = useAppSelector((state) => state.auth.value);

	const token = localStorage.getItem("token");

	const handleAuthCheck = (accessToken: string) => {
		whoamiService(accessToken)
		.then((res) => {
			if (res.data.meta.status) {
				dispatch(
					login({
						checked: true,
						authorized: true,
						user: {
							id: parseInt(res.data.body.id, 10) || 0,
							name: res.data.body.username,
							email: res.data.body.email,
						},
					})
				);
			} else {
				dispatch(logout());
			}
		})
		.catch((err) => {
			console.log(err);
			dispatch(logout());
		});
	};

	useEffect(() => {
		if (token) {
			handleAuthCheck(token);
		} else {
			dispatch(logout());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	return (
		<>	
			{!checked ? (
				<Loading />
			) : checked && (
				<Layout isAuthorized={authorized}>
					<Routes>
						<Route path="/" element={<Home />} />
						{authorized ? (
							<>
								<Route path="/dashboard" element={<Dashboard />} />
								<Route path="/blog" element={<Blog />} />
								<Route path="/task" element={<Task />} />
								<Route path="*" element={<Navigate to="/dashboard" replace />} />
							</>
						) : (
							<> 
								<Route path="/login" element={<Login />} />
								<Route path="/register" element={<Register />} />
							</>
						)}
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</Layout>
			)}
		</>
	);
};

export default Router;
