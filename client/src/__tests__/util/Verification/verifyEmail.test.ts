import verifyEmail from '../../../util/Verification/verifyEmail';

describe('verifyEmail', () => {
    test('должен вернуть ошибку, если email не указан', () => {
        const result = verifyEmail('');
        expect(result).toEqual({ emailError: "Не указано email" });
    });

    test('должен вернуть ошибку, если email имеет некорректный формат', () => {
        const result = verifyEmail('invalid-email');
        expect(result).toEqual({ emailError: "Некорректный формат email" });
    });

    test('должен вернуть null, если email корректен', () => {
        const result = verifyEmail('test@example.com');
        expect(result).toBeNull();
    });
});
