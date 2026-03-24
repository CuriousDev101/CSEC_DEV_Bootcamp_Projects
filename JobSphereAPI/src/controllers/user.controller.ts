import type { Request, Response } from "express";
import {
	getUserById,
	updateUser,
	deleteUser,
} from "../services/user.service.ts";

export const getUserByIdController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user = await getUserById(id as string);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const updateUserController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user = req.body;
		const updatedUser = await updateUser(id as string, user);
		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const deleteUserController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const deletedUser = await deleteUser(id as string);
		res.status(200).json(deletedUser);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};
