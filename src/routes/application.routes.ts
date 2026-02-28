import { Router } from "express"
import { applicationController } from "../controllers/application.controller"

const router = Router()

router.get("/", applicationController.getAllApplications)
router.get("/job_id/:id", applicationController.getApplicationsByJobId)
router.post("/", applicationController.createApplication)
router.delete("/:id", applicationController.deleteApplication)

export const applicationRoutes = router
