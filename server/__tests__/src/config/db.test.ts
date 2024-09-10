import { connectDB } from "../../../src/config/db";
import mongoose from 'mongoose';
import 'dotenv/config';

jest.mock('mongoose', () => ({
    connect: jest.fn().mockResolvedValue({
        connection: {
            host: 'mockedHost',
        },
    }),
}));

describe('connectDB', () => {

    test('должен подключаться к MongoDB с правильным URL', async () => {
        if (!process.env.DB_TEST_URL) {
            return;
        }

        const mongo_url = process.env.DB_TEST_URL;

        await connectDB(mongo_url);

        expect(mongoose.connect).toHaveBeenCalledWith(mongo_url);
    });

    test('должено выводиться в консоль сообщение об подключении к mongodb', async () => {
        if (!process.env.DB_TEST_URL) {
            return;
        }

        const mongo_url = process.env.DB_TEST_URL;

        const consoleSpy = jest.spyOn(console, 'log');

        await connectDB(mongo_url);

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('MongoDB Connected: mockedHost'));

        consoleSpy.mockRestore();
    });
});
