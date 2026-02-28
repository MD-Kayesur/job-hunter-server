import { ObjectId } from "mongodb"
import { JobApplicationModel, JobModel } from "../models/job.model"
import { IJobApplication } from "../interfaces/job.interface"

export class ApplicationService {
    async getAllApplications(email: string): Promise<IJobApplication[]> {
        const query = { applicant_email: email }
        const result = (await JobApplicationModel.find(query).toArray()) as unknown as IJobApplication[]

        for (const application of result) {
            if (application.job_id) {
                const query1 = { _id: new ObjectId(application.job_id) }
                const job = await JobModel.findOne(query1)
                if (job) {
                    application.title = job.title
                    application.location = job.location
                    application.company = job.company
                    application.company_logo = job.company_logo
                }
            }
        }
        return result
    }

    async getApplicationsByJobId(jobId: string): Promise<IJobApplication[]> {
        const query = { job_id: jobId }
        const result = (await JobApplicationModel.find(query).toArray()) as unknown as IJobApplication[]
        return result
    }

    async createApplication(applicationData: IJobApplication): Promise<any> {
        return await JobApplicationModel.insertOne(applicationData)
    }

    async deleteApplication(id: string): Promise<any> {
        const quarry = { _id: new ObjectId(id) }
        return await JobApplicationModel.deleteOne(quarry)
    }
}

export const applicationService = new ApplicationService()
