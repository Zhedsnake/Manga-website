import JwtService from "../jwt/JwtService";
import UserBDService from "../mongodb/UserBDService";
import VerificationService from "./VerificationService";

class UserService {

    async GetSmallUserInfoByToken(userId: string, webpTest: string): Promise<
        { name: string, minPic?: string, pic?: string }
        | null
        | {error: string}
        | undefined

    > {

        const verificationResponse: Promise<{ error: string } | null> = VerificationService.VerifySupWebp(webpTest)
        if (verificationResponse && "error" in verificationResponse) {
            return verificationResponse;
        }

        if (webpTest === "true") {
            return await UserBDService.GetSmallUserInfoByTokenWebp(userId)
        } else if (webpTest === "false") {
            return await UserBDService.GetSmallUserInfoByTokenNoWebp(userId);
        }
    }

    async UpdateUserToken(userId: string): Promise<{ userToken: string }> {
        const userToken = JwtService.getUserToken(userId);

        return {userToken: userToken};
    }

    async GetUserInfoByToken(userId: string, webpTest: string) {

        const verificationResponse = VerificationService.VerifySupWebp(webpTest)
        if (verificationResponse && "error" in verificationResponse) {
            return verificationResponse;
        }

        let userInfo: { name: string, registeredAt: string, picWebp?: string, pic?: string, email: string } | undefined = {
            name: "", registeredAt: "", picWebp: "", pic: "", email: ""
        }

        if (webpTest === "true") {
            userInfo = await UserBDService.GetUserInfoByTokenWebp(userId)
        } else if (webpTest === "false") {
            userInfo = await UserBDService.GetUserInfoByTokenNoWebp(userId);
        }

        if (userInfo) {
            const formattedDate = new Date(userInfo.registeredAt).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });

            return {
                ...userInfo,
                registeredAt: formattedDate
            };
        }
    }
}

export default new UserService();
