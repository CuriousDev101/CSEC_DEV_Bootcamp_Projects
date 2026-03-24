import mongoose from "mongoose";

const conndectDb = async (cb: () => void): Promise<void> => {
	try {
		await mongoose.connect(process.env.MONGODB_URI!);
		console.log("Successfully connected to MongoDB");
		if (cb) cb();
	} catch (error: any) {
		console.error("MongoDB connection error:", error.message);
	}
};

export default conndectDb;
