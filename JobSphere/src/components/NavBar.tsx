import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ChevronDown } from "lucide-react";
import { logout } from "../features/authSlice";

const Navbar: React.FC = () => {
	const { isAuthenticated, user } = useAppSelector((s) => s.auth);
	const [activeTab, setActiveTab] = useState("Home");
	const dispatch = useAppDispatch();

	const navLinks = {
		Home: "/",
		"Job Search": "/jobs",
		"My Applications": "/myapplication",
		Companies: "/companies",
		"Contact Us": "/contact-us",
	};

	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	const navLinkMap = Object.entries(navLinks);

	return (
		<nav className="w-full bg-white border-b border-gray-200 px-6 py-4 z-50">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<Link to="/">
					<img src="/assets/logo.svg" className="h-12" />
				</Link>

				<div className="hidden md:flex items-center space-x-8">
					{navLinkMap.map(([link, path]) => (
						<Link
							to={path}
							key={link}
							onClick={() => setActiveTab(link)}
							className={`text-lg font-medium transition-all duration-200 relative pb-1
                ${
									activeTab === link
										? 'text-[#0039D7] after:content-[""] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.75 after:bg-[#0039D7]'
										: "text-gray-700 hover:text-[#0039D7]"
								}`}
						>
							{link}
						</Link>
					))}
				</div>

				<div className="flex items-center space-x-4">
					{!isAuthenticated ? (
						<>
							<Link
								to="/auth/login"
								className="bg-[#0039D7] text-white px-12 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
							>
								Login
							</Link>
							<Link
								to="/auth/signup"
								className="border-2 border-[#0039D7] text-gray-800 px-12 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
							>
								Sign In
							</Link>
						</>
					) : (
						<div className="relative">
							<button
								className="bg-[#0039D7] text-white px-12 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
								onClick={toggle}
							>
								{user?.firstName[0]}
								{user?.lastName[0]}
							</button>
							<div className="absolute right-0 -bottom-1.5 -translate-y-1/2 -translate-x-1/2 text-gray-700 w-6 h-6 flex items-center justify-center">
								<ChevronDown className="w-6 h-6" />
							</div>
							<div
								className={`absolute right-0 ${isOpen ? "top-full bloack" : "-bottom-full hidden"} bg-white border border-gray-200 rounded-xl p-4 shadow-lg`}
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-4">
										<button
											className="bg-[#0039D7] text-white px-12 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
											onClick={() => dispatch(logout())}
										>
											Logout
										</button>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

// <div className="bg-blue-700 rounded-full p-auto text-white font-medium flex items-center justify-center py-2 px-2">
// 	{user?.firstName[0]}
// 	{user?.lastName[0]}
// </div>
