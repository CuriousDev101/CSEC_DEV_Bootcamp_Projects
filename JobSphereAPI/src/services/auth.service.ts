import User from "../models/user.model.ts";

interface UserInput {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export const createUser = async (user: UserInput) => {
	const newUser = await User.create(user);
	return newUser;
};

export const getUserByEmail = async (email: string) => {
	const user = await User.findOne({
		email,
	});
	return user;
};
