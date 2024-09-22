import verifyLogin from '../../../../util/Auth/verifyLogin';
import verifyName from '../../../../util/Verification/verifyName';
import verifyPassword from '../../../../util/Verification/verifyPassword';

jest.mock('../../../../util/Verification/verifyName');
jest.mock('../../../../util/Verification/verifyPassword');

describe('verifyLogin', () => {

    test('должен вернуть ошибку, если одно из полей пустое', () => {
        const result = verifyLogin('', 'Password1!');
        expect(result).toEqual({ loginError: "Пожалуста, заполните все поля" });
    });

    test('должен вернуть ошибку, если имя некорректно', () => {
        (verifyName as jest.Mock).mockReturnValue({ nameError: "Некорректное имя" });

        const result = verifyLogin('N', 'Password1!');
        expect(result).toEqual({ nameError: "Некорректное имя" });
    });

    test('должен вернуть ошибку, если пароль некорректен', () => {
        (verifyName as jest.Mock).mockReturnValue(null); // Имя корректно
        (verifyPassword as jest.Mock).mockReturnValue({ passwordError: "Некорректный пароль" });

        const result = verifyLogin('Name', 'short');
        expect(result).toEqual({ passwordError: "Некорректный пароль" });
    });

    test('должен вернуть null, если все поля корректны', () => {
        (verifyName as jest.Mock).mockReturnValue(null); // Имя корректно
        (verifyPassword as jest.Mock).mockReturnValue(null); // Пароль корректен

        const result = verifyLogin('Name', 'Password1!');
        expect(result).toBeNull();
    });
});
