export interface Job {
	id: string;
	title: string;
	type: string;
	salary: number;
	company: string;
	logo: string;
	experienceLevel: string;
	location: string;
	description: string;
	isBookMarked: boolean;
}

export interface JobFilters {
	title: string;
	location: string;
	datePosted?: string;
	type?: { [key: string]: boolean };
	company?: string;
	experienceLevel?: string;
	description?: string;
	salaryMin?: number;
	salaryMax?: number;
	currency?: string;
}
