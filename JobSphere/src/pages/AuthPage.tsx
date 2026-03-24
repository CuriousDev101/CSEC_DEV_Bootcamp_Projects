import { useLocation, Outlet } from "react-router-dom";

const AuthPage: React.FC = () => {
	const location = useLocation();
	const isSignup = location.pathname === "/auth/signup";

	return (
		<div className="flex min-h-screen bg-white font-sans">
			<div
				className={`w-full lg:w-1/2 flex flex-col items-center justify-center px-8 md:px-24 py-12 ${isSignup ? "order-1" : "order-2"}`}
			>
				<div className="w-full max-w-md">
					<Outlet />
				</div>
			</div>

			<div
				className={`hidden lg:flex lg:w-1/2 bg-[#F2F2F2] w-full ${isSignup ? "order-2" : "order-1"}`}
			>
				<img
					src={isSignup ? "/assets/signup.svg" : "/assets/login.svg"}
					alt="Auth Illustration"
					className="w-full h-auto"
				/>
			</div>
		</div>
	);
};

export default AuthPage;
