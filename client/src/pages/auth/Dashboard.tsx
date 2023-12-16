import { useAppSelector } from "../../store";

const Dashboard = () => {
	const { user } = useAppSelector((state) => state.auth.value);

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div className="space-y-3">
				<h1 className="text-2xl font-semibold">Welcome To Dashboard</h1>
				<pre className=" font-serif text-md cursor-pointer">
					Username: {user.name} <br/>
					Email: {user.email}
				</pre>
			</div>
		</div>
	);
};

export default Dashboard;
