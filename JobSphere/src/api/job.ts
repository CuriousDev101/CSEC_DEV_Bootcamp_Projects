import type { Job, JobFilters } from "../types";

const baseUrl = "http://localhost:3000";

export const fetchJobs = async (page = 4) => {
	const res = await fetch(`${baseUrl}/jobs?_page=${page}`);

	if (!res.ok) {
		throw new Error(`Failed to fetch jobs: ${res.status}`);
	}

	const pages = await res.json();

	return pages.data as Job[];
};

export const searchJobs = async (filters: JobFilters, page = 4) => {
	const params = new URLSearchParams();

	Object.entries(filters).forEach(([key, value]) => {
		if (!value || (Array.isArray(value) && value.length === 0)) return;

		if (Array.isArray(value)) {
			value.forEach((v) => params.set(`${key}:in"`, v));
		} else {
			if (value instanceof Object) {
				const filteredJob = Object.entries(value).filter((type) => {
					return type[1];
				});
				const jobTypes = filteredJob.map((type) => type[0]).join(",");
				params.set(`${key}:in`, jobTypes);
			} else {
				params.set(`${key}:contains`, value);
			}
		}
	});

	console.log("params", params.toString());
	const res = await fetch(`${baseUrl}/jobs?${params.toString()}&_page=${page}`);

	if (!res.ok) throw new Error("Failed");

	const pages = await res.json();

	return pages.data as Job[];
};

export const getJobById = async (id: string) => {
	const res = await fetch(`${baseUrl}/jobs/${id}`);

	if (!res.ok) {
		throw new Error(`Failed to fetch job: ${res.status}`);
	}

	const data = await res.json();

	return data as Job;
};

export const relatedJobs = async (company: string) => {
	const res = await fetch(`${baseUrl}/jobs?company=${company}`);

	if (!res.ok) {
		throw new Error(`Failed to fetch related job: ${res.status}`);
	}

	const data = await res.json();

	return data as Job[];
};

export const savedJobs = async () => {
	const res = await fetch(
		`${baseUrl}/jobs?isBookMarked=true&_per_page=4&_page=10`,
	);

	if (!res.ok) {
		throw new Error(`Failed to fetch saved job: ${res.status}`);
	}

	const page = await res.json();

	return page.data as Job[];
};

interface BookmarkArgs {
	id: string;
	mark: boolean;
}

export const setBookMark = async ({ id, mark }: BookmarkArgs) => {
	const res = await fetch(`${baseUrl}/jobs/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ isBookMarked: !mark }),
	});

	if (!res.ok) throw new Error("Failed to update bookmark");
	return res.json() as Promise<Job>;
};
