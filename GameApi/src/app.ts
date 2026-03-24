import express from "express";
import gameRoutes from "./routes/gameRoutes";
import logger from "./middleware/logger";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(logger);

app.use("/games", gameRoutes);

app.listen(PORT, () => {
	console.log(`Game Store API running on port ${PORT}`);
});
