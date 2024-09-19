import request from 'supertest';
import express, { Application } from 'express';
import authRouter from '../../router/authRouter';
import AuthController from '../../controllers/AuthController';

jest.mock('../../controllers/AuthController');

const app: Application = express();
app.use(express.json());
app.use(authRouter);

describe('AuthRouter', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('POST /guest - должен вызывать registerGuest и возвращать ответ', async () => {
        (AuthController.registerGuest as jest.Mock).mockImplementation((req, res) => {
            res.status(200).send({ message: 'Guest registered' });
        });

        const response = await request(app)
            .post('/guest')
            .send();

        expect(AuthController.registerGuest).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Guest registered');
    });

    test('POST /register - должен вызывать registerUser и возвращать ответ', async () => {
        (AuthController.registerUser as jest.Mock).mockImplementation((req, res) => {
            res.status(201).send({ message: 'User registered' });
        });

        const response = await request(app)
            .post('/register')
            .send({ username: 'testuser', password: 'password123' });

        expect(AuthController.registerUser).toHaveBeenCalled();
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered');
    });

    test('POST /login - должен вызывать loginUser и возвращать ответ', async () => {
        (AuthController.loginUser as jest.Mock).mockImplementation((req, res) => {
            res.status(200).send({ token: 'fake-jwt-token' });
        });

        const response = await request(app)
            .post('/login')
            .send({ username: 'testuser', password: 'password123' });

        expect(AuthController.loginUser).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body.token).toBe('fake-jwt-token');
    });
});
