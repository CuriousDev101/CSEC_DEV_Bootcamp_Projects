import type { Request, Response } from "express";

import {
	getJobs,
	getJobById,
	createJob,
	updateJob,
	deleteJob,
	searchJobs,
} from "../services/job.service.ts";

export const searchJobsController = async (req: Request, res: Response) => {
	try {
		const result = await searchJobs(req.query as any);
		res.json(result);
	} catch (error: any) {
		console.error("Search error:", error);
		res.status(500).json({ error: "Search failed", details: error.message });
	}
};

export const getJobByIdController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const job = await getJobById(id as string);
		res.status(200).json(job);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const createJobController = async (req: Request, res: Response) => {
	try {
		const job = req.body;
		const newJob = await createJob(job);
		res.status(201).json(newJob);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const updateJobController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const job = req.body;
		const updatedJob = await updateJob(id as string, job);
		res.status(200).json(updatedJob);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const deleteJobController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const deletedJob = await deleteJob(id as string);
		res.status(200).json(deletedJob);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};
