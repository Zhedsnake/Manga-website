import jwt from 'jsonwebtoken';
import {JwtService} from '../../../../src/services/jwt/JwtService';
import 'dotenv/config';

jest.mock('jsonwebtoken', () => {
    const actualJwt = jest.requireActual('jsonwebtoken');
    return {
        ...actualJwt,
        sign: jest.fn(),
        verify: jest.fn(),
        TokenExpiredError: actualJwt.TokenExpiredError
    };
});
describe('JwtService', () => {
    let jwtService: JwtService;

    beforeAll(() => {
        // Убедись, что JWT_SECRET установлен для тестов
        process.env.JWT_SECRET = 'test_secret';
    });

    beforeEach(() => {
        // Создаём новый экземпляр класса перед каждым тестом
        jwtService = new JwtService();
    });

    test('должен успешно создать guest токен', () => {
        const id = 'guest123';
        const mockToken = 'mockGuestToken';

        (jwt.sign as jest.Mock).mockReturnValue(mockToken);

        const token = jwtService.getGuestToken(id);

        expect(token).toBe(mockToken);

        const mockDecodedPayload = { guest: { id } };
        (jwt.verify as jest.Mock).mockReturnValue(mockDecodedPayload);

        const decoded = jwtService.decode(token);
        expect(decoded).toBe(id);
    });

});
