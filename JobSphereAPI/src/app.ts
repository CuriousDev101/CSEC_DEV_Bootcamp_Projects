import express from "express";
import connectDb from "./config/db.ts";
import logger from "./uitls/logger.ts";
import loggerMiddleware from "./middleware/logger.middleware.ts";
import jobRoutes from "./routes/job.route.ts";
import userRoutes from "./routes/user.route.ts";
import authRoutes from "./routes/auth.route.ts";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(loggerMiddleware(logger));
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/health", (_req, res) =>
	res.status(200).json({ status: "OK" }),
);

app.get("/", (_req, res) => {
	res.send(`Server is running on http://localhost:${PORT}`);
});

app.listen(PORT, () => {
	connectDb(() => {
		console.log(`Server is running on port http://localhost:${PORT}`);
	});
});
