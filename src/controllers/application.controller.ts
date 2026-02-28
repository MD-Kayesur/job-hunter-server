import { Request, Response } from "express"
import { applicationService } from "../services/application.service"

export class ApplicationController {
    async getAllApplications(req: Request, res: Response) {
        const email = req.query.email as string
        const result = await applicationService.getAllApplications(email)
        res.send(result)
    }

    async getApplicationsByJobId(req: Request, res: Response) {
        const jobId = req.params.id as string
        const result = await applicationService.getApplicationsByJobId(jobId)
        res.send(result)
    }

    async createApplication(req: Request, res: Response) {
        const applicationData = req.body
        const result = await applicationService.createApplication(applicationData)
        res.send(result)
    }

    async deleteApplication(req: Request, res: Response) {
        const id = req.params.id as string
        const result = await applicationService.deleteApplication(id)
        res.send(result)
    }
}

export const applicationController = new ApplicationController()
