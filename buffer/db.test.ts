import { connectDB, disconnectDB } from "../../config/db";
import mongoose from 'mongoose';
import 'dotenv/config';

jest.mock('mongoose');

describe('MongoDB connection', () => {

    test('должен подключаться к MongoDB с правильным URL', async () => {
        if (!process.env.DB_TEST_URL) {
            return;
        }

        const mongo_url = process.env.DB_TEST_URL;

        await connectDB(mongo_url);

        expect(mongoose.connect).toHaveBeenCalledWith(mongo_url);
    });

    test('должно выводиться в консоль сообщение о подключении к MongoDB', async () => {
        if (!process.env.DB_TEST_URL) {
            return;
        }

        const mongo_url = process.env.DB_TEST_URL;

        const consoleSpy = jest.spyOn(console, 'log');

        await connectDB(mongo_url);

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('MongoDB Connected: mockedHost'));

        consoleSpy.mockRestore();
    });

    test('должен отключаться от MongoDB', async () => {
        await disconnectDB();

        expect(mongoose.disconnect).toHaveBeenCalled();
    });

    test('должно выводиться в консоль сообщение об отключении от MongoDB', async () => {
        const consoleSpy = jest.spyOn(console, 'log');

        await disconnectDB();

        expect(consoleSpy).toHaveBeenCalledWith('MongoDB Disconnected');

        consoleSpy.mockRestore();
    });
});
