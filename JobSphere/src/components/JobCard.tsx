import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, Share2, X } from "lucide-react";
import { setBookMark } from "../api/job";

interface Props {
	id: string;
	title: string;
	type: string;
	salary: number;
	logo: string;
	location: string;
	description: string;
	isBookMarked: boolean;
	compacted: boolean;
}

const JobCard: React.FC<Props> = ({
	id,
	title,
	type,
	salary,
	logo,
	location,
	description,
	isBookMarked: initialBookMarked,
	compacted,
}) => {
	const [isMarked, setIsMarked] = useState(initialBookMarked);
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: setBookMark,
		onMutate: ({ id, mark }) => {
			// Optimistic flip
			setIsMarked(!mark);
		},
		onError: (error) => {
			console.error("Bookmark failed:", error);
			// Optionally revert on error, using queryClient.getQueryData for previous value
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["jobs"] });
		},
	});

	const handleBookmark = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		id: string,
		mark: boolean,
	) => {
		e.preventDefault();
		e.stopPropagation();
		mutate({ id, mark });
	};

	return (
		<div className="flex items-start rounded-xl bg-white border border-gray-300 shadow-xl max-w-xl p-4 space-x-4 w-full">
			<div className="w-10 shrink-0">
				<img src={logo} className="w-10 h-10 rounded-full object-cover" />
			</div>

			<div className="flex-1 w-full">
				<div className="flex justify-between items-start">
					<Link to={`/jobs/${id}`} className="flex-1 pr-4">
						<div>
							<h3
								className={`${compacted ? "text-lg" : "text-2xl"} font-semibold`}
							>
								{title}
							</h3>
							<p className="text-md text-gray-600">{location}</p>
						</div>
					</Link>

					<div className="flex items-center space-x-3 shrink-0">
						{compacted ? (
							<X
								className="cursor-pointer text-gray-400 hover:text-red-500"
								size={20}
							/>
						) : (
							<>
								<button
									onClick={(e) => handleBookmark(e, id, isMarked)}
									disabled={isPending}
								>
									<Bookmark
										size={22}
										className={
											isMarked
												? "fill-[#0036D7] stroke-[#0036D7] cursor-pointer"
												: "cursor-pointer"
										}
									/>
								</button>
								<Share2 size={22} className="cursor-pointer" />
							</>
						)}
					</div>
				</div>

				<div className="flex flex-wrap gap-2 mt-2">
					<div className="bg-gray-100 text-gray-600 text-xs font-medium rounded px-2 py-1">
						{location}
					</div>

					<div className="bg-gray-100 text-gray-600 text-xs font-medium rounded px-2 py-1">
						{type}
					</div>

					<div className="bg-gray-100 text-gray-600 text-xs font-medium rounded px-2 py-1">
						$ {salary}
					</div>
				</div>

				{!compacted && (
					<div className="mt-3">
						<p className="text-gray-500 line-clamp-3">{description}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default JobCard;
