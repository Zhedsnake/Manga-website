import JwtService from "../jwt/JwtService";
import UserBDService from "../mongodb/UserBDService";
import bcrypt from "bcrypt";


class UserService {

    async register(name: string, email: string, password: string) {
        if (process.env.SALT) {
            const saltRounds: number = parseInt(process.env.SALT);
            const salt: string = await bcrypt.genSalt(saltRounds);
            const hashedPassword: string = await bcrypt.hash(password, salt);

            const responseBD: { id: string } | {
                error: string
            } = await UserBDService.register(name, hashedPassword, email);

            if (responseBD) {
                if ("error" in responseBD) {
                    return responseBD
                } else if ("id" in responseBD) {
                    const payload = {
                        user: {
                            id: responseBD.id,
                        },
                    };

                    const userToken = JwtService.getUserToken(payload);
                    return {userToken: userToken};
                }
            }
        } else if (!process.env.SALT) {
            console.error(`Не указана соль`)
        }
    }

    async login(name: string, password: string) {
        const responseBD = await UserBDService.login(name);

        if (responseBD) {
            if ("password" in responseBD) {
                const isMatch: boolean = await bcrypt.compare(password, responseBD.password);

                if (!isMatch) {
                    return {error: 'Имя или пароль неправельные'};
                }

                const payload = {
                    user: {
                        id: responseBD.id,
                    },
                };

                const userToken = JwtService.getUserToken(payload);
                return {userToken: userToken};

            } else if ("error" in responseBD) {
                return responseBD
            }
        }
    }

    async GetSmallUserInfoByToken(userToken: string) {
        const userId: string | null = JwtService.decode(userToken);

        if (!userId) {
            return {error: "Токен устарел"}
        }

        const userData: { name: string, pic: string } | undefined = await UserBDService.GetSmallUserInfoByToken(userId);

        if (userData) {
            return userData;
        } else if (!userData) {
            console.error("Неизвестная ошибка при GetSmallUserInfoByToken из бд")
        }
    }

    async UpdateUserToken(Token: string) {
        const userId: string | null = JwtService.decode(Token);

        if (!userId) {
            return {error: "Токен устарел"}
        }

        const payload = {
            user: {
                id: userId,
            },
        };

        const userToken = JwtService.getUserToken(payload);
        return {userToken: userToken};
    }
}

export default new UserService();
