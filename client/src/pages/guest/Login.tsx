import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { login } from "../../store/reducers/auth.reducer";
import { loginService, whoamiService } from "../../api/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Input from '../../components/Input';
import Loading from "../Loading";
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: Yup.string()
		.required("Password is required"),
});

interface ILoginFormProps {
	email: string;
	password: string;
}

// Component
const Login = () => {
	// Hooks
	const navigation = useNavigate();
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const {
	  control,
	  handleSubmit,
	  reset,
	  formState: {errors, isValid},
	} = useForm<ILoginFormProps>({
	  resolver: yupResolver(validationSchema),
	  mode: 'onChange',
	});

  	// Event handler for login
  	const handleLogin = async (data: ILoginFormProps) => {
		setIsLoading(true);
		setTimeout(async () => {
			loginService(data)
			.then((res) => {
				if (res.data.meta.status) {
					whoamiService(res.data.body.token)
					.then((resWhoAmI) => {
						if (resWhoAmI.data.meta.status) {
							// Display success toast
							toast.success('Welcome!', { position: toast.POSITION.TOP_RIGHT });
							localStorage.setItem("token", res.data.body.token);
							dispatch(
								login({
									checked: true,
									authorized: true,
									user: {
										id: parseInt(resWhoAmI.data.body.id, 10) || 0,
										name: resWhoAmI.data.body.username,
										email: resWhoAmI.data.body.email,
									},
								})
							);
							navigation("/login")
						} else {
							reset();
							toast.error('Unauthorized User Login!', { position: toast.POSITION.TOP_RIGHT });
						}
					})
					.catch((errWhoAMI) => {
						reset();
						toast.error('Unauthorized User Login!', { position: toast.POSITION.TOP_RIGHT });
					});
				} else {
					reset();
					toast.error('Unauthorized User Login!', { position: toast.POSITION.TOP_RIGHT });
				}
			})
			.catch((err) => {
				reset();
				toast.error('Unauthorized User Login!', { position: toast.POSITION.TOP_RIGHT });
			});
			setIsLoading(false);
		}, 1000); //1 second loading time
	};

	// JSX
	return (
		<div className="w-screen h-screen flex items-center justify-center">
			{isLoading ? (
				<Loading /> // Show loading screen when isLoading is true
			) : (
				<div className="border border-gray-700 rounded-md p-4">
					<h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">Welcome User</h3>
					<form onSubmit={handleSubmit(handleLogin)}>
					<div className="w-full flex flex-col mb-4">
						<label>Email</label>
						<Input
						placeholder="Enter your email"
						name="email"
						control={control}
						errors={errors}
						isValid={isValid}
						/>
					</div>

					<div className="w-full flex flex-col mb-4">
						<label>Password</label>
						<Input
						placeholder="Enter your password"
						name="password"
						control={control}
						errors={errors}
						isValid={isValid}
						isPassword
						/>
					</div>

					<div className="w-full text-center">
						<button type="submit" className="bg-gray-700 rounded-md w-44 py-2 text-white text-center">
						Login
						</button>
					</div>
					<div className="w-full text-center mt-2">
					Are you a new user? 
					<Link
						to="/register"
						className="text-blue-700 hover:underline font-semibold text-sm ml-2"
						>
							Register Here
						</Link>
					</div>
					</form>
				</div>
	  		)}
		</div>
  	);
};

export default Login;
