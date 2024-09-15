import VerificationService from '../../../services/busines/VerificationService';

describe('VerifySupWebp', () => {
    it('должен вернуть ошибку, если передан неверный формат значения webpTest', async () => {
        const result = await VerificationService.VerifySupWebp('invalid_value');
        expect(result).toEqual({ error: 'Не указана поддержка webp в булевом формате ("true","false")' });
    });

    it('должен вернуть ошибку, если значение webpTest не передано', async () => {
        const result = await VerificationService.VerifySupWebp('');
        expect(result).toEqual({ error: 'Не указана поддержка webp в булевом формате ("true","false")' });
    });

    it('должен вернуть null, если передано значение "true"', async () => {
        const result = await VerificationService.VerifySupWebp('true');
        expect(result).toBeNull();
    });

    it('должен вернуть null, если передано значение "false"', async () => {
        const result = await VerificationService.VerifySupWebp('false');
        expect(result).toBeNull();
    });
});
