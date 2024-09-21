import UserService from "../../../services/busines/UserService";
import JwtService from "../../../services/jwt/JwtService";
import UserBDService from "../../../services/mongodb/UserBDService";
import VerificationService from "../../../services/busines/VerificationService";

jest.mock('../../../services/jwt/JwtService');
jest.mock('../../../services/mongodb/UserBDService');
jest.mock('../../../services/busines/VerificationService');


describe('UserService', () => {

    describe('GetSmallUserInfoByToken', () => {

        test('должен возвращать сообщение об ошибке из службы проверки, если проверка завершилась неудачно', async () => {
            const mockError = { error: 'Invalid webpTest value' };

            (VerificationService.VerifySupWebp as jest.Mock).mockReturnValue(mockError);

            const result = await UserService.GetSmallUserInfoByToken('userId123', 'invalid');

            expect(VerificationService.VerifySupWebp).toHaveBeenCalledWith('invalid');

            expect(result).toEqual(mockError);
        });

        test('должен возвращать данные из GetSmallUserInfoByTokenWebp, когда webpTest имеет значение true', async () => {
            const mockUserInfo = { name: 'John Doe', minPic: 'pic.webp' };

            (VerificationService.VerifySupWebp as jest.Mock).mockReturnValue(null);

            (UserBDService.GetSmallUserInfoByTokenWebp as jest.Mock).mockResolvedValue(mockUserInfo);

            const result = await UserService.GetSmallUserInfoByToken('userId123', 'true');

            expect(UserBDService.GetSmallUserInfoByTokenWebp).toHaveBeenCalledWith('userId123');

            expect(result).toEqual(mockUserInfo);
        });

        test('должен возвращать данные из GetSmallUserInfoByTokenNoWebp, когда webpTest имеет значение false', async () => {
            const mockUserInfo = { name: 'John Doe', pic: 'pic.png' };

            (VerificationService.VerifySupWebp as jest.Mock).mockReturnValue(null);

            (UserBDService.GetSmallUserInfoByTokenNoWebp as jest.Mock).mockResolvedValue(mockUserInfo);

            const result = await UserService.GetSmallUserInfoByToken('userId123', 'false');

            expect(UserBDService.GetSmallUserInfoByTokenNoWebp).toHaveBeenCalledWith('userId123');

            expect(result).toEqual(mockUserInfo);
        });
    });

    describe('UpdateUserToken', () => {

        test('должен возвращать токен пользователя из JwtService', async () => {
            const mockToken = 'mocked-jwt-token';
            (JwtService.getUserToken as jest.Mock).mockReturnValue(mockToken);

            const result = await UserService.UpdateUserToken('userId123');

            expect(JwtService.getUserToken).toHaveBeenCalledWith('userId123');
            expect(result).toEqual({ userToken: mockToken });
        });
    });

    describe('GetUserInfoByToken', () => {
        const mockUserId = 'userId123';
        const mockUserInfoWebp = {
            name: 'John Doe',
            registeredAt: '2022-05-15T10:00:00Z',
            picWebp: 'image.webp',
            email: 'john@example.com'
        };
        const mockUserInfoNoWebp = {
            name: 'John Doe',
            registeredAt: '2022-05-15T10:00:00Z',
            pic: 'image.png',
            email: 'john@example.com'
        };

        afterEach(() => {
            jest.clearAllMocks();
        });

        test('должна быть возвращена ошибка, если проверка webp-теста завершится неудачно', async () => {
            const verificationError = { error: 'Invalid webp test' };

            (VerificationService.VerifySupWebp as jest.Mock).mockReturnValue(verificationError);

            const result = await UserService.GetUserInfoByToken(mockUserId, 'invalid-webp-test');

            expect(VerificationService.VerifySupWebp).toHaveBeenCalledWith('invalid-webp-test');

            expect(result).toEqual(verificationError);
        });

        test('должен возвращать информацию о пользователе с Webb, если webpTest имеет значение "true".', async () => {
            (VerificationService.VerifySupWebp as jest.Mock).mockReturnValue(null);
            (UserBDService.GetUserInfoByTokenWebp as jest.Mock).mockResolvedValue(mockUserInfoWebp);

            const result = await UserService.GetUserInfoByToken(mockUserId, 'true');

            expect(VerificationService.VerifySupWebp).toHaveBeenCalledWith('true');

            expect(UserBDService.GetUserInfoByTokenWebp).toHaveBeenCalledWith(mockUserId);

            expect(result).toEqual({
                ...mockUserInfoWebp,
                registeredAt: '15 мая 2022 г.'
            });
        });

        test('должен возвращать информацию о пользователе без WebP, если webpTest имеет значение "false".', async () => {
            (VerificationService.VerifySupWebp as jest.Mock).mockReturnValue(null);

            (UserBDService.GetUserInfoByTokenNoWebp as jest.Mock).mockResolvedValue(mockUserInfoNoWebp);

            const result = await UserService.GetUserInfoByToken(mockUserId, 'false');

            expect(VerificationService.VerifySupWebp).toHaveBeenCalledWith('false');

            expect(UserBDService.GetUserInfoByTokenNoWebp).toHaveBeenCalledWith(mockUserId);

            expect(result).toEqual({
                ...mockUserInfoNoWebp,
                registeredAt: '15 мая 2022 г.'
            });
        });

        test('следует правильно форматировать зарегистрированную дату', async () => {
            (VerificationService.VerifySupWebp as jest.Mock).mockReturnValue(null);
            (UserBDService.GetUserInfoByTokenWebp as jest.Mock).mockResolvedValue(mockUserInfoWebp);

            const result = await UserService.GetUserInfoByToken(mockUserId, 'true');

            if (result && "registeredAt" in result) {
                expect(result.registeredAt).toBe('15 мая 2022 г.');
            }
        });
    });
});
