import { db } from "../config/db";
import { IJob, IJobApplication } from "../interfaces/job.interface";

export const JobModel = db.collection<IJob>('jobs');
export const JobApplicationModel = db.collection<IJobApplication>('job_application');
