import Job from "../models/job.model.ts";

interface JobInput {
	title: string;
	type: string;
	logo: string;
	isBookmarked: boolean;
	currency: string;
	experienceLevel: string;
	description: string;
	company: string;
	location: string;
	salary: string;
}

interface JobQueryParams {
	company?: string;
	location?: string;
	currency?: string;
	experienceLevel?: string;
	type?: string;
	isBookmarked?: string;
	title?: string;
	salaryMin?: string;
	salaryMax?: string;
	search?: string;
	_page?: string;
	_per_page?: string;
	_sort?: string;
	_order?: string;
}

interface PaginationResult {
	page: number;
	perPage: number;
	total: number;
	totalPages: number;
	hasNext: boolean;
	hasPrev: boolean;
}

export const getJobs = async () => {
	const jobs = await Job.find({});
	return jobs;
};

export const getJobById = async (id: string) => {
	const job = await Job.findById(id);
	return job;
};

export const createJob = async (job: JobInput) => {
	const newJob = await Job.create(job);
	return newJob;
};

export const updateJob = async (id: string, job: JobInput) => {
	const updatedJob = await Job.findByIdAndUpdate(id, job);
	return updatedJob;
};

export const deleteJob = async (id: string) => {
	const deletedJob = await Job.findByIdAndDelete(id);
	return deletedJob;
};

export const getJobsByCompany = async (company: string) => {
	const jobs = await Job.find({ company });
	return jobs;
};

export const getJobsByLocation = async (location: string) => {
	const jobs = await Job.find({ location });
	return jobs;
};

export const getJobsByCurrency = async (currency: string) => {
	const jobs = await Job.find({ currency });
	return jobs;
};

export const getJobsByExperienceLevel = async (experienceLevel: string) => {
	const jobs = await Job.find({ experienceLevel });
	return jobs;
};

export const getJobsByType = async (type: string) => {
	const jobs = await Job.find({ type });
	return jobs;
};

export const getJobsByIsBookmarked = async (isBookmarked: boolean) => {
	const jobs = await Job.find({ isBookmarked });
	return jobs;
};

export const getJobsByCreatedAt = async (createdAt: Date) => {
	const jobs = await Job.find({ createdAt });
	return jobs;
};

export const getJobsByTitle = async (title: string) => {
	const jobs = await Job.find({ title });
	return jobs;
};

export const getJobsByDescription = async (description: string) => {
	const jobs = await Job.find({ description });
	return jobs;
};

export const getJobsByCompanyAndLocation = async (
	company: string,
	location: string,
) => {
	const jobs = await Job.find({ company, location });
	return jobs;
};

export const buildQuery = (params: JobQueryParams): any => {
	const query: any = {};

	if (params.company) query.company = { $regex: params.company, $options: "i" };
	if (params.location)
		query.location = { $regex: params.location, $options: "i" };
	if (params.currency) query.currency = params.currency;
	if (params.experienceLevel) query.experienceLevel = params.experienceLevel;
	if (params.type) query.type = params.type;
	if (params.isBookmarked !== undefined)
		query.isBookmarked = params.isBookmarked === "true";

	if (params.salaryMin || params.salaryMax) {
		query.salary = {};
		if (params.salaryMin) query.salary.$gte = parseInt(params.salaryMin);
		if (params.salaryMax) query.salary.$lte = parseInt(params.salaryMax);
	}

	if (params.search) {
		query.$or = [
			{ title: { $regex: params.search, $options: "i" } },
			{ company: { $regex: params.search, $options: "i" } },
			{ description: { $regex: params.search, $options: "i" } },
			{ location: { $regex: params.search, $options: "i" } },
		];
	}

	return query;
};

export const searchJobs = async (
	params: JobQueryParams,
): Promise<{ data: any[]; pagination: PaginationResult }> => {
	const page = parseInt(params._page || "1");
	const perPage = parseInt(params._per_page || "10");
	const skip = (page - 1) * perPage;
	const sortField = params._sort || "createdAt";
	const sortOrder = params._order === "desc" ? -1 : 1;

	const query = buildQuery(params);
	const total = await Job.countDocuments(query);

	const jobs = await Job.find(query)
		.sort({ [sortField]: sortOrder })
		.skip(skip)
		.limit(perPage)
		.lean();

	return {
		data: jobs,
		pagination: {
			page,
			perPage,
			total,
			totalPages: Math.ceil(total / perPage),
			hasNext: page < Math.ceil(total / perPage),
			hasPrev: page > 1,
		},
	};
};
