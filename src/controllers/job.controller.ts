import { Request, Response } from "express"
import { jobService } from "../services/job.service"

export class JobController {
    async getAllJobs(req: Request, res: Response) {
        const { email, sort, Search, category, location } = req.query as any;
        const result = await jobService.getAllJobs({
            email,
            sort,
            search: Search,
            category,
            location
        })
        res.send(result)
    }

    async getJobById(req: Request, res: Response) {
        const id = req.params.id as string
        const result = await jobService.getJobById(id)
        res.send(result)
    }

    async createJob(req: Request, res: Response) {
        const newjob = req.body
        const result = await jobService.createJob(newjob)
        res.send(result)
    }

    async deleteJob(req: Request, res: Response) {
        const id = req.params.id as string
        const result = await jobService.deleteJob(id)
        res.send(result)
    }
}

export const jobController = new JobController()
