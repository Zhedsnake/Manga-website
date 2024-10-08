import GuestService from '../../../api/GuestService.ts';

describe('GuestService (Интеграция)', () => {
    
    test('должен вернуть токен гостя при успешной регистрации', async () => {
        const response = await GuestService.registerGuest();

        expect(response.status).toBe(201); // Проверяем успешный статус
        expect(response.data).toHaveProperty('guestToken'); // Проверяем наличие токена
        expect(typeof response.data.guestToken).toBe('string'); // Проверяем тип токена
    });
});
