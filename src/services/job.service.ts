import { ObjectId } from "mongodb"
import { JobModel } from "../models/job.model"
import { IJob } from "../interfaces/job.interface"

export class JobService {
    async getAllJobs(params: { email?: string; sort?: boolean | string; search?: string; category?: string; location?: string }): Promise<IJob[]> {
        const { email, sort, search, category, location } = params;
        let query: any = {}
        if (email) {
            query.hr_email = email
        }
        if (search) {
            query.title = { $regex: search, $options: 'i' }
        }
        if (category) {
            query.category = category
        }
        if (location) {
            query.location = location
        }

        let result: IJob[] = [];
        const cursor = JobModel.find(query);

        if (sort === true || sort === 'true') {
            const sortedCursor = cursor.sort({ "salaryRange.min": 1 });
            result = (await sortedCursor.toArray()) as unknown as IJob[];
        } else {
            result = (await cursor.toArray()) as unknown as IJob[];
        }

        return result
    }

    async getJobById(id: string): Promise<IJob | null> {
        const query = { _id: new ObjectId(id) }
        const result = (await JobModel.findOne(query)) as unknown as IJob | null
        return result
    }

    async createJob(jobData: IJob): Promise<any> {
        return await JobModel.insertOne(jobData)
    }

    async deleteJob(id: string): Promise<any> {
        const query = { _id: new ObjectId(id) }
        return await JobModel.deleteOne(query)
    }
}

export const jobService = new JobService()
