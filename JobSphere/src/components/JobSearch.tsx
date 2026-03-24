import { Search, MapPin } from "lucide-react";

type EventInput = React.ChangeEvent<HTMLInputElement, HTMLInputElement>;

interface Props {
	onSearchChange: (e: EventInput) => void;
	onLocationChange: (e: EventInput) => void;
	onClick: () => void;
}

export default function JobSearch({
	onSearchChange,
	onLocationChange,
	onClick,
}: Props) {
	return (
		<div className="flex items-center w-full max-w-7xl mx-auto p-1 md:p-2 bg-white rounded-xl shadow-lg border border-gray-100 font-sans">
			<div className="flex items-center flex-1 px-4 pr-1 gap-3">
				<Search className="w-5 h-5 md:w-6 md:h-6 text-gray-900 stroke-2" />
				<input
					type="text"
					placeholder="Job title, Keywords, or Company name"
					className="flex-1 text-sm md:text-base text-gray-900 placeholder:text-gray-600 focus:outline-none bg-transparent"
					onChange={(e) => onSearchChange(e)}
				/>
			</div>

			<div className="h-10 w-px bg-gray-300 mx-1 md:mx-2" />

			<div className="flex items-center flex-1 px-1 pr-4 gap-2">
				<MapPin className="w-5 h-5 md:w-6 md:h-6 text-gray-900 fill-none stroke-2" />
				<input
					type="text"
					placeholder="Location"
					className="flex-1 text-sm md:text-base text-gray-900 placeholder:text-gray-600 focus:outline-none bg-transparent"
					onChange={(e) => onLocationChange(e)}
				/>
			</div>

			<button
				onClick={() => onClick()}
				className="flex-none px-8 py-1.5 md:px-6 md:py-1 ml-2 md:ml-3 text-base md:text-lg font-semibold text-white bg-[#0039D7] rounded-lg hover:bg-blue-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
			>
				Search
			</button>
		</div>
	);
}
