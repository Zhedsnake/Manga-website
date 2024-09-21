import VerificationService from '../../../../services/busines/VerificationService';
import userBDService from '../../../../services/mongodb/UserBDService';
import {connectDB, disconnectDB} from "../../../../config/db";
import 'dotenv/config'
import BcryptService from "../../../../services/bcrypt/BcryptService";
import AuthBDService from "../../../../services/mongodb/AuthBDService";
import SharpService from "../../../../services/Sharp/SharpService";
import {UploadedImageByMulter} from "../../../../types/uploadedImageByMulter";

jest.mock('../../../../services/mongodb/UserBDService');
jest.mock('../../../../services/bcrypt/BcryptService.ts');
jest.mock('../../../../services/mongodb/AuthBDService');
jest.mock('../../../../services/Sharp/SharpService');

describe('VerificationService', () => {

    beforeAll(async () => {
        const mongoUrl = process.env.DB_TEST_URL;

        if (!mongoUrl) {
            throw new Error("DB_TEST_URL environment variable is not set");
        }

        await connectDB(mongoUrl);

    });

    afterAll(async () => {
        await disconnectDB();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('VerifySupWebp', () => {
        test('должен вернуть ошибку, если передан неверный формат значения webpTest', async () => {
            const result = await VerificationService.VerifySupWebp('invalid_value');
            expect(result).toEqual({error: 'Не указана поддержка webp в булевом формате ("true","false")'});
        });

        test('должен вернуть ошибку, если значение webpTest не передано', async () => {
            const result = await VerificationService.VerifySupWebp('');
            expect(result).toEqual({error: 'Не указана поддержка webp в булевом формате ("true","false")'});
        });

        test('должен вернуть null, если передано значение "true"', async () => {
            const result = await VerificationService.VerifySupWebp('true');
            expect(result).toBeNull();
        });

        test('должен вернуть null, если передано значение "false"', async () => {
            const result = await VerificationService.VerifySupWebp('false');
            expect(result).toBeNull();
        });
    });

    describe('VerifyRegister', () => {

        test('должен вернуть ошибку, если одно из полей пустое', async () => {
            const result = await VerificationService.VerifyRegister('', 'test@example.com', 'Password123!');
            expect(result).toEqual({error: 'Пожалуйста, заполните все поля.'});

            const result2 = await VerificationService.VerifyRegister('John', '', 'Password123!');
            expect(result2).toEqual({error: 'Пожалуйста, заполните все поля.'});

            const result3 = await VerificationService.VerifyRegister('John', 'test@example.com', '');
            expect(result3).toEqual({error: 'Пожалуйста, заполните все поля.'});
        });

        test('должен вернуть null при успешной верификации', async () => {
            (userBDService.findOneUser as jest.Mock).mockReturnValue(false);

            const result = await VerificationService.VerifyRegister('John', 'test@example.com', 'Password123!');
            expect(result).toBeNull();
        });
    });

    describe('VerifyLogin', () => {

        test('должен вернуть ошибку, если имя или пароль не указаны', async () => {
            const result = await VerificationService.VerifyLogin({name: '', password: 'Password123!'});
            expect(result).toEqual({error: 'Пожалуйста, заполните все поля.'});

            const result2 = await VerificationService.VerifyLogin({name: 'John', password: ''});
            expect(result2).toEqual({error: 'Пожалуйста, заполните все поля.'});
        });

        test('должен вернуть ошибку, если пользователя с таким именем не существует', async () => {
            (AuthBDService.login as jest.Mock).mockReturnValue(null);

            const result = await VerificationService.VerifyLogin({name: 'NonExistentUser', password: 'Password123!'});
            expect(result).toEqual({error: 'Имя или пароль некорректны'});
        });

        test('должен вернуть ошибку, если пароли не совпадают', async () => {
            const mockUser = {id: 'user123', password: 'hashedPassword'};
            (AuthBDService.login as jest.Mock).mockReturnValue(mockUser);
            (BcryptService.Compare as jest.Mock).mockReturnValue(false);

            const result = await VerificationService.VerifyLogin({name: 'John', password: 'WrongPassword123!'});
            expect(result).toEqual({error: 'Имя или пароль некорректны'});
        });

        test('должен вернуть ID пользователя при успешной верификации', async () => {
            const mockUser = {id: 'user123', password: 'hashedPassword'};
            (AuthBDService.login as jest.Mock).mockReturnValue(mockUser);
            (BcryptService.Compare as jest.Mock).mockReturnValue(true);

            const result = await VerificationService.VerifyLogin({name: 'John', password: 'CorrectPassword123!'});
            expect(result).toEqual({id: 'user123'});
        });
    });

    describe('VerifyName', () => {

        test('должен вернуть ошибку, если имя не указано', async () => {
            const result = await VerificationService.VerifyName('', {name: ''});
            expect(result).toEqual({error: 'Не указано имя'});
        });

        test('должен вернуть ошибку, если длина имени меньше 4 символов', async () => {
            const result = await VerificationService.VerifyName('Jon', {name: 'Jon'});
            expect(result).toEqual({error: 'Имя должно содержать не менее 4 символов'});
        });

        test('должен вернуть ошибку, если длина имени больше 10 символов', async () => {
            const result = await VerificationService.VerifyName('SuperLongName', {name: 'SuperLongName'});
            expect(result).toEqual({error: 'Имя должно содержать не более 10 символов'});
        });

        test('должен вернуть ошибку, если пользователь с таким именем уже существует', async () => {
            (userBDService.findOneUser as jest.Mock).mockReturnValue(true);

            const result = await VerificationService.VerifyName('John', {name: 'John'});
            expect(result).toEqual({error: 'Пользователь с таким именем уже существует'});
        });

        test('должен вернуть null, если имя корректное и не занято', async () => {
            (userBDService.findOneUser as jest.Mock).mockReturnValue(false);

            const result = await VerificationService.VerifyName('ValidName', {name: 'ValidName'});
            expect(result).toBeNull();
        });
    });

    describe('VerifyEmail', () => {

        test('должен вернуть ошибку, если email не указан', async () => {
            const result = await VerificationService.VerifyEmail('', {email: ''});
            expect(result).toEqual({error: 'Не указано email'});
        });

        test('должен вернуть ошибку, если email имеет некорректный формат', async () => {
            (userBDService.findOneUser as jest.Mock).mockReturnValue(false);

            const result = await VerificationService.VerifyEmail('invalid-email', {email: 'invalid-email'});
            expect(result).toEqual({error: 'Некорректный формат email'});
        });

        test('должен вернуть ошибку, если пользователь с таким email уже существует', async () => {
            (userBDService.findOneUser as jest.Mock).mockReturnValue(true);

            const result = await VerificationService.VerifyEmail('test@example.com', {email: 'test@example.com'});
            expect(result).toEqual({error: 'Пользователь с таким email уже существует'});
        });

        test('должен вернуть null, если email корректный и не занят', async () => {
            (userBDService.findOneUser as jest.Mock).mockReturnValue(false);

            const result = await VerificationService.VerifyEmail('valid@example.com', {email: 'valid@example.com'});
            expect(result).toBeNull();
        });
    });

    describe('VerifyPassword', () => {

        test('должен вернуть ошибку, если пароль не указан', async () => {
            const result = await VerificationService.VerifyPassword('');
            expect(result).toEqual({error: 'Не указан пароль'});
        });

        test('должен вернуть ошибку, если пароль короче 6 символов', async () => {
            const result = await VerificationService.VerifyPassword('P1@');
            expect(result).toEqual({error: 'Пароль должен содержать не менее 6 символов'});
        });

        test('должен вернуть ошибку, если пароль длиннее 16 символов', async () => {
            const result = await VerificationService.VerifyPassword('Password1234567890!');
            expect(result).toEqual({error: 'Пароль должен содержать не более 16 символов'});
        });
        //
        test('должен вернуть ошибку, если пароль не содержит заглавных букв', async () => {
            const result = await VerificationService.VerifyPassword('password123!');
            expect(result).toEqual({error: 'Пароль должен содержать хотя бы одну заглавную букву'});
        });

        test('должен вернуть ошибку, если пароль содержит менее трех цифр', async () => {
            const result = await VerificationService.VerifyPassword('Password12!');
            expect(result).toEqual({error: 'Пароль должен содержать хотя бы три числа'});
        });

        test('должен вернуть ошибку, если пароль не содержит специальных символов', async () => {
            const result = await VerificationService.VerifyPassword('Password123');
            expect(result).toEqual({error: 'Пароль должен содержать хотя бы один специальный символ'});
        });

        test('должен вернуть ошибку, если пароль содержит некорректные символы', async () => {
            const result = await VerificationService.VerifyPassword('Password123$€');
            expect(result).toEqual({error: 'Пароль должен содержать только латинские буквы и допустимые символы'});
        });

        test('должен вернуть null, если пароль корректный', async () => {
            const result = await VerificationService.VerifyPassword('Password123!');
            expect(result).toBeNull();
        });
    });

    describe('VerifyEditName', () => {

        test('должен вернуть ошибку, если имя не указано', async () => {
            const result = await VerificationService.VerifyEditName('', {name: ''});
            expect(result).toEqual({error: 'Не указано имя'});
        });

        test('должен вернуть ошибку, если имя короче 4 символов', async () => {
            const result = await VerificationService.VerifyEditName('Tom', {name: 'Tom'});
            expect(result).toEqual({error: 'Имя должно содержать не менее 4 символов'});
        });

        test('должен вернуть ошибку, если имя длиннее 10 символов', async () => {
            const result = await VerificationService.VerifyEditName('VeryLongNameHere', {name: 'VeryLongNameHere'});
            expect(result).toEqual({error: 'Имя должно содержать не более 10 символов'});
        });

        test('должен вернуть ошибку, если имя уже существует', async () => {
            (userBDService.findOneUser as jest.Mock).mockReturnValue(true);

            const result = await VerificationService.VerifyEditName('ExistName', {name: 'ExistName'});
            expect(result).toEqual({error: 'Пользователь с таким именем уже существует'});
        });

        test('должен вернуть null, если имя корректное и не существует', async () => {
            (userBDService.findOneUser as jest.Mock).mockReturnValue(false);

            const result = await VerificationService.VerifyEditName('ValidName', {name: 'ValidName'});
            expect(result).toBeNull();
        });
    });

    describe('VerifyEditEmail', () => {

        test('должен вернуть ошибку, если email не указан', async () => {
            const result = await VerificationService.VerifyEditEmail('', {email: ''});
            expect(result).toEqual({error: 'Не указано email'});
        });

        test('должен вернуть ошибку, если email некорректного формата', async () => {
            const result = await VerificationService.VerifyEditEmail('invalid-email', {email: 'invalid-email'});
            expect(result).toEqual({error: 'Некорректный формат email'});
        });

        test('должен вернуть ошибку, если email уже существует', async () => {
            (userBDService.findOneUser as jest.Mock).mockReturnValue(true);

            const result = await VerificationService.VerifyEditEmail('existing@example.com', {email: 'existing@example.com'});
            expect(result).toEqual({error: 'Пользователь с таким email уже существует'});
        });

        test('должен вернуть null, если email корректный и не существует', async () => {
            (userBDService.findOneUser as jest.Mock).mockReturnValue(false);

            const result = await VerificationService.VerifyEditEmail('valid@example.com', {email: 'valid@example.com'});
            expect(result).toBeNull();
        });
    });

    describe('VerifyEditPassword', () => {

        test('должен вернуть ошибку, если не указан старый пароль', async () => {
            const result = await VerificationService.VerifyEditPassword('userId123', 'NewPassword123!', '');
            expect(result).toEqual({error: 'Не указан старый пароль'});
        });

        test('должен вернуть ошибку, если не указан новый пароль', async () => {
            const result = await VerificationService.VerifyEditPassword('userId123', '', 'OldPassword123!');
            expect(result).toEqual({error: 'Не указан новый пароль'});
        });

        test('должен вернуть ошибку, если новый пароль совпадает со старым', async () => {
            const oldPassword = 'OldPassword123!';
            const newPassword = 'OldPassword123!';

            const result = await VerificationService.VerifyEditPassword('userId123', newPassword, oldPassword);
            expect(result).toEqual({error: 'Новый пароль не должен совпадать со старым'});
        });

        test('должен вернуть ошибку, если старый пароль неверен', async () => {
            const oldPassword = 'OldPassword123!';
            const newPassword = 'NewPassword123!';

            (userBDService.findOneUserById as jest.Mock).mockReturnValue({password: "password"});
            (BcryptService.Compare as jest.Mock).mockReturnValue(false);

            const result = await VerificationService.VerifyEditPassword('userId123', newPassword, oldPassword);
            expect(result).toEqual({error: 'Старый пароль некорректен'});
        });

        test('должен вернуть ошибку, если новый пароль некорректный', async () => {
            const oldPassword = 'OldPassword123!';
            const newPassword = 'short';

            (userBDService.findOneUserById as jest.Mock).mockReturnValue({password: "password"});
            (BcryptService.Compare as jest.Mock).mockReturnValue(true);

            const result = await VerificationService.VerifyEditPassword('userId123', newPassword, oldPassword);

            expect(result).toEqual({error: 'Пароль должен содержать не менее 6 символов'});
        });

        test('должен вернуть null, если старый пароль верен и новый пароль корректный', async () => {
            const oldPassword = 'OldPassword123!';
            const newPassword = 'NewPassword123!';

            (userBDService.findOneUserById as jest.Mock).mockReturnValue({password: "password"});
            (BcryptService.Compare as jest.Mock).mockReturnValue(true);

            const result = await VerificationService.VerifyEditPassword('userId123', newPassword, oldPassword);
            expect(result).toBeNull();
        });
    });

    describe('VerifyEditAvatar', () => {

        test('должен вернуть ошибку, если изображение имеет неверный формат', async () => {
            const mockAvatarFile: UploadedImageByMulter = {
                fieldname: 'avatar',
                originalname: 'test.gif',
                encoding: '7bit',
                mimetype: 'image/gif',
                size: 5000,
                destination: '/uploads',
                filename: 'test.gif',
                path: 'test.gif',
                buffer: Buffer.from([]),
            };

            const result = await VerificationService.VerifyEditAvatar(mockAvatarFile);
            expect(result).toEqual({error: 'Изображение должно быть в формате jpg или png'});
        });

        test('должен вернуть ошибку, если изображение имеет неверное соотношение сторон', async () => {
            (SharpService.GetWidthAndHeight as jest.Mock).mockReturnValue({
                width: 100,
                height: 150,
            });

            const mockAvatarFile: UploadedImageByMulter = {
                mimetype: 'image/jpeg',
                path: 'path/to/image.jpg',
                filename: 'image.jpg',
                fieldname: 'avatar',
                originalname: 'test.gif',
                encoding: '7bit',
                size: 5000,
                destination: '/uploads',
                buffer: Buffer.from([]),
            };

            const result = await VerificationService.VerifyEditAvatar(mockAvatarFile);
            expect(result).toEqual({error: 'Изображение должно иметь соотношение сторон 1:1.'});
        });

        test('должен вернуть null, если изображение имеет верный формат и соотношение сторон', async () => {
            (SharpService.GetWidthAndHeight as jest.Mock).mockReturnValue({
                width: 150,
                height: 150,
            });

            const mockAvatarFile: UploadedImageByMulter = {
                mimetype: 'image/jpeg',
                path: 'path/to/image.jpg',
                filename: 'image.jpg',
                fieldname: 'avatar',
                originalname: 'test.gif',
                encoding: '7bit',
                size: 5000,
                destination: '/uploads',
                buffer: Buffer.from([]),
            };

            const result = await VerificationService.VerifyEditAvatar(mockAvatarFile);
            expect(result).toBeNull();
        });
    });
});
