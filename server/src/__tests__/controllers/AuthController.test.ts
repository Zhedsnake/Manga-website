import request from 'supertest';
import express, { Application } from 'express';
import AuthControllers from '../../controllers/AuthController';
import AuthService from '../../services/busines/AuthService';

jest.mock('../../services/busines/AuthService');

const app: Application = express();
app.use(express.json());
app.post('/registerGuest', AuthControllers.registerGuest);
app.post('/registerUser', AuthControllers.registerUser);
app.post('/loginUser', AuthControllers.loginUser);

describe('AuthControllers', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('registerGuest', () => {

        test('должен возвращать guestToken при успешном запросе', async () => {
            (AuthService.getGuestToken as jest.Mock).mockResolvedValue('guest-token');

            const response = await request(app).post('/registerGuest');

            expect(response.status).toBe(201);
            expect(response.text).toBe('guest-token');
            expect(AuthService.getGuestToken).toHaveBeenCalledTimes(1);
        });

        // test('должен возвращать ошибку при неудаче', async () => {
        //     (AuthService.getGuestToken as jest.Mock).mockRejectedValue(new Error('Ошибка'));
        //
        //     const response = await request(app).post('/registerGuest');
        //
        //     expect(response.status).toBe(500);
        //     expect(response.body.error).toBe('Неизвестная ошибка на сервере');
        // });

        // test('registerUser: должен возвращать токен пользователя при успешной регистрации', async () => {
        //     const mockResponse = { userToken: 'user-token' };
        //     (AuthService.register as jest.Mock).mockResolvedValue(mockResponse);
        //
        //     const response = await request(app)
        //         .post('/registerUser')
        //         .send({ name: 'John', email: 'john@example.com', password: 'password123' });
        //
        //     expect(response.status).toBe(201);
        //     expect(response.body).toEqual(mockResponse);
        //     expect(AuthService.register).toHaveBeenCalledWith('John', 'john@example.com', 'password123');
        // });
        //
        // test('registerUser: должен возвращать ошибку при неудачной регистрации', async () => {
        //     const mockErrorResponse = { error: 'Ошибка регистрации' };
        //     (AuthService.register as jest.Mock).mockResolvedValue(mockErrorResponse);
        //
        //     const response = await request(app)
        //         .post('/registerUser')
        //         .send({ name: 'John', email: 'john@example.com', password: 'password123' });
        //
        //     expect(response.status).toBe(400);
        //     expect(response.body).toEqual(mockErrorResponse);
        //     expect(AuthService.register).toHaveBeenCalledWith('John', 'john@example.com', 'password123');
        // });
        //
        // test('loginUser: должен возвращать токен пользователя при успешной авторизации', async () => {
        //     const mockResponse = { userToken: 'user-token' };
        //     (AuthService.login as jest.Mock).mockResolvedValue(mockResponse);
        //
        //     const response = await request(app)
        //         .post('/loginUser')
        //         .send({ name: 'John', password: 'password123' });
        //
        //     expect(response.status).toBe(200);
        //     expect(response.body).toEqual(mockResponse);
        //     expect(AuthService.login).toHaveBeenCalledWith('John', 'password123');
        // });
        //
        // test('loginUser: должен возвращать ошибку при неудачной авторизации', async () => {
        //     const mockErrorResponse = { error: 'Неправильное имя или пароль' };
        //     (AuthService.login as jest.Mock).mockResolvedValue(mockErrorResponse);
        //
        //     const response = await request(app)
        //         .post('/loginUser')
        //         .send({ name: 'John', password: 'wrongpassword' });
        //
        //     expect(response.status).toBe(400);
        //     expect(response.body).toEqual(mockErrorResponse);
        //     expect(AuthService.login).toHaveBeenCalledWith('John', 'wrongpassword');
        // });
        //
        // test('loginUser: должен возвращать 500 при ошибке сервера', async () => {
        //     (AuthService.login as jest.Mock).mockRejectedValue(new Error('Ошибка'));
        //
        //     const response = await request(app)
        //         .post('/loginUser')
        //         .send({ name: 'John', password: 'password123' });
        //
        //     expect(response.status).toBe(500);
        //     expect(response.body.error).toBe('Неизвестная ошибка на сервере');
        // });
    });

});
