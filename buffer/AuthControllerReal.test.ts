import request from 'supertest';
import express, { Application } from 'express';
import AuthControllers from '../server/src/controllers/AuthController';
import userModel from "../server/src/models/userModel";
import {guestModel} from "../server/src/models/guestModel";

jest.mock('../server/src/services/busines/AuthService');

const app: Application = express();
app.use(express.json());
app.post('/registerGuest', AuthControllers.registerGuest);
app.post('/registerUser', AuthControllers.registerUser);
app.post('/loginUser', AuthControllers.loginUser);


describe('AuthControllers (с реальной логикой)', () => {

    beforeAll(async () => {
        jest.setTimeout(10000);
        await userModel.deleteMany({});
        await guestModel.deleteMany({});
    });

    afterAll(async () => {
        await userModel.deleteMany({});
        await guestModel.deleteMany({});
    });

    beforeEach(async () => {
        jest.clearAllMocks();
    });

    describe('registerGuest', () => {

        test('должен возвращать guestToken при успешном запросе', async () => {
            const response = await request(app).post('/registerGuest');

            expect(response.status).toBe(201);
            expect(response.text).toBeDefined();
        });

        // test('должен возвращать ошибку при неудаче', async () => {
        //     jest.spyOn(AuthService, 'getGuestToken').mockRejectedValue(new Error('Ошибка'));
        //
        //     const response = await request(app).post('/registerGuest');
        //     expect(response.status).toBe(500);
        //     expect(response.body.error).toBe('Неизвестная ошибка на сервере');
        // });
    });

    // describe('registerUser', () => {
    //
    //     test('должен возвращать токен пользователя при успешной регистрации', async () => {
    //         const response = await request(app)
    //             .post('/registerUser')
    //             .send({ name: 'John', email: 'john@example.com', password: 'password123' });
    //
    //         expect(response.status).toBe(201);
    //         expect(response.body.userToken).toBeDefined(); // Проверяем, что токен вернулся
    //     });
    //
    //     test('должен возвращать ошибку при неудачной регистрации', async () => {
    //         jest.spyOn(AuthService, 'register').mockResolvedValue({ error: 'Ошибка регистрации' });
    //
    //         const response = await request(app)
    //             .post('/registerUser')
    //             .send({ name: 'John', email: 'john@example.com', password: 'password123' });
    //
    //         expect(response.status).toBe(400);
    //         expect(response.body.error).toBe('Ошибка регистрации');
    //     });
    //
    //     test('должен возвращать 500 при ошибке сервера', async () => {
    //         jest.spyOn(AuthService, 'register').mockRejectedValue(new Error('Ошибка'));
    //
    //         const response = await request(app)
    //             .post('/registerUser')
    //             .send({ name: 'John', password: 'password123' });
    //
    //         expect(response.status).toBe(500);
    //         expect(response.body.error).toBe('Неизвестная ошибка на сервере');
    //     });
    // });

    // describe('loginUser', () => {
    //
    //     test('должен возвращать токен пользователя при успешной авторизации', async () => {
    //         await AuthService.register('John', 'john@example.com', 'password123'); // Регистрируем пользователя для теста
    //
    //         const response = await request(app)
    //             .post('/loginUser')
    //             .send({ name: 'John', password: 'password123' });
    //
    //         expect(response.status).toBe(200);
    //         expect(response.body.userToken).toBeDefined(); // Проверяем, что токен вернулся
    //     });
    //
    //     test('должен возвращать ошибку при неудачной авторизации', async () => {
    //         const response = await request(app)
    //             .post('/loginUser')
    //             .send({ name: 'John', password: 'wrongpassword' });
    //
    //         expect(response.status).toBe(400);
    //         expect(response.body.error).toBe('Неправильное имя или пароль');
    //     });
    //
    //     test('должен возвращать 500 при ошибке сервера', async () => {
    //         jest.spyOn(AuthService, 'login').mockRejectedValue(new Error('Ошибка'));
    //
    //         const response = await request(app)
    //             .post('/loginUser')
    //             .send({ name: 'John', password: 'password123' });
    //
    //         expect(response.status).toBe(500);
    //         expect(response.body.error).toBe('Неизвестная ошибка на сервере');
    //     });
    // });

});