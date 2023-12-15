import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerService } from "../../api/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Input from '../../components/Input';
import Loading from "../Loading";
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
	username: Yup.string()
		.required("Username is required"),
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: Yup.string()
		.required("Password is required"),
});

interface IRegisterFormProps {
	username: string;
	email: string;
	password: string;
}
const Register = () => {
	const navigation = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const {
		control,
		handleSubmit,
		reset,
		formState: {errors, isValid},
	  } = useForm<IRegisterFormProps>({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
	  });

	const handleRegister = async (data: IRegisterFormProps) => {
		setIsLoading(true);
		registerService(data)
		.then((response) => {
			console.log(response.status);
			if (response.status === 200 || response.status === 201) { // Success case
				toast.success("Registration is successful", { position: toast.POSITION.TOP_RIGHT });
				navigation("/login");
			} else { // Error case
				toast.error(response.data.meta.message, { position: toast.POSITION.TOP_RIGHT });
			}
		})
		setIsLoading(false);

	};

	// JSX
	return (
		<div className="w-screen h-screen flex items-center justify-center">
			{isLoading ? (
				<Loading /> // Show loading screen when isLoading is true
			) : (
				<div className="border border-gray-700 rounded-md p-4">
					<h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">Register Here</h3>
					<form onSubmit={handleSubmit(handleRegister)}>
					<div className="w-full flex flex-col mb-4">
						<label>Username</label>
						<Input
						placeholder="Enter your username"
						name="username"
						control={control}
						errors={errors}
						isValid={isValid}
						/>
					</div>
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
						Register
						</button>
					</div>
					<div className="w-full text-center mt-2">
					Already have an account?
					<Link
						to="/login"
						className="text-blue-700 hover:underline font-semibold text-sm ml-2"
						>
						Login Here
						</Link>
					</div>
					</form>
				</div>
	  		)}
		</div>
  	);
};

export default Register;
