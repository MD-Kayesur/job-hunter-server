import { Router, Request, Response } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const router = Router()

router.post("/jwt", async (req: Request, res: Response) => {
    const user = req.body
    const secret = process.env.JWT_SECRET
    if (!secret) {
        return res.status(500).send({ error: "JWT_SECRET is not defined" })
    }
    const token = jwt.sign(user, secret, { expiresIn: "1h" })
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // Set to true in production
    })
        .send({ success: true })
})

export const authRoutes = router
