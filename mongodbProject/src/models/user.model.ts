import mongoose, { Schema } from "mongoose";
import { type IUser } from "../types/user.ts";

const userSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	age: {
		type: Number,
		required: true,
	},
});

export const User = mongoose.model<IUser>("User", userSchema);
