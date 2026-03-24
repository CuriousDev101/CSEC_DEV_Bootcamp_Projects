import {
	Bookmark,
	ChevronLeft,
	LucideLoader,
	Share2,
	Star,
} from "lucide-react";
import JobListing from "../components/JobListing";
import JobCard from "../components/JobCard";
import { useNavigate, useParams } from "react-router-dom";
import JobSearch from "../components/JobSearch";
import { useQuery } from "@tanstack/react-query";
import { getJobById, relatedJobs } from "../api/job";

const JobViewPage: React.FC = () => {
	const navtigate = useNavigate();
	const { id } = useParams();

	const { data: job, isLoading: isJobLoading } = useQuery({
		queryKey: ["jobs", id],
		queryFn: () => getJobById(id!),
	});

	const { data: relatedJobsData, isLoading: isRelatedJobLoading } = useQuery({
		queryKey: ["relatedjobs", job?.company],
		queryFn: () => relatedJobs(job!.company),
		enabled: !!job?.company,
	});

	return (
		<>
			<div className="flex flex-col min-h-screen px-8">
				<div className="my-7 flex items-center justify-between  space-x-20 mr-auto px-8">
					<button className="flex" onClick={() => navtigate(-1)}>
						<ChevronLeft />
						back
					</button>
					<JobSearch />
				</div>

				<div className="my-7 flex justify-center space-x-8 mx-auto px-4">
					<div className="w-full max-w-5xl bg-white border border-gray-200 rounded-4xl p-8 shadow-sm">
						{/* Header Section */}

						<div className="flex flex-col items-center space-y-2">
							<LucideLoader
								className={isRelatedJobLoading ? "animate-spin" : "hidden"}
							/>
						</div>
						<div className="flex justify-between items-start mb-6">
							<div className="flex items-center gap-4">
								<div className="flex flex-col items-center justify-center space-y-2">
									<LucideLoader
										className={isJobLoading ? "animate-spin" : "hidden"}
									/>
								</div>
								<div className="w-24 h-12 flex items-center justify-center">
									{/* Amazon Logo Placeholder */}
									<img
										src={job?.logo}
										alt={job?.title}
										className="w-full object-contain rounded-full"
									/>
								</div>
								<div>
									<h1 className="text-4xl font-bold text-gray-900">
										{job?.title}
									</h1>
									<div className="flex items-center gap-1 mt-1">
										<span className="text-xl text-gray-700">
											{job?.company}
										</span>
										<div className="flex ml-2">
											{[...Array(4)].map((_, i) => (
												<Star
													key={i}
													size={18}
													className="fill-yellow-400 text-yellow-400"
												/>
											))}
											<Star size={18} className="fill-gray-300 text-gray-300" />
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-col items-end gap-4">
								<div className="flex gap-4 text-gray-500">
									<Bookmark
										className="cursor-pointer hover:text-blue-600"
										size={28}
									/>
									<Share2
										className="cursor-pointer hover:text-blue-600"
										size={28}
									/>
								</div>
								<button className="bg-[#0039D7] text-white px-10 py-3 rounded-xl text-xl font-bold hover:bg-blue-800 transition-colors">
									Apply now
								</button>
							</div>
						</div>
						<div className="flex flex-col md:flex-row gap-12 mt-8">
							{/* Sidebar Info */}
							<div className="w-full md:w-1/4 space-y-8">
								<div>
									<h3 className="text-2xl font-bold text-gray-900 mb-1">
										Job type:
									</h3>
									<p className="text-xl text-gray-700">Full-time</p>
								</div>
								<div>
									Meta
									<h3 className="text-2xl font-bold text-gray-900 mb-1">
										Location:
									</h3>
									<p className="text-xl text-gray-700">
										{job?.location} ({job?.type})
									</p>
								</div>
								<div>
									<h3 className="text-2xl font-bold text-gray-900 mb-1">
										Experience:
									</h3>
									<p className="text-xl text-gray-700">
										{job?.experienceLevel}
									</p>
								</div>
								<div>
									<h3 className="text-2xl font-bold text-gray-900 mb-1">
										Number of Applicants:
									</h3>
									<p className="text-xl text-gray-700">40</p>
								</div>
							</div>

							{/* Main Content Area */}
							<div className="flex-1 space-y-8">
								<section>
									<h3 className="text-2xl font-bold text-gray-900 mb-3">
										Job description
									</h3>
									<p className="text-lg text-gray-600 leading-relaxed">
										{job?.description}
									</p>
									<p className="text-lg text-gray-600 mt-4 leading-relaxed">
										If you are passionate about creating top-notch digital
										experiences and have a keen eye for design, we would love to
										have you on board!
									</p>
								</section>

								<section>
									<h3 className="text-2xl font-bold text-gray-900 mb-4">
										Key Responsibilities
									</h3>
									<ul className="list-disc list-outside ml-6 space-y-3 text-lg text-gray-600">
										<li>
											Design and develop user-centric interfaces for web and
											mobile applications.
										</li>
										<li>
											Conduct user research, usability testing, and gather
											feedback to improve designs.
										</li>
										<li>
											Create wireframes, prototypes, and high-fidelity designs
											using design tools like Figma, Adobe XD, or Sketch.
										</li>
										<li>
											Collaborate with product managers and developers to ensure
											design consistency and feasibility.
										</li>
										<li>
											Stay updated with the latest UI/UX trends and best
											practices to ensure optimal user experience.
										</li>
										<li>
											Lead and mentor junior designers in the team, providing
											guidance and...
										</li>
									</ul>
								</section>
							</div>
						</div>
					</div>
					<div className="">
						<JobListing title="Related Jobs">
							<div className="flex flex-col items-center space-y-2">
								<LucideLoader
									className={isRelatedJobLoading ? "animate-spin" : "hidden"}
								/>

								{relatedJobsData?.map((job, i) => (
									<JobCard key={i} {...job} compacted={true} />
								))}
							</div>
						</JobListing>
					</div>
				</div>
			</div>
		</>
	);
};

export default JobViewPage;
