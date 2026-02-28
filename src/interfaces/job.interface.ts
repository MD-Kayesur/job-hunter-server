import { ObjectId } from 'mongodb';

export interface IJob {
    _id?: ObjectId;
    title: string;
    location: string;
    company: string;
    company_logo: string;
    hr_email: string;
    // add other fields you expect
}

export interface IJobApplication {
    _id?: ObjectId;
    job_id: string;
    applicant_email: string;
    title?: string;
    location?: string;
    company?: string;
    company_logo?: string;
    // add other fields you expect
}
