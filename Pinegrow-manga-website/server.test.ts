import 'dotenv/config';
import express from 'express';
import request from 'supertest';
import { connectDB } from '../server/src/config/db';
import { timeDateNow } from '../server/src/modules/timeDateNow';

jest.mock('../server/src/config/db');
jest.mock('../server/src/modules/timeDateNow', () => ({
    timeDateNow: jest.fn().mockReturnValue('2024-09-19T00:00:00Z')
}));

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

describe('Server Инициализация и маршруты', () => {

    beforeAll(() => {
        process.env.DB_TEST_URL = 'mongodb+/test';
        process.env.PORT = '3000';
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    test('следует запустить сервер и подключиться к базе данных', async () => {
        (connectDB as jest.Mock).mockResolvedValueOnce(undefined);

        const server = app.listen(process.env.PORT);

        await new Promise<void>((resolve) => {
            server.on('listening', () => {
                resolve();
            });
        });

        const response = await request(app).get('/');
        expect(response.status).toBe(404);
        expect(connectDB).toHaveBeenCalledWith(process.env.DB_TEST_URL);

        server.close();
    });

    test('должен возвращать 404 для несуществующих маршрутов', async () => {
        const response = await request(app).get('/non-existent-route');
        expect(response.status).toBe(404);
    });
});
