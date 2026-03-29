import { Link } from "react-router-dom";
import { ShieldX } from "lucide-react";

const NotFoundPage = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="flex flex-col items-center justify-center bg-white rounded-xl p-8 shadow-lg w-full max-w-md">
				<ShieldX className="text-red-500 mb-4" size={60} />
				<h1 className="text-4xl font-bold text-gray-900 mb-10">404</h1>
				<p className="text-center text-xl text-gray-700">Page not found</p>
				<p className="text-center text-xl text-gray-700">
					<Link to="/" className="text-[#0039D7] font-bold hover:underline">
						Go back home
					</Link>
				</p>
			</div>
		</div>
	);
};

export default NotFoundPage;
