import jwt from 'jsonwebtoken';
import {JwtService} from '../../../../services/jwt/JwtService';
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
    let originalEnv: NodeJS.ProcessEnv;

    beforeAll(() => {
        originalEnv = { ...process.env };
        process.env.JWT_SECRET = 'test_secret';
    });

    beforeEach(() => {
        jwtService = new JwtService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        process.env = { ...originalEnv };
    })

    test('должен успешно создать guest токен без экспирацией', () => {
        const id = 'guest123';
        const mockToken = 'mockGuestToken';

        (jwt.sign as jest.Mock).mockReturnValue(mockToken);

        const token = jwtService.getGuestToken(id);

        expect(jwt.sign).toHaveBeenCalledWith(
            { guest: { id } },
            'test_secret'
        );

        expect(token).toBe(mockToken);

        const mockDecodedPayload = { guest: { id } };
        (jwt.verify as jest.Mock).mockReturnValue(mockDecodedPayload);

        const decoded = jwtService.decode(token);
        expect(decoded).toBe(id);
    });

    test('должен успешно создать user токен с экспирацией', () => {
        const id = 'user123';
        const mockToken = 'mockUserToken';

        (jwt.sign as jest.Mock).mockReturnValue(mockToken);

        const token = jwtService.getUserToken(id);

        expect(jwt.sign).toHaveBeenCalledWith(
            { user: { id } },
            'test_secret',
            { expiresIn: '30d' }
        );

        expect(token).toBe(mockToken);

        const mockDecodedPayload = { user: { id } };
        (jwt.verify as jest.Mock).mockReturnValue(mockDecodedPayload);

        const decoded = jwtService.decode(token);
        expect(decoded).toBe(id);
    });

    test('должен успешно декодировать guest токен', () => {
        const mockToken = 'mockGuestToken';
        const mockDecodedPayload = { guest: { id: 'guest123' } };

        (jwt.verify as jest.Mock).mockReturnValue(mockDecodedPayload);

        const decodedId = jwtService.decode(mockToken);

        expect(jwt.verify).toHaveBeenCalledWith(mockToken, 'test_secret');

        expect(decodedId).toBe('guest123');
    });

    test('должен успешно декодировать user токен', () => {
        const mockToken = 'mockUserToken';
        const mockDecodedPayload = { user: { id: 'user123' } };

        (jwt.verify as jest.Mock).mockReturnValue(mockDecodedPayload);

        const decodedId = jwtService.decode(mockToken);

        expect(jwt.verify).toHaveBeenCalledWith(mockToken, 'test_secret');

        expect(decodedId).toBe('user123');
    });

    test('должен возвращать null при ошибке токена', () => {
        const jwtService = new JwtService();
        const mockToken = 'invalidToken';

        (jwt.verify as jest.Mock).mockImplementation(() => {
            throw new Error('Invalid token');
        });

        const decodedId = jwtService.decode(mockToken);

        expect(jwt.verify).toHaveBeenCalledWith(mockToken, 'test_secret');

        expect(decodedId).toBeNull();
    });

    test('должен возвращать null при истечении срока действия токена', () => {
        const mockToken = 'expiredToken';

        (jwt.verify as jest.Mock).mockImplementation(() => {
            throw new jwt.TokenExpiredError('Token expired', new Date());
        });

        const decodedId = jwtService.decode(mockToken);

        expect(jwt.verify).toHaveBeenCalledWith(mockToken, 'test_secret');

        expect(decodedId).toBeNull();
    });

});
