import GuestBDService from "../../mongodb/GuestBDService";
import JwtService from "../../jwt/JwtService";


class GuestService {

    async getGuestToken () {
        try {
            const guestId: string = await GuestBDService.createGuest();

            const payload = {
                guest: {
                    id: guestId,
                },
            };

            const jwtToken = JwtService.getGuestToken(payload);

            return jwtToken

        } catch (e) {
            console.error(e);
        }
    }
}

export default new GuestService();