import { Router } from "express";
import {
	getUserByIdController,
	updateUserController,
	deleteUserController,
} from "../controllers/user.controller.ts";
import { protect } from "../middleware/auth.middleware.ts";

const routes: Router = Router();

routes.get("/:id", getUserByIdController);
routes.put("/:id", protect, updateUserController);
routes.delete("/:id", protect, deleteUserController);

export default routes;
