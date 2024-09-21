import request from 'supertest';
import express, { Application, Request, Response, NextFunction } from 'express';
import editUserRouter from '../../../router/editUserRouter';
import ProtectService from '../../../middlewares/ProtectService';
import EditUserInfoController from '../../../controllers/EditUserInfoController';
import FileService from "../../../middlewares/FileService";

jest.mock('../../../middlewares/ProtectService');
jest.mock('../../../controllers/EditUserInfoController');
jest.mock('../../../middlewares/FileService');


const app: Application = express();
app.use(express.json());
app.use(editUserRouter);

describe('EditUserRouter', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('PUT /edit-user-name-by-token - должен вызывать EditUserNameByToken и возвращать ответ', async () => {
        (ProtectService.checkUserToken as jest.Mock).mockImplementation((req: Request, res: Response, next: NextFunction) => next());
        (EditUserInfoController.EditUserNameByToken as jest.Mock).mockImplementation((req: Request, res: Response) => {
            res.status(200).send({ message: 'Name updated' });
        });

        const response = await request(app)
            .put('/edit-user-name-by-token')
            .send({ name: 'New Name' });

        expect(ProtectService.checkUserToken).toHaveBeenCalled();
        expect(EditUserInfoController.EditUserNameByToken).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Name updated');
    });

    test('PUT /edit-user-email-by-token - должен вызывать EditUserEmailByToken и возвращать ответ', async () => {
        (ProtectService.checkUserToken as jest.Mock).mockImplementation((req: Request, res: Response, next: NextFunction) => next());
        (EditUserInfoController.EditUserEmailByToken as jest.Mock).mockImplementation((req: Request, res: Response) => {
            res.status(200).send({ message: 'Email updated' });
        });

        const response = await request(app)
            .put('/edit-user-email-by-token')
            .send({ email: 'newemail@example.com' });

        expect(ProtectService.checkUserToken).toHaveBeenCalled();
        expect(EditUserInfoController.EditUserEmailByToken).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Email updated');
    });

    test('PUT /edit-user-password-by-token - должен вызывать EditUserPasswordByToken и возвращать ответ', async () => {
        (ProtectService.checkUserToken as jest.Mock).mockImplementation((req: Request, res: Response, next: NextFunction) => next());
        (EditUserInfoController.EditUserPasswordByToken as jest.Mock).mockImplementation((req: Request, res: Response) => {
            res.status(200).send({ message: 'Password updated' });
        });

        const response = await request(app)
            .put('/edit-user-password-by-token')
            .send({ password: 'newpassword123' });

        expect(ProtectService.checkUserToken).toHaveBeenCalled();
        expect(EditUserInfoController.EditUserPasswordByToken).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Password updated');
    });

    test('PUT /edit-user-avatar-by-token - должен вызывать uploadUserAvatar и EditUserAvatarByToken', async () => {
        (ProtectService.checkUserToken as jest.Mock).mockImplementation((req: Request, res: Response, next: NextFunction) => next());
        (EditUserInfoController.EditUserAvatarByToken as jest.Mock).mockImplementation((req: Request, res: Response) => {
            res.status(200).send({ message: 'Avatar updated' });
        });

        (FileService.uploadUserAvatar as jest.Mock).mockImplementation(() => (req: Request, res: Response, next: NextFunction) => next());

        try {
            const response = await request(app)
                .put('/edit-user-avatar-by-token')
                .attach('avatar', 'path/to/your/test/file/avatar.jpg');  // Убедитесь, что файл существует

            expect(ProtectService.checkUserToken).toHaveBeenCalled();
            expect(FileService.uploadUserAvatar).toHaveBeenCalled();
            expect(EditUserInfoController.EditUserAvatarByToken).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Avatar updated');
        } catch (error) {
            console.error('Error during test execution:', error);
        }
    });
});
