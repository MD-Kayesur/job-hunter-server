"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationController = exports.ApplicationController = void 0;
const application_service_1 = require("../services/application.service");
class ApplicationController {
    async getAllApplications(req, res) {
        const email = req.query.email;
        const result = await application_service_1.applicationService.getAllApplications(email);
        res.send(result);
    }
    async getApplicationsByJobId(req, res) {
        const jobId = req.params.id;
        const result = await application_service_1.applicationService.getApplicationsByJobId(jobId);
        res.send(result);
    }
    async createApplication(req, res) {
        const applicationData = req.body;
        const result = await application_service_1.applicationService.createApplication(applicationData);
        res.send(result);
    }
    async deleteApplication(req, res) {
        const id = req.params.id;
        const result = await application_service_1.applicationService.deleteApplication(id);
        res.send(result);
    }
}
exports.ApplicationController = ApplicationController;
exports.applicationController = new ApplicationController();
