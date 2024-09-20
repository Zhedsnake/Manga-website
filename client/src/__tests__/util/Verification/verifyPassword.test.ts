import verifyPassword from '../../../util/Verification/verifyPassword';

describe('verifyPassword', () => {

    test('должен вернуть ошибку, если пароль не указан', () => {
        const result = verifyPassword('');
        expect(result).toEqual({ passwordError: "Не указан пароль" });
    });

    test('должен вернуть ошибку, если пароль слишком короткий', () => {
        const result = verifyPassword('12345');
        expect(result).toEqual({ passwordError: "Пароль должен содержать не менее 6 символов" });
    });

    test('должен вернуть ошибку, если пароль слишком длинный', () => {
        const result = verifyPassword('12345678901234567');
        expect(result).toEqual({ passwordError: "Пароль должен содержать не более 16 символов" });
    });

    test('должен вернуть ошибку, если нет заглавной буквы', () => {
        const result = verifyPassword('password123!');
        expect(result).toEqual({ passwordError: "Пароль должен содержать хотя бы одну заглавную букву" });
    });

    test('должен вернуть ошибку, если меньше трех цифр', () => {
        const result = verifyPassword('Pass13');
        expect(result).toEqual({ passwordError: "Пароль должен содержать хотя бы три числа" });
    });

    test('должен вернуть ошибку, если нет специального символа', () => {
        const result = verifyPassword('Password123');
        expect(result).toEqual({ passwordError: "Пароль должен содержать хотя бы один специальный символ" });
    });

    test('должен вернуть ошибку, если есть недопустимые символы', () => {
        const result = verifyPassword('Password123@!#*');
        expect(result).toBeNull();
    });

    test('должен вернуть null, если пароль корректен', () => {
        const result = verifyPassword('Password123!');
        expect(result).toBeNull();
    });
});
