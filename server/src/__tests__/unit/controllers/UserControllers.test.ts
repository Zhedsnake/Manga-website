import request from 'supertest';
import express, { Application } from 'express';
import UserControllers from '../../../controllers/UserControllers';
import UserService from '../../../services/busines/UserService';

jest.mock('../../../services/busines/UserService');

const app: Application = express();
app.use(express.json());

app.get('/smallUserInfo', UserControllers.GetSmallUserInfoByToken);
app.put('/updateUserToken', UserControllers.UpdateUserToken);
app.get('/userInfo', UserControllers.GetUserInfoByToken);

describe('UserControllers', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GetSmallUserInfoByToken', () => {

        test('должен возвращать информацию о пользователе при успешном запросе', async () => {
            const mockUserInfo = { name: 'John Doe', pic: 'https://example.com/avatar.jpg' };
            (UserService.GetSmallUserInfoByToken as jest.Mock).mockResolvedValue(mockUserInfo);

            const response = await request(app)
                .get('/smallUserInfo')
                .set('user-id', '123')
                .set('webp-test', 'true');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUserInfo);
            expect(UserService.GetSmallUserInfoByToken).toHaveBeenCalledWith('123', 'true');
        });

        test('должен возвращать ошибку при неверном запросе', async () => {
            const mockError = { error: 'Ошибка при получении данных пользователя' };
            (UserService.GetSmallUserInfoByToken as jest.Mock).mockResolvedValue(mockError);

            const response = await request(app)
                .get('/smallUserInfo')
                .set('user-id', '123')
                .set('webp-test', 'true');

            expect(response.status).toBe(400);
            expect(response.body).toEqual(mockError);
        });

        test('должен возвращать 500 при ошибке сервера', async () => {
            (UserService.GetSmallUserInfoByToken as jest.Mock).mockRejectedValue(new Error('Ошибка'));

            const response = await request(app)
                .get('/smallUserInfo')
                .set('user-id', '123')
                .set('webp-test', 'true');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Неизвестная ошибка на сервере');
        });
    });

    describe('UpdateUserToken', () => {

        test('должен возвращать новый токен пользователя при успешном запросе', async () => {
            const mockResponse = { userToken: 'new-token' };
            (UserService.UpdateUserToken as jest.Mock).mockResolvedValue(mockResponse);

            const response = await request(app)
                .put('/updateUserToken')
                .set('user-id', '123');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResponse);
            expect(UserService.UpdateUserToken).toHaveBeenCalledWith('123');
        });

        test('должен возвращать 500 при ошибке сервера', async () => {
            (UserService.UpdateUserToken as jest.Mock).mockRejectedValue(new Error('Ошибка'));

            const response = await request(app)
                .put('/updateUserToken')
                .set('user-id', '123');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Неизвестная ошибка на сервере');
        });
    });

    describe('GetUserInfoByToken', () => {

        test('должен возвращать полную информацию о пользователе при успешном запросе', async () => {
            const mockUserInfo = { name: 'John Doe', pic: 'https://example.com/avatar.jpg', registeredAt: '2024-01-01' };
            (UserService.GetUserInfoByToken as jest.Mock).mockResolvedValue(mockUserInfo);

            const response = await request(app)
                .get('/userInfo')
                .set('user-id', '123')
                .set('webp-test', 'true');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUserInfo);
            expect(UserService.GetUserInfoByToken).toHaveBeenCalledWith('123', 'true');
        });

        test('должен возвращать ошибку при неверном запросе', async () => {
            const mockError = { error: 'Ошибка при получении данных пользователя' };
            (UserService.GetUserInfoByToken as jest.Mock).mockResolvedValue(mockError);

            const response = await request(app)
                .get('/userInfo')
                .set('user-id', '123')
                .set('webp-test', 'true');

            expect(response.status).toBe(400);
            expect(response.body).toEqual(mockError);
        });

        test('должен возвращать 500 при ошибке сервера', async () => {
            (UserService.GetUserInfoByToken as jest.Mock).mockRejectedValue(new Error('Ошибка'));

            const response = await request(app)
                .get('/userInfo')
                .set('user-id', '123')
                .set('webp-test', 'true');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Неизвестная ошибка на сервере');
        });
    });
});
