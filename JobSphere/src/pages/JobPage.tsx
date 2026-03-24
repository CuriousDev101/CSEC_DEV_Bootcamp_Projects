import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import JobCard from "../components/JobCard";
import JobFilter from "../components/JobFilter";
import JobListing from "../components/JobListing";
import JobSearch from "../components/JobSearch";
import { savedJobs, searchJobs, setBookMark } from "../api/job";
import type { Job, JobFilters } from "../types";
import { useState } from "react";
import { LucideLoader } from "lucide-react";
import { useDebounce } from "../app/hooks";

const JobPage = () => {
	const [filters, setFilters] = useState<JobFilters>({
		title: "",
		location: "",
	});
	const debounceTitle = useDebounce(filters.title);
	const debounceLocation = useDebounce(filters.location);

	const finalFilters = {
		...filters,
		title: debounceTitle,
		location: debounceLocation,
	};

	const queryClient = useQueryClient();

	const { data: jobs, isLoading } = useQuery({
		queryKey: ["jobs", finalFilters],
		queryFn: () => searchJobs(finalFilters),
	});

	const { data: savedJobsData, isLoading: isSavedJobLoading } = useQuery({
		queryKey: ["savedjobs"],
		queryFn: () => savedJobs(),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: setBookMark,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["jobs"] });
		},
		onError: (error) => {
			console.error("Bookmark failed:", error);
		},
	});

	const handleBookmark = (job: Job) => {
		mutate({ id: job.id, mark: job.isBookMarked });
	};

	const onSearch = async () => {
		// const searchResult = await searchJobs(debounceSearch, debounceLocation);
	};
	return (
		<div>
			<div className="my-7 flex justify-center space-x-8 mx-auto px-4">
				<div className="">
					<JobFilter filters={filters} setFilters={setFilters} />
				</div>
				<div className="flex flex-col space-y-4">
					<JobSearch
						onSearchChange={(e) =>
							setFilters((prev) => ({
								...prev,
								title: e.target.value,
							}))
						}
						onLocationChange={(e) =>
							setFilters((prev) => ({
								...prev,
								location: e.target.value,
							}))
						}
						onClick={onSearch}
					/>
					<div className="flex flex-col items-center space-y-2">
						<LucideLoader className={isLoading ? "animate-spin" : "hidden"} />
						{jobs?.map((job, index) => (
							<JobCard key={index} {...job} compacted={false} />
						))}
					</div>
				</div>

				<div className="">
					<JobListing title="Saved Jobs">
						<div className="flex flex-col items-center space-y-2">
							<LucideLoader
								className={isSavedJobLoading ? "animate-spin" : "hidden"}
							/>

							{savedJobsData?.map((job, i) => (
								<JobCard key={i} {...job} compacted={true} />
							))}
						</div>
					</JobListing>
				</div>
			</div>
		</div>
	);
};

export default JobPage;
