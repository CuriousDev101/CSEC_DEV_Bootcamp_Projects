import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { loginUser } from "../api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const LoginForm: React.FC = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: handleLogin, isPending } = useMutation({
		mutationFn: loginUser,
		onSuccess: (user) => {
			queryClient.setQueryData(["authUser"], user);
			navigate("/jobs");
		},
		onError: (error: any) => alert(error.message),
	});

	const loginSchema = Yup.object({
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
		password: Yup.string()
			.min(6, "Password must be at least 6 characters")
			.required("Password is required"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: loginSchema,
		onSubmit: (values) => {
			handleLogin({ email: values.email, pass: values.password });
		},
	});

	const hasError = (field: keyof typeof formik.values) =>
		formik.touched[field] && formik.errors[field];

	return (
		<>
			<Link to="/">
				<img src="/assets/logo.svg" className="h-12 mb-2" />
			</Link>
			<h2 className="text-4xl font-bold text-gray-900 mb-10">
				Login to your account
			</h2>

			<form onSubmit={formik.handleSubmit} className="space-y-6">
				{/* Email Input */}
				<div className="relative group">
					<Mail
						className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${hasError("email")
								? "text-red-500"
								: "text-gray-400 group-focus-within:text-[#0039D7]"
							}`}
						size={20}
					/>
					<input
						{...formik.getFieldProps("email")}
						type="email"
						placeholder="Email"
						className={`w-full pl-12 pr-4 py-4 bg-white border rounded-xl text-lg focus:outline-none focus:ring-2 transition-all ${hasError("email")
								? "border-red-500 focus:ring-red-100"
								: "border-gray-300 focus:ring-[#0039D7] focus:border-transparent"
							}`}
					/>
					{hasError("email") && (
						<p className="text-red-500 text-sm mt-1 ml-2">
							{formik.errors.email}
						</p>
					)}
				</div>

				{/* Password Input */}
				<div className="relative group">
					<Lock
						className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${hasError("password")
								? "text-red-500"
								: "text-gray-400 group-focus-within:text-[#0039D7]"
							}`}
						size={20}
					/>
					<input
						{...formik.getFieldProps("password")}
						type="password"
						placeholder="Password"
						className={`w-full pl-12 pr-4 py-4 bg-white border rounded-xl text-lg focus:outline-none focus:ring-2 transition-all ${hasError("password")
								? "border-red-500 focus:ring-red-100"
								: "border-gray-300 focus:ring-[#0039D7] focus:border-transparent"
							}`}
					/>
					{hasError("password") && (
						<p className="text-red-500 text-sm mt-1 ml-2">
							{formik.errors.password}
						</p>
					)}
				</div>

				{/* Login Button */}
				<button
					type="submit"
					disabled={formik.isSubmitting}
					className="w-full bg-[#0039D7] text-white py-4 rounded-xl text-xl font-bold hover:bg-blue-800 transition-colors shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
				>
					{formik.isSubmitting ? "Processing..." : "Login"}
				</button>
			</form>

			<p className="text-center text-xl text-gray-700 mt-8">
				Don't have an account?{" "}
				<Link to="/signup" className="text-[#0039D7] font-bold hover:underline">
					Sign up
				</Link>
			</p>
		</>
	);
};

export default LoginForm;
