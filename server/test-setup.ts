import { connectDB, disconnectDB } from './src/config/db';
import 'dotenv/config'
// import userModel from "./src/models/userModel";
// import {guestModel} from "./src/models/guestModel";

beforeAll(async () => {
    if (!process.env.DB_TEST_URL) {
        throw new Error('DB_TEST_URL environment variable is not set');
    }

    const mongo_url = process.env.DB_TEST_URL;
    await connectDB(mongo_url);
});

afterAll(async () => {
    await disconnectDB();

    // await userModel.deleteMany({});
    // await guestModel.deleteMany({});
});
