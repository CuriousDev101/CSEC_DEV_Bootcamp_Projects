import { Router } from "express";
import { register, login } from "../controllers/auth.controller.ts";

const routes: Router = Router();

routes.post("/register", register);
routes.post("/login", login);

export default routes;
