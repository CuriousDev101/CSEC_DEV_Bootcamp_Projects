import dotenv from "dotenv"
import app from "./app.ts"
import { connectDB } from "./config/db.ts"

dotenv.config()

const PORT = process.env.PORT || 5000

async function start() {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
