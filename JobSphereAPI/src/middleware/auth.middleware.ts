import type { Request, Response, NextFunction } from "express";
import { verifyToken, type tokenPayload } from "../uitls/jwt.ts";

declare global {
	namespace Express {
		interface Request {
			user: tokenPayload;
		}
	}
}

export function protect(req: Request, res: Response, next: NextFunction) {
	try {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const user = verifyToken(token);

		req.user = user!;
	} catch (error) {
		return res.status(403).json({ error: "Invalid or expired token!" });
	}

	next();
}
