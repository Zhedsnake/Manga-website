import verifyEditEmail from '../../../../util/Verification/EditUserInfo/verifyEditEmail';
import verifyEmail from '../../../../util/Verification/verifyEmail';

jest.mock('../../../../util/Verification/verifyEmail');

describe('verifyEditEmail', () => {

    test('должен вернуть результат проверки email, если email некорректен', () => {
        (verifyEmail as jest.Mock).mockReturnValue({ emailError: "Некорректный email" });

        const result = verifyEditEmail('');
        expect(result).toEqual({ emailError: "Некорректный email" });
    });

    test('должен вернуть null, если email корректен', () => {
        (verifyEmail as jest.Mock).mockReturnValue(null);

        const result = verifyEditEmail('test@example.com');
        expect(result).toBeNull();
    });
});
