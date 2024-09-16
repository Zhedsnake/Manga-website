import JwtService from "../jwt/JwtService";
import AuthBDService from "../mongodb/AuthBDService";
import VerificationService from "./VerificationService";
import 'dotenv/config'
import BcryptService from "../bcrypt/BcryptService";

class AuthService {

    async getGuestToken (): Promise<{guestToken: string} | undefined> {
        const guestId: { id: string } | null = await AuthBDService.createGuest();

        if (guestId && "id" in guestId) {
            const jwtToken: string = JwtService.getGuestToken(guestId.id);
            return {guestToken: jwtToken}
        }
    }

    async register(name: string, email: string, password: string) {

        const verificationResponse:{error: string} | null | undefined = await VerificationService.VerifyRegister(name, email, password)
        if (verificationResponse && "error" in verificationResponse) {
            return verificationResponse;
        }

        const hashedPassword: string = await BcryptService.Hash(password)

        const prop = {name: name, email: email, password: hashedPassword};

        const responseBD: { id: string } | null = await AuthBDService.register(prop);

        if (responseBD && "id" in responseBD) {
            const userToken: string = JwtService.getUserToken(responseBD.id);

            return {userToken: userToken};
        }
    }

    async login(name: string, password: string) {

        const prop = { name: name, password: password }

        const verificationResponse:{error: string} | {id: string} | undefined = await VerificationService.VerifyLogin(prop)
        if (verificationResponse && "error" in verificationResponse) {
            return verificationResponse;

        } else if (verificationResponse && "id" in verificationResponse) {

            const userToken: string = JwtService.getUserToken(verificationResponse.id);
            return {userToken: userToken};
        }
    }
}

export default new AuthService();
