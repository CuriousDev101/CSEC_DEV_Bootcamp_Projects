import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { getUserByEmail, createUser } from "../services/auth.service.ts";
import { generateToken } from "../uitls/jwt.ts";

export const register = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await createUser({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});

		await newUser.save();

		res.status(201).json({ message: "User registered successfully!" });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "Error registering user. Username might already exist." });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await getUserByEmail(email);

		const isPasswordValid = await bcrypt.compare(password, user?.password!);

		if (!isPasswordValid) {
			return res.status(401).json({ error: "Invalid username or password" });
		}

		const token = generateToken({
			userId: user?._id! as unknown as string,
			firstName: user?.firstName!,
			lastName: user?.lastName!,
		});

		res.json({ message: "Login successful!", token: token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error logging in" });
	}
};
