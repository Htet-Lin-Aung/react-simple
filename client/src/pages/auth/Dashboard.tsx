import { useAppSelector } from "../../store";

const Dashboard = () => {
	const { user } = useAppSelector((state) => state.auth.value);

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div className="space-y-3">
				<h1 className="text-5xl font-semibold">Dashboard</h1>
				<pre className=" font-serif text-lg cursor-pointer">
					{JSON.stringify(user)}
				</pre>
			</div>
		</div>
	);
};

export default Dashboard;
