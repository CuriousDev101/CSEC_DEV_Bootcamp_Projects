import mongoose from "mongoose";

type Job = {
	id: string;
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
	createdAt: Date;
	updatedAt: Date;
};

const jobSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	logo: {
		type: String,
		required: true,
	},
	isBookmarked: {
		type: Boolean,
		default: false,
	},
	currency: {
		type: String,
		required: true,
	},
	experienceLevel: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	company: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	salary: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model<Job>("Job", jobSchema);
