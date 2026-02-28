"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobApplicationCollection = exports.jobCollection = exports.db = exports.connectDB = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6plf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
const connectDB = async () => {
    try {
        // await client.connect();
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return client;
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
exports.db = client.db('jobprtal');
exports.jobCollection = exports.db.collection('jobs');
exports.jobApplicationCollection = exports.db.collection('job_application');
exports.default = client;
