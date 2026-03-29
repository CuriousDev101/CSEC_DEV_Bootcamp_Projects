import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { User, Mail, Lock } from "lucide-react";
import { registerUser } from "../api/user";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/authSlice";

const SignupForm: React.FC = () => {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const { mutate: handleSignup, isPending } = useMutation({
		mutationFn: registerUser,
		onSuccess: () => {
			alert("Account created!");
			navigate("/jobs");
		},
		onError: (error: any) => alert(error.message),
	});

	const validationSchema = Yup.object({
		firstName: Yup.string().required("First name is required"),
		lastName: Yup.string().required("Last name is required"),
		email: Yup.string().email("Invalid email address").required("Required"),
		password: Yup.string()
			.min(6, "Password must be at least 6 characters")
			.required("Required"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password")], "Passwords must match")
			.required("Required"),
	});

	// 2. Formik Setup
	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema,
		onSubmit: (values) => {
			dispatch(login({ user: { ...values } }));
			handleSignup({ ...values });
		},
	});

	return (
		<>
			<Link to="/">
				<img src="/assets/logo.svg" className="h-12 mb-2" />
			</Link>

			<h2 className="text-4xl font-bold text-gray-900 mb-10">
				Create your account
			</h2>

			<form onSubmit={formik.handleSubmit} className="space-y-5">
				{/* First Name */}
				<div className="relative group">
					<User
						className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors 
                    ${formik.errors.firstName && formik.touched.firstName ? "text-red-500" : "text-gray-400 group-focus-within:text-[#0039D7]"}`}
						size={20}
					/>
					<input
						type="text"
						placeholder="First name"
						{...formik.getFieldProps("firstName")}
						className={`w-full pl-12 pr-4 py-4 bg-white border rounded-xl text-lg focus:outline-none focus:ring-2 transition-all
                        ${formik.errors.firstName && formik.touched.firstName ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#0039D7]"}`}
					/>
					{formik.touched.firstName && formik.errors.firstName && (
						<p className="text-red-500 text-sm mt-1 ml-2">
							{formik.errors.firstName}
						</p>
					)}
				</div>

				{/* Last Name */}
				<div className="relative group">
					<User
						className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors 
                    ${formik.errors.lastName && formik.touched.lastName ? "text-red-500" : "text-gray-400 group-focus-within:text-[#0039D7]"}`}
						size={20}
					/>
					<input
						type="text"
						placeholder="Last name"
						{...formik.getFieldProps("lastName")}
						className={`w-full pl-12 pr-4 py-4 bg-white border rounded-xl text-lg focus:outline-none focus:ring-2 transition-all
                        ${formik.errors.lastName && formik.touched.lastName ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#0039D7]"}`}
					/>
					{formik.touched.lastName && formik.errors.lastName && (
						<p className="text-red-500 text-sm mt-1 ml-2">
							{formik.errors.lastName}
						</p>
					)}
				</div>

				{/* Email */}
				<div className="relative group">
					<Mail
						className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0039D7]"
						size={20}
					/>
					<input
						type="email"
						placeholder="Email"
						{...formik.getFieldProps("email")}
						className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-[#0039D7]"
					/>
					{formik.touched.email && formik.errors.email && (
						<p className="text-red-500 text-sm mt-1 ml-2">
							{formik.errors.email}
						</p>
					)}
				</div>

				{/* Password */}
				<div className="relative group">
					<Lock
						className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0039D7]"
						size={20}
					/>
					<input
						type="password"
						placeholder="Password"
						{...formik.getFieldProps("password")}
						className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-[#0039D7]"
					/>
					{formik.touched.password && formik.errors.password && (
						<p className="text-red-500 text-sm mt-1 ml-2">
							{formik.errors.password}
						</p>
					)}
				</div>

				{/* Confirm Password */}
				<div className="relative group">
					<Lock
						className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0039D7]"
						size={20}
					/>
					<input
						type="password"
						placeholder="Confirm Password"
						{...formik.getFieldProps("confirmPassword")}
						className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-[#0039D7]"
					/>
					{formik.touched.confirmPassword && formik.errors.confirmPassword && (
						<p className="text-red-500 text-sm mt-1 ml-2">
							{formik.errors.confirmPassword}
						</p>
					)}
				</div>

				<button
					type="submit"
					disabled={formik.isSubmitting}
					className="w-full bg-[#0039D7] text-white py-4 rounded-xl text-xl font-bold hover:bg-blue-800 transition-colors shadow-lg mt-4 disabled:bg-gray-400"
				>
					{formik.isSubmitting ? "Creating..." : "Create account"}
				</button>
			</form>

			{/* Divider */}
			<div className="relative flex items-center my-8">
				<div className="grow border-t border-gray-300"></div>
				<span className="shrink mx-4 text-gray-500 text-lg font-medium">
					OR
				</span>
				<div className="grow border-t border-gray-300"></div>
			</div>

			{/* Social Logins */}
			<div className="flex justify-between items-center gap-4 mb-8">
				{["google", "apple", "facebook", "linkedin"].map((social) => (
					<button
						key={social}
						className="flex-1 flex justify-center py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
					>
						<img
							src={`https://logos.hunter.io/${social}.com`}
							alt={social}
							className="w-7 h-7"
						/>
					</button>
				))}
			</div>

			{/* Login Link */}
			<p className="text-center text-xl text-gray-700">
				Already have an account?{" "}
				<Link to="/auth/login" className="text-[#0039D7] font-bold hover:underline">
					Login
				</Link>
			</p>
		</>
	);
};

export default SignupForm;
