import express from "express";
import {
	getJobByIdController,
	createJobController,
	updateJobController,
	deleteJobController,
	searchJobsController,
} from "../controllers/job.controller.ts";

const routes: express.Router = express.Router();

routes.get("/", searchJobsController);
routes.get("/:id", getJobByIdController);
routes.post("/", createJobController);
routes.put("/:id", updateJobController);
routes.delete("/:id", deleteJobController);

export default routes;
