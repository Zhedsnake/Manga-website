import mongoose from 'mongoose';
import EditUserInfoBDService from '../../../../services/mongodb/EditUserInfoBDService';
import userModel from '../../../../models/userModel';
import AuthBDService from '../../../../services/mongodb/AuthBDService';
import 'dotenv/config';
import {connectDB, disconnectDB} from "../../../../config/db";

describe('EditUserInfoBDService', () => {
    let userId: string;

    beforeAll(async () => {
        // const mongoUrl = process.env.DB_TEST_URL;
        // if (!mongoUrl) {
        //     throw new Error("DB_TEST_URL environment variable is not set");
        // }
        // await connectDB(mongoUrl);
    });

    afterAll(async () => {
        // await disconnectDB();
    });

    beforeEach(async () => {
        await userModel.deleteMany({});

        const user = await AuthBDService.register({
            name: 'OriginalName',
            email: 'original@mail.com',
            password: 'Password123',
            pic: 'path/to/pic.jpg',
            minPic: 'path/to/minPic.jpg',
            picWebp: 'path/to/pic.webp',
            minPicWebp: 'path/to/minPicWebp.webp',
        });

        userId = user!.id;
    });

    test('должен успешно изменить имя пользователя', async () => {
        const response = await EditUserInfoBDService.EditUserNameByToken(userId, { name: 'NewName' });
        expect(response).toEqual({ message: 'Ваш никнейм успешно обновлен' });

        const updatedUser = await userModel.findById(userId);

        if (updatedUser && "name" in updatedUser) {
            expect(updatedUser.name).toBe('NewName');
        }
    });

    test('должен успешно изменить email пользователя', async () => {
        const response = await EditUserInfoBDService.EditUserEmailByToken(userId, { email: 'newemail@mail.com' });
        expect(response).toEqual({ message: 'Ваша почта успешно обновлена' });

        const updatedUser = await userModel.findById(userId);

        if (updatedUser && "email" in updatedUser) {
            expect(updatedUser.email).toBe('newemail@mail.com');
        }
    });

    test('должен успешно изменить пароль пользователя', async () => {
        const response = await EditUserInfoBDService.EditUserPasswordByToken(userId, { password: 'NewPassword123' });
        expect(response).toEqual({ message: 'Ваш пароль успешно обновлен' });

        const updatedUser = await userModel.findById(userId);

        expect(updatedUser!.password).toBe('NewPassword123');
    });

    test('должен успешно изменить аватар пользователя', async () => {
        const updates = {
            pic: 'path/to/newPic.jpg',
            minPic: 'path/to/newMinPic.jpg',
            picWebp: 'path/to/newPicWebp.webp',
            minPicWebp: 'path/to/newMinPicWebp.webp',
        };

        const response = await EditUserInfoBDService.EditUserAvatarByToken(userId, updates);
        expect(response).toEqual({ message: 'Ваш аватар успешно обновлен' });

        const updatedUser = await userModel.findById(userId);
        expect(updatedUser!.pic).toBe(updates.pic);
        expect(updatedUser!.minPic).toBe(updates.minPic);
        expect(updatedUser!.picWebp).toBe(updates.picWebp);
        expect(updatedUser!.minPicWebp).toBe(updates.minPicWebp);
    });
});
