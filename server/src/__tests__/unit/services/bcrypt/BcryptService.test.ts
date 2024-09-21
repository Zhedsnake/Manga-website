import {BcryptService} from '../../../../services/bcrypt/BcryptService';

describe('BcryptService', () => {
    let bcryptService: BcryptService;

    beforeAll(async () => {
        bcryptService = new BcryptService();
        await bcryptService['initSalt']();
    });

    test('должно правильно хэшировать и сравнивать значение', async () => {
        const value = 'mySecretValue';

        const hashedValue = await bcryptService.Hash(value);
        expect(hashedValue).not.toBe(value);

        const isMatch = await bcryptService.Compare(value, hashedValue);
        expect(isMatch).toBe(true);
    });

    test('должно сравнивать разные значения и возвращать false', async () => {
        const value = 'mySecretValue';
        const differentValue = 'anotherValue';

        const hashedValue = await bcryptService.Hash(value);

        const isMatch = await bcryptService.Compare(differentValue, hashedValue);
        expect(isMatch).toBe(false);
    });
});
