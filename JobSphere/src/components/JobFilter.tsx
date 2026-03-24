import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import type { JobFilters } from "../types";

interface Props {
	filters: JobFilters;
	setFilters: React.Dispatch<React.SetStateAction<JobFilters>>;
}

type EventInput = React.ChangeEvent<HTMLInputElement, HTMLInputElement>;

const JobFilter: React.FC<Props> = ({ filters, setFilters }) => {
	const jobTypes: [string, boolean][] = [
		["Full-time", true],
		["Remote", true],
		["Hybrid", true],
		["Onsite", true],
		["Contract", true],
	];

	const experiences = ["All", "Entry Level", "Mid Level", "Senior Level"];

	const [minSalary, setMinSalary] = useState(20);
	const [maxSalary, setMaxSalary] = useState(2000);

	const minLimit = 0;
	const maxLimit = 5000;

	const handleChangeMin = (e: EventInput) => {
		const value = Number(e.target.value);
		if (value < maxSalary) setMinSalary(value);
	};

	const handleChangeMax = (e: EventInput) => {
		const value = Number(e.target.value);
		if (value > minSalary) setMaxSalary(value);
	};

	const minPos = (minSalary / maxLimit) * 100;
	const maxPos = (maxSalary / maxLimit) * 100;

	const resetFilters = () => {
		setFilters({
			title: "",
			location: "",
			type: {},
			experienceLevel: "",
			salaryMin: 0,
			salaryMax: 0,
			currency: "USD",
		});
	};

	return (
		<div className="w-full max-w-xs bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
			<h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
				Filter
			</h2>

			{/* Date Posted */}
			<div className="mb-6">
				<label className="block text-2xl font-medium text-gray-800 mb-2">
					Date Posted
				</label>
				<div className="relative">
					<select
						className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 text-xl text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						defaultValue=""
						// onChange={(e) =>
						//	 setFilters({ ...filters, datePosted: e.target.value })
						//}
					>
						<option value="">All</option>
						<option value="24h">Last 24 Hours</option>
						<option value="7d">Last 7 Days</option>
						<option value="30d">Last 30 Days</option>
					</select>
					<ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-6 h-6" />
				</div>
			</div>

			{/* Job Type */}
			<div className="mb-6">
				<label className="block text-2xl font-medium text-gray-800 mb-2">
					Job Type
				</label>
				<div className="border border-gray-300 rounded-2xl p-4 space-y-3">
					{jobTypes.map(([type, checked]) => (
						<label
							key={type}
							className="flex items-center group cursor-pointer"
							htmlFor="jobtype"
						>
							<div className="relative flex items-center">
								<input
									type="checkbox"
									defaultChecked={checked}
									className="peer appearance-none w-6 h-6 border-2 border-gray-800 rounded-md checked:bg-white transition-all"
									value={type}
									id="jobtype"
									onChange={(e) =>
										setFilters({
											...filters,
											type: {
												...filters.type,
												[type]: e.target.checked,
											},
										})
									}
								/>
								<svg
									className="absolute w-4 h-4 left-1 text-gray-800 hidden peer-checked:block pointer-events-none"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<span className="ml-3 text-xl text-gray-700">{type}</span>
						</label>
					))}
				</div>
			</div>

			{/* Location */}
			<div className="mb-6">
				<label className="block text-2xl font-medium text-gray-800 mb-2">
					Location
				</label>
				<div className="relative">
					<MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-6 h-6" />
					<input
						type="text"
						placeholder="Enter your location"
						className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 text-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
						onChange={(e) =>
							setFilters({ ...filters, location: e.target.value })
						}
					/>
				</div>
			</div>

			{/* Experience Level */}
			<div className="mb-6">
				<label className="block text-2xl font-medium text-gray-800 mb-2">
					Experience Level
				</label>
				<div className="relative">
					<select
						className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 text-xl text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						defaultValue=""
						onChange={(e) =>
							setFilters({ ...filters, experienceLevel: e.target.value })
						}
					>
						{experiences.map((experience, index) => (
							<option key={index} value={experience}>
								{experience}
							</option>
						))}
					</select>
					<ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-6 h-6" />
				</div>
			</div>

			{/* Salary Range */}
			<div className="mb-6 w-full max-w-md mx-auto">
				<label className="block text-2xl font-medium text-gray-800 mb-2">
					Salary Range
				</label>

				<div className="px-2 pt-12 pb-4">
					<div className="relative h-2 bg-gray-200 rounded-full">
						{/* Active range */}
						<div
							className="absolute top-0 bottom-0 bg-[#0039D7] rounded-full"
							style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
						/>

						{/* Min slider */}
						<input
							type="range"
							min={minLimit}
							max={maxLimit}
							value={minSalary}
							onChange={handleChangeMin}
							className="absolute w-full h-2 appearance-none bg-transparent z-20 cursor-pointer
              [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-[#0039D7]
              [&::-webkit-slider-thumb]:shadow"
						/>

						{/* Max slider */}
						<input
							type="range"
							min={minLimit}
							max={maxLimit}
							value={maxSalary}
							onChange={handleChangeMax}
							className="absolute w-full h-2 appearance-none bg-transparent z-30 cursor-pointer
              [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-[#0039D7]
              [&::-webkit-slider-thumb]:shadow"
						/>

						{/* Labels */}
						<div
							className="absolute -top-10 -translate-x-1/2 text-gray-600 text-lg flex flex-col items-center"
							style={{ left: `${minPos}%` }}
						>
							${minSalary.toLocaleString()}
							<div className="h-4 w-px bg-gray-400 mt-1" />
						</div>

						<div
							className="absolute -top-10 -translate-x-1/2 text-gray-600 text-lg flex flex-col items-center"
							style={{ left: `${maxPos}%` }}
						>
							${maxSalary.toLocaleString()}
							<div className="h-4 w-px bg-gray-400 mt-1" />
						</div>
					</div>
				</div>

				{/* Manual input */}
				<div className="mt-6 text-center">
					<p className="text-xl font-medium text-gray-700 mb-2">
						Input Manually
					</p>

					<div className="flex items-center justify-center gap-3">
						<span className="text-lg text-gray-500">From</span>
						<input
							type="number"
							value={minSalary}
							onChange={(e) => {
								const val = Number(e.target.value);
								if (val >= minLimit && val < maxSalary) {
									setMinSalary(val);
								}
							}}
							className="w-20 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>

						<span className="text-lg text-gray-500">To</span>
						<input
							type="number"
							value={maxSalary}
							onChange={(e) => {
								const val = Number(e.target.value);
								if (val <= maxLimit && val > minSalary) {
									setMaxSalary(val);
								}
							}}
							className="w-20 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
				</div>
			</div>

			{/* Currency */}
			<div className="mb-10">
				<label className="block text-2xl font-medium text-gray-800 mb-2">
					Currency
				</label>
				<div className="relative">
					<select
						className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 text-xl text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						onChange={(e) =>
							setFilters({ ...filters, currency: e.target.value })
						}
						defaultValue="USD"
					>
						<option value="USD">Dollar ($)</option>
						<option value="EUR">Euro (€)</option>
					</select>
					<ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-6 h-6" />
				</div>
			</div>

			{/* Reset Button */}
			<button
				onClick={resetFilters}
				className="w-full bg-[#0039D7] text-white py-4 rounded-2xl text-2xl font-bold hover:bg-blue-800 transition-colors"
			>
				Reset all filter
			</button>
		</div>
	);
};

export default JobFilter;
