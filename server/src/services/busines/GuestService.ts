import GuestBDService from "../mongodb/GuestBDService";
import JwtService from "../jwt/JwtService";


class GuestService {

    async getGuestToken (): Promise<string> {
        const guestId: string = await GuestBDService.createGuest();

        const payload = {
            guest: {
                id: guestId,
            },
        };

        const jwtToken: string = JwtService.getGuestToken(payload);

        return jwtToken
    }

    // async removeGuest(guestToken: string) {
    //     const guestId: string | null = JwtService.decode(guestToken);
    //
    //     if (guestId) {
    //         const response = await GuestBDService.removeGuest(guestId);
    //         console.log(`ответ от бд на удаление guest` + {response});
    //     } else {
    //         console.error("Ошибка при декодировании guest токена");
    //     }
    // }
}

export default new GuestService();