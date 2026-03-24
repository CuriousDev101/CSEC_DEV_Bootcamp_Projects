import express from "express";
import {
  getGames,
  getGame,
  createGame,
  updateGame,
  deleteGame
} from "../controllers/gameController";

const router: express.Router = express.Router();

router.get("/", getGames);
router.get("/:id", getGame);
router.post("/", createGame);
router.put("/:id", updateGame);
router.delete("/:id", deleteGame);

export default router;
