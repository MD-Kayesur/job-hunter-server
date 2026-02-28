"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobService = exports.JobService = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../config/db");
class JobService {
    async getAllJobs(email) {
        let query = {};
        if (email) {
            query = { hr_email: email };
        }
        const result = (await db_1.jobCollection.find(query).toArray());
        return result;
    }
    async getJobById(id) {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = (await db_1.jobCollection.findOne(query));
        return result;
    }
    async createJob(jobData) {
        return await db_1.jobCollection.insertOne(jobData);
    }
    async deleteJob(id) {
        const query = { _id: new mongodb_1.ObjectId(id) };
        return await db_1.jobCollection.deleteOne(query);
    }
}
exports.JobService = JobService;
exports.jobService = new JobService();
