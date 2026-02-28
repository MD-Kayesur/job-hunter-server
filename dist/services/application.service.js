"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationService = exports.ApplicationService = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../config/db");
class ApplicationService {
    async getAllApplications(email) {
        const query = { applicant_email: email };
        const result = (await db_1.jobApplicationCollection.find(query).toArray());
        for (const application of result) {
            if (application.job_id) {
                const query1 = { _id: new mongodb_1.ObjectId(application.job_id) };
                const job = await db_1.jobCollection.findOne(query1);
                if (job) {
                    application.title = job.title;
                    application.location = job.location;
                    application.company = job.company;
                    application.company_logo = job.company_logo;
                }
            }
        }
        return result;
    }
    async getApplicationsByJobId(jobId) {
        const query = { job_id: jobId };
        const result = (await db_1.jobApplicationCollection.find(query).toArray());
        return result;
    }
    async createApplication(applicationData) {
        return await db_1.jobApplicationCollection.insertOne(applicationData);
    }
    async deleteApplication(id) {
        const quarry = { _id: new mongodb_1.ObjectId(id) };
        return await db_1.jobApplicationCollection.deleteOne(quarry);
    }
}
exports.ApplicationService = ApplicationService;
exports.applicationService = new ApplicationService();
