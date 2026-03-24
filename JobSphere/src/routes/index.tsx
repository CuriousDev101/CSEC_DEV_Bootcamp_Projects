import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import LoginForm from "../components/LoginFrom";
import SignupForm from "../components/SignupForm";
import MainLayout from "../pages/layouts/MainLayout";
import JobViewPage from "../pages/JobViewPage";
import ProtectedRoute from "./ProtectedRoute";
import JobPage from "../pages/JobPage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		errorElement: <NotFoundPage />,
		children: [
			{ index: true, element: <Home /> },
			{
				path: "jobs",
				element: (
					<ProtectedRoute>
						<JobPage />
					</ProtectedRoute>
				),
			},
			{
				path: "jobs/:id",
				element: (
					<ProtectedRoute>
						<JobViewPage />
					</ProtectedRoute>
				),
			},
		],
	},
	{
		path: "/auth",
		element: <AuthPage />,
		errorElement: <NotFoundPage />,
		children: [
			{ path: "login", element: <LoginForm /> },
			{ path: "signup", element: <SignupForm /> },
		],
	},
]);

export default router;
