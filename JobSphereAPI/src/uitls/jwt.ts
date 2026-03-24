import jwt from "jsonwebtoken";

export interface tokenPayload {
	userId: string;
	firstName: string;
	lastName: string;
}

export const verifyToken = <T extends object = tokenPayload>(
	token: string,
): T | null => {
	const decoded = jwt.verify(token, process.env.JWT_SECRET!);
	return decoded as T;
};

export const generateToken = ({ userId }: tokenPayload) => {
	return jwt.sign({ userId }, process.env.JWT_SECRET!, {
		expiresIn: process.env.JWT_EXPIRES_IN! as "1h",
	});
};
