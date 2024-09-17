import { connectDB, disconnectDB } from './src/config/db';
import 'dotenv/config'

beforeAll(async () => {
    if (!process.env.DB_TEST_URL) {
        throw new Error('DB_TEST_URL environment variable is not set');
    }

    const mongo_url = process.env.DB_TEST_URL;
    await connectDB(mongo_url);
});

afterAll(async () => {
    await disconnectDB();
});
