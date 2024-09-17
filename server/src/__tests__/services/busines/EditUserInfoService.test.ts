import EditUserInfoService from '../../../services/busines/EditUserInfoService';
import UserBDService from '../../../services/mongodb/UserBDService';
import EditUserInfoBDService from '../../../services/mongodb/EditUserInfoBDService';
import CloudinaryService from '../../../services/cloudinary/CloudinaryService';
import SharpService from '../../../services/Sharp/SharpService';
import VerificationService from '../../../services/busines/VerificationService';
import BcryptService from '../../../services/bcrypt/BcryptService';
import fs from 'fs';
import mockFs from 'mock-fs';
import path from 'path';
import {UploadedImageByMulter} from "../../../types/uploadedImageByMulter";

jest.mock('../../../services/mongodb/UserBDService');
jest.mock('../../../services/mongodb/EditUserInfoBDService');
jest.mock('../../../services/cloudinary/CloudinaryService');
jest.mock('../../../services/Sharp/SharpService');
jest.mock('../../../services/busines/VerificationService');
jest.mock('../../../services/bcrypt/BcryptService');
// jest.mock('fs', () => ({
//     promises: {
//         readdir: jest.fn(),
//         unlink: jest.fn(),
//     },
// }));

describe('EditUserInfoService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('EditUserNameByToken', () => {

        test('должен вернуть ошибку при неверной верификации имени', async () => {
            VerificationService.VerifyEditName = jest.fn().mockResolvedValue({ error: 'Invalid name' });

            const result = await EditUserInfoService.EditUserNameByToken('user-id', 'invalid-name');

            expect(VerificationService.VerifyEditName).toHaveBeenCalledWith('invalid-name', { name: 'invalid-name' });
            expect(result).toEqual({ error: 'Invalid name' });
        });

        test('должен обновить имя пользователя и вернуть сообщение', async () => {
            VerificationService.VerifyEditName = jest.fn().mockResolvedValue(null);
            EditUserInfoBDService.EditUserNameByToken = jest.fn().mockResolvedValue({ message: 'Name updated' });

            const result = await EditUserInfoService.EditUserNameByToken('user-id', 'valid-name');

            expect(EditUserInfoBDService.EditUserNameByToken).toHaveBeenCalledWith('user-id', { name: 'valid-name' });
            expect(result).toEqual({ message: 'Name updated' });
        });
    });

    describe('EditUserEmailByToken', () => {

        test('должен вернуть ошибку при неверной верификации email', async () => {
            VerificationService.VerifyEditEmail = jest.fn().mockResolvedValue({ error: 'Invalid email' });

            const result = await EditUserInfoService.EditUserEmailByToken('user-id', 'invalid-email@mail.com');

            expect(VerificationService.VerifyEditEmail).toHaveBeenCalledWith('invalid-email@mail.com', { email: 'invalid-email@mail.com' });
            expect(result).toEqual({ error: 'Invalid email' });
        });

        test('должен обновить email пользователя и вернуть сообщение', async () => {
            VerificationService.VerifyEditEmail = jest.fn().mockResolvedValue(null);
            EditUserInfoBDService.EditUserEmailByToken = jest.fn().mockResolvedValue({ message: 'Email updated' });

            const result = await EditUserInfoService.EditUserEmailByToken('user-id', 'valid-email@mail.com');

            expect(EditUserInfoBDService.EditUserEmailByToken).toHaveBeenCalledWith('user-id', { email: 'valid-email@mail.com' });
            expect(result).toEqual({ message: 'Email updated' });
        });
    });

    describe('EditUserPasswordByToken', () => {

        test('должен вернуть ошибку при неверной верификации пароля', async () => {
            VerificationService.VerifyEditPassword = jest.fn().mockResolvedValue({ error: 'Invalid password' });

            const result = await EditUserInfoService.EditUserPasswordByToken('user-id', 'old-pass', 'new-pass');

            expect(VerificationService.VerifyEditPassword).toHaveBeenCalledWith('user-id', 'old-pass', 'new-pass');
            expect(result).toEqual({ error: 'Invalid password' });
        });

        test('должен обновить пароль пользователя и вернуть сообщение', async () => {
            VerificationService.VerifyEditPassword = jest.fn().mockResolvedValue(null);
            BcryptService.Hash = jest.fn().mockResolvedValue('hashed-new-pass');
            EditUserInfoBDService.EditUserPasswordByToken = jest.fn().mockResolvedValue({ message: 'Password updated' });

            const result = await EditUserInfoService.EditUserPasswordByToken('user-id', 'old-pass', 'new-pass');

            expect(BcryptService.Hash).toHaveBeenCalledWith('new-pass');
            expect(EditUserInfoBDService.EditUserPasswordByToken).toHaveBeenCalledWith('user-id', { password: 'hashed-new-pass' });
            expect(result).toEqual({ message: 'Password updated' });
        });
    });

    // describe('EditUserInfoService - EditUserAvatarByToken', () => {
    //     const userId = 'user-id';
    //     const avatarFile: UploadedImageByMulter = {
    //         fieldname: 'avatar',
    //         originalname: 'avatar.png',
    //         encoding: '7bit',
    //         mimetype: 'image/png',
    //         buffer: Buffer.from(''),
    //         size: 1024,
    //         filename: 'avatar.png',
    //         path: 'C:/temp/avatar.png',
    //         destination: 'C:/temp'
    //     };
    //
    //     beforeEach(() => {
    //         jest.clearAllMocks();
    //         mockFs({
    //             'C:/temp': {
    //                 'avatar.png': fs.readFileSync(path.resolve(__dirname, '../../images/1x1.png')),
    //             },
    //             '/tmp': {
    //                 'avatar-480p.png': '', // создаем файл, который ожидается
    //                 'avatar.webp': '',
    //                 'avatar-480p.webp': '',
    //             }
    //         });
    //     });
    //
    //     afterEach(() => {
    //         mockFs.restore();
    //     });
    //
    //     test('должен вернуть ошибку при неверной верификации аватара', async () => {
    //         (VerificationService.VerifyEditAvatar as jest.Mock).mockResolvedValue({ error: 'Invalid avatar' });
    //
    //         const result = await EditUserInfoService.EditUserAvatarByToken(userId, { file: avatarFile });
    //
    //         expect(VerificationService.VerifyEditAvatar).toHaveBeenCalledWith(avatarFile);
    //
    //         expect(fs.existsSync(avatarFile.path)).toBe(false);
    //
    //         expect(result).toEqual({ error: 'Invalid avatar' });
    //     });
    //
    //     test('должен обновить аватар пользователя и вернуть сообщение', async () => {
    //         (VerificationService.VerifyEditAvatar as jest.Mock).mockResolvedValue(null);
    //
    //         (SharpService.CompileImageInThreeFormats as jest.Mock).mockResolvedValue({
    //             minimizedFilePath: '/tmp/avatar-480p.png',
    //             webpFilePath: '/tmp/avatar.webp',
    //             minimizedWebpFilePath: '/tmp/avatar-480p.webp',
    //         });
    //
    //         (CloudinaryService.ClearImages as jest.Mock).mockResolvedValue(undefined);
    //
    //         (CloudinaryService.uploadImage as jest.Mock).mockResolvedValue({ secure_url: 'https://secure-url' });
    //
    //         (EditUserInfoBDService.EditUserAvatarByToken as jest.Mock).mockResolvedValue({ message: 'Avatar updated' });
    //
    //         const result = await EditUserInfoService.EditUserAvatarByToken(userId, { file: avatarFile });
    //
    //         expect(CloudinaryService.ClearImages).toHaveBeenCalledWith(`Users/Avatars/${userId}`);
    //         expect(CloudinaryService.uploadImage).toHaveBeenCalledTimes(4);
    //         expect(EditUserInfoBDService.EditUserAvatarByToken).toHaveBeenCalledWith(userId, {
    //             pic: 'https://secure-url',
    //             minPic: 'https://secure-url',
    //             picWebp: 'https://secure-url',
    //             minPicWebp: 'https://secure-url',
    //         });
    //         expect(result).toEqual({ message: 'Avatar updated' });
    //     });
    // });
});
