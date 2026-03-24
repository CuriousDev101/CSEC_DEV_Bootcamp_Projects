import User from "../models/user.model.ts";

export const getUserById = async (id: string) => {
	const user = await User.findById(id);
	return user;
};

export const updateUser = async (id: string, user: typeof User) => {
	const updatedUser = await User.findByIdAndUpdate(id, user);
	console.log("updatedUser", updatedUser);
	return updatedUser;
};

export const deleteUser = async (id: string) => {
	const deletedUser = await User.findByIdAndDelete(id);
	return deletedUser;
};
