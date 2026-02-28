import { Router } from "express"
import { jobController } from "../controllers/job.controller"

const router = Router()

router.get("/", jobController.getAllJobs)
router.get("/:id", jobController.getJobById)
router.post("/", jobController.createJob)
router.delete("/:id", jobController.deleteJob)

export const jobRoutes = router
