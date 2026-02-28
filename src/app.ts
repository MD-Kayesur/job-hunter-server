import express, { Request, Response } from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import { jobRoutes } from "./routes/job.routes"
import { applicationRoutes } from "./routes/application.routes"
import { authRoutes } from "./routes/auth.routes"

const app = express()

// Middleware
app.use(cors({
    // origin: ['http://localhost:5173'], // replace with your frontend URL
    // credentials: true
}))
app.use(express.json())
app.use(cookieparser())

// Routes
app.use("/job", jobRoutes)
app.use("/job-application", applicationRoutes)
app.use("/", authRoutes)

app.get("/", (req: Request, res: Response) => {
    res.send("All job is here for you")
})

export default app
