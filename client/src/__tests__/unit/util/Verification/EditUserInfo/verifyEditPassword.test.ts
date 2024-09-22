import verifyEditPassword from '../../../../../util/Verification/EditUserInfo/verifyEditPassword';
import verifyPassword from '../../../../../util/Verification/verifyPassword';

jest.mock('../../../../../util/Verification/verifyPassword');

describe('verifyEditPassword', () => {

    test('должен вернуть ошибку, если старый пароль не указан', () => {
        const result = verifyEditPassword('', 'NewPassword1!');
        expect(result).toEqual({ passwordError: "Не указан старый пароль" });
    });

    test('должен вернуть ошибку, если новый пароль не указан', () => {
        const result = verifyEditPassword('OldPassword1!', '');
        expect(result).toEqual({ passwordError: "Не указан новый пароль" });
    });

    test('должен вернуть ошибку, если новый пароль совпадает со старым', () => {
        const result = verifyEditPassword('Password123!', 'Password123!');
        expect(result).toEqual({ passwordError: 'Новый пароль не должен совпадать со старым' });
    });

    test('должен вернуть результат проверки пароля, если новый пароль некорректен', () => {
        (verifyPassword as jest.Mock).mockReturnValue({ passwordError: "Некорректный формат пароля" });

        const result = verifyEditPassword('OldPassword1!', 'New');
        expect(result).toEqual({ passwordError: "Некорректный формат пароля" });
    });

    test('должен вернуть null, если все корректно', () => {
        (verifyPassword as jest.Mock).mockReturnValue(null);

        const result = verifyEditPassword('OldPassword1!', 'NewPassword1!');
        expect(result).toBeNull();
    });
});
