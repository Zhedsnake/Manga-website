import verifyReg from '../../../../util/Auth/verifyReg';
import verifyName from '../../../../util/Verification/verifyName';
import verifyEmail from '../../../../util/Verification/verifyEmail';
import verifyPassword from '../../../../util/Verification/verifyPassword';

jest.mock('../../../../util/Verification/verifyName');
jest.mock('../../../../util/Verification/verifyEmail');
jest.mock('../../../../util/Verification/verifyPassword');

describe('verifyReg', () => {

    test('должен вернуть ошибку, если одно из полей пустое', () => {
        const result = verifyReg('', 'test@example.com', 'Password1!');
        expect(result).toEqual({ regError: "Пожалуста, заполните все поля" });
    });

    test('должен вернуть ошибку, если имя некорректно', () => {
        (verifyName as jest.Mock).mockReturnValue({ nameError: "Некорректное имя" });

        const result = verifyReg('N', 'test@example.com', 'Password1!');
        expect(result).toEqual({ nameError: "Некорректное имя" });
    });

    test('должен вернуть ошибку, если email некорректен', () => {
        (verifyName as jest.Mock).mockReturnValue(null);
        (verifyEmail as jest.Mock).mockReturnValue({ emailError: "Некорректный email" });

        const result = verifyReg('Name', 'invalid-email', 'Password1!');
        expect(result).toEqual({ emailError: "Некорректный email" });
    });

    test('должен вернуть ошибку, если пароль некорректен', () => {
        (verifyName as jest.Mock).mockReturnValue(null);
        (verifyEmail as jest.Mock).mockReturnValue(null);
        (verifyPassword as jest.Mock).mockReturnValue({ passwordError: "Некорректный пароль" });

        const result = verifyReg('Name', 'test@example.com', 'short');
        expect(result).toEqual({ passwordError: "Некорректный пароль" });
    });

    test('должен вернуть null, если все поля корректны', () => {
        (verifyName as jest.Mock).mockReturnValue(null);
        (verifyEmail as jest.Mock).mockReturnValue(null);
        (verifyPassword as jest.Mock).mockReturnValue(null);

        const result = verifyReg('Name', 'test@example.com', 'Password1!');
        expect(result).toBeNull();
    });
});
