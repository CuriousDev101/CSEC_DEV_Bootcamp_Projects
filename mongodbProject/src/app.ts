import express from "express"
import userRoutes from "./routes/user.routes.ts"

const app = express()

app.use(express.json())

app.use("/api", userRoutes)

export default app
