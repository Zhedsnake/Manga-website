import AuthService from '../../../../services/busines/AuthService';
import JwtService from '../../../../services/jwt/JwtService';
import AuthBDService from '../../../../services/mongodb/AuthBDService';
import VerificationService from '../../../../services/busines/VerificationService';
import BcryptService from '../../../../services/bcrypt/BcryptService';

jest.mock('../../../../services/jwt/JwtService');
jest.mock('../../../../services/mongodb/AuthBDService');
jest.mock('../../../../services/busines/VerificationService');
jest.mock('../../../../services/bcrypt/BcryptService');

describe('AuthService', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getGuestToken', () => {

        test('должен вернуть guestToken, если создание гостя успешно', async () => {
            AuthBDService.createGuest = jest.fn().mockResolvedValue({ id: 'guest-id' });
            JwtService.getGuestToken = jest.fn().mockReturnValue('mocked-guest-token');

            const result = await AuthService.getGuestToken();

            expect(AuthBDService.createGuest).toHaveBeenCalled();
            expect(JwtService.getGuestToken).toHaveBeenCalledWith('guest-id');
            expect(result).toEqual({ guestToken: 'mocked-guest-token' });
        });

        test('должен вернуть undefined, если создание гостя не удалось', async () => {
            AuthBDService.createGuest = jest.fn().mockResolvedValue(null);

            const result = await AuthService.getGuestToken();

            expect(AuthBDService.createGuest).toHaveBeenCalled();
            expect(result).toBeUndefined();
        });
    });

    describe('register', () => {

        test('должен вернуть ошибку верификации при некорректных данных', async () => {
            VerificationService.VerifyRegister = jest.fn().mockResolvedValue({ error: 'Invalid data' });

            const result = await AuthService.register('invalid-name', 'invalid-email', 'short-pass');

            expect(VerificationService.VerifyRegister).toHaveBeenCalledWith('invalid-name', 'invalid-email', 'short-pass');
            expect(result).toEqual({ error: 'Invalid data' });
        });

        test('должен зарегистрировать пользователя и вернуть userToken', async () => {
            VerificationService.VerifyRegister = jest.fn().mockResolvedValue(null);
            BcryptService.Hash = jest.fn().mockResolvedValue('hashed-password');
            AuthBDService.register = jest.fn().mockResolvedValue({ id: 'user-id' });
            JwtService.getUserToken = jest.fn().mockReturnValue('mocked-user-token');

            const result = await AuthService.register('user', 'user@mail.com', 'password123');

            expect(BcryptService.Hash).toHaveBeenCalledWith('password123');
            expect(AuthBDService.register).toHaveBeenCalledWith({
                name: 'user',
                email: 'user@mail.com',
                password: 'hashed-password',
            });
            expect(JwtService.getUserToken).toHaveBeenCalledWith('user-id');
            expect(result).toEqual({ userToken: 'mocked-user-token' });
        });
    });

    describe('login', () => {

        test('должен вернуть ошибку верификации при некорректных данных', async () => {
            VerificationService.VerifyLogin = jest.fn().mockResolvedValue({ error: 'Invalid credentials' });

            const result = await AuthService.login('invalid-name', 'wrong-password');

            expect(VerificationService.VerifyLogin).toHaveBeenCalledWith({
                name: 'invalid-name',
                password: 'wrong-password',
            });
            expect(result).toEqual({ error: 'Invalid credentials' });
        });

        test('должен вернуть userToken при успешном логине', async () => {
            VerificationService.VerifyLogin = jest.fn().mockResolvedValue({ id: 'user-id' });
            JwtService.getUserToken = jest.fn().mockReturnValue('mocked-user-token');

            const result = await AuthService.login('valid-name', 'correct-password');

            expect(VerificationService.VerifyLogin).toHaveBeenCalledWith({
                name: 'valid-name',
                password: 'correct-password',
            });
            expect(JwtService.getUserToken).toHaveBeenCalledWith('user-id');
            expect(result).toEqual({ userToken: 'mocked-user-token' });
        });
    });
});
