import JwtService from "../jwt/JwtService";
import UserBDService from "../mongodb/UserBDService";

class UserService {

    async GetSmallUserInfoByToken(userId: string): Promise<{ name: string, pic: string } | undefined> {
        const userData: { name: string, pic: string } | undefined = await UserBDService.GetSmallUserInfoByToken(userId);
        return userData;
    }

    async UpdateUserToken(userId: string): Promise<{ userToken: string }> {
        const userToken = JwtService.getUserToken(userId);
        return {userToken: userToken};
    }

    async GetUserInfoByToken(userId: string) {
        const userData: {
            name: string
            registeredAt: string
            pic: string
            email: string }
            | undefined = await UserBDService.GetUserInfoByToken(userId);


        if (userData) {
            const formattedDate = new Date(userData.registeredAt).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });

            return {
                ...userData,
                registeredAt: formattedDate
            };
        }
    }
}

export default new UserService();
