import verifyEditAvatar from '../../../../../util/Verification/EditUserInfo/verifyEditAvatar';
import verifyAvatar from '../../../../../util/Verification/verifyAvatar';

jest.mock('../../../../../util/Verification/verifyAvatar');

describe('verifyEditAvatar', () => {
    test('должен вернуть результат проверки аватара, если аватар некорректен', async () => {
        (verifyAvatar as jest.Mock).mockResolvedValue({ avatarError: "Некорректный аватар" });

        const result = await verifyEditAvatar(new File([], 'test.png'));
        expect(result).toEqual({ avatarError: "Некорректный аватар" });
    });

    test('должен вернуть null, если аватар корректен', async () => {
        (verifyAvatar as jest.Mock).mockResolvedValue(null);

        const result = await verifyEditAvatar(new File([], 'valid.png'));
        expect(result).toBeNull();
    });
});
