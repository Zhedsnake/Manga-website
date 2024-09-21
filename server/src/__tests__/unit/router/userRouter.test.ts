import request from 'supertest';
import express, { Application } from 'express';
import userRouter from '../../router/userRouter';
import ProtectService from '../../middlewares/ProtectService';
import UserControllers from '../../controllers/UserControllers';

jest.mock('../../middlewares/ProtectService');
jest.mock('../../controllers/UserControllers');

const app: Application = express();
app.use(express.json());
app.use(userRouter);

describe('UserRouter', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('GET /update-user-token - должен вызывать ProtectService и UpdateUserToken', async () => {
        (ProtectService.checkUserToken as jest.Mock).mockImplementation((req, res, next) => next());

        (UserControllers.UpdateUserToken as jest.Mock).mockImplementation((req, res) => {
            res.status(200).send({ message: 'Token updated' });
        });

        const response = await request(app).get('/update-user-token');

        expect(ProtectService.checkUserToken).toHaveBeenCalled();
        expect(UserControllers.UpdateUserToken).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Token updated');
    });

    test('GET /user-small-info-by-token - должен вызывать ProtectService и GetSmallUserInfoByToken', async () => {
        (ProtectService.checkUserToken as jest.Mock).mockImplementation((req, res, next) => next());
        (UserControllers.GetSmallUserInfoByToken as jest.Mock).mockImplementation((req, res) => {
            res.status(200).send({ info: 'small info' });
        });

        const response = await request(app).get('/user-small-info-by-token');

        expect(ProtectService.checkUserToken).toHaveBeenCalled();
        expect(UserControllers.GetSmallUserInfoByToken).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body.info).toBe('small info');
    });

    test('GET /user-info-by-token - должен вызывать ProtectService и GetUserInfoByToken', async () => {
        (ProtectService.checkUserToken as jest.Mock).mockImplementation((req, res, next) => next());
        (UserControllers.GetUserInfoByToken as jest.Mock).mockImplementation((req, res) => {
            res.status(200).send({ info: 'full info' });
        });

        const response = await request(app).get('/user-info-by-token');

        expect(ProtectService.checkUserToken).toHaveBeenCalled();
        expect(UserControllers.GetUserInfoByToken).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body.info).toBe('full info');
    });
});
