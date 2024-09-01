import JwtService from "../jwt/JwtService";
import UserBDService from "../mongodb/UserBDService";
import bcrypt from "bcrypt";
import GuestBDService from "../mongodb/GuestBDService";
import AuthBDService from "../mongodb/AuthBDService";
import VerificationService from "./VerificationService";

class AuthService {
    private salt: string;

    constructor() {
        this.salt = '';
        this.initSalt();
    }

    private async initSalt() {
        const salt: string | undefined = process.env.SALT;
        if (!salt) {
            throw new Error('JWT_SECRET is not defined');
        }

        const saltRounds: number = parseInt(salt);
        this.salt = await bcrypt.genSalt(saltRounds);
    }

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

        const hashedPassword: string = await bcrypt.hash(password, this.salt);

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
