import app from "./app"
import { connectDB } from "./config/db"
import dotenv from "dotenv"

dotenv.config()

const port = process.env.PORT || 4000

async function startServer() {
    try {
        const client = await connectDB()
        if (client) {
            app.listen(port, () => {
                console.log(`Server is running at http://localhost:${port}`)
            })
        }
    } catch (err) {
        console.error("Failed to start server:", err)
    }
}

startServer()
