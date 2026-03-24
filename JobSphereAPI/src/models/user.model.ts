import mongoose from "mongoose";

type User = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

export default mongoose.model<User>("User", userSchema);
