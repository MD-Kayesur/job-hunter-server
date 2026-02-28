import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6plf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export const connectDB = async () => {
    try {
        // await client.connect();
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return client;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export const db = client.db('jobprtal');
export default client;
