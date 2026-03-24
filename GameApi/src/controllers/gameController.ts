import type { Request, Response } from "express";
import {
	getAllGames,
	getGameById,
	createNewGame,
	updateExistingGame,
	deleteExistingGame,
} from "../services/gameService";

export const getGames = (_req: Request, res: Response) => {
	const games = getAllGames();
	res.json(games);
};

export const getGame = (req: Request, res: Response) => {
	const id = parseInt(req.params.id as string);

	const game = getGameById(id);

	if (!game) {
		return res.status(404).json({ message: "Game not found" });
	}

	res.json(game);
};

export const createGame = (req: Request, res: Response) => {
	const { name, price } = req.body;

	if (!name || !price) {
		return res.status(400).json({
			message: "Name and price are required",
		});
	}

	const newGame = createNewGame(name, price);

	res.status(201).json(newGame);
};

export const updateGame = (req: Request, res: Response) => {
	const id = parseInt(req.params.id as string);

	const updatedGame = updateExistingGame(id, req.body);

	if (!updatedGame) {
		return res.status(404).json({ message: "Game not found" });
	}

	res.json(updatedGame);
};

export const deleteGame = (req: Request, res: Response) => {
	const id = parseInt(req.params.id as string);

	const deletedGame = deleteExistingGame(id);

	if (!deletedGame) {
		return res.status(404).json({ message: "Game not found" });
	}

	res.json({
		message: "Game deleted",
		game: deletedGame,
	});
};
