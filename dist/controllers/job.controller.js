"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobController = exports.JobController = void 0;
const job_service_1 = require("../services/job.service");
class JobController {
    async getAllJobs(req, res) {
        const email = req.query.email || req.body.email;
        const result = await job_service_1.jobService.getAllJobs(email);
        res.send(result);
    }
    async getJobById(req, res) {
        const id = req.params.id;
        const result = await job_service_1.jobService.getJobById(id);
        res.send(result);
    }
    async createJob(req, res) {
        const newjob = req.body;
        const result = await job_service_1.jobService.createJob(newjob);
        res.send(result);
    }
    async deleteJob(req, res) {
        const id = req.params.id;
        const result = await job_service_1.jobService.deleteJob(id);
        res.send(result);
    }
}
exports.JobController = JobController;
exports.jobController = new JobController();
