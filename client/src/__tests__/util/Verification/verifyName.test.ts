import verifyName from '../../../util/Verification/verifyName';

describe('verifyName', () => {

    test('должен вернуть ошибку, если имя не указано', () => {
        const result = verifyName('');
        expect(result).toEqual({ nameError: "Не указано имя" });
    });

    test('должен вернуть ошибку, если имя слишком короткое', () => {
        const result = verifyName('Bob');
        expect(result).toEqual({ nameError: "Имя должно содержать не менее 4 символов" });
    });

    test('должен вернуть ошибку, если имя слишком длинное', () => {
        const result = verifyName('Alexander23232');
        expect(result).toEqual({ nameError: "Имя должно содержать не более 10 символов" });
    });

    test('должен вернуть null, если имя корректно', () => {
        const result = verifyName('John');
        expect(result).toBeNull();
    });
});
