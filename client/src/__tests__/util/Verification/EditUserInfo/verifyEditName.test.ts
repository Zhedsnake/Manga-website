import verifyEditName from '../../../../util/Verification/EditUserInfo/verifyEditName';
import verifyName from '../../../../util/Verification/verifyName';

jest.mock('../../../../util/Verification/verifyName');

describe('verifyEditName', () => {

    test('должен вернуть результат проверки имени, если имя некорректно', () => {
        (verifyName as jest.Mock).mockReturnValue({ nameError: "Некорректное имя" });

        const result = verifyEditName('');
        expect(result).toEqual({ nameError: "Некорректное имя" });
    });

    test('должен вернуть null, если имя корректно', () => {
        (verifyName as jest.Mock).mockReturnValue(null);

        const result = verifyEditName('Имя');
        expect(result).toBeNull();
    });
});
