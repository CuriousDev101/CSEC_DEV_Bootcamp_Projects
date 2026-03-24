import type { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { Logger } from "winston";

declare global {
	namespace Express {
		interface Request {
			requestId?: string;
		}
	}
}

export default function logger(logger: Logger) {
	return (req: Request, _res: Response, next: NextFunction) => {
		const requestId = uuidv4();
		req["requestId"] = requestId;

		logger.info(`${req.method} ${req.url}`, {
			requestId,
			ip: req.ip,
			userAgent: req.get("User-Agent"),
		});
		next();
	};
}
