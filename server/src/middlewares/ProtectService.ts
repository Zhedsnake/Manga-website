import JwtService from "../services/jwt/JwtService";
import { Request, Response, NextFunction } from "express";
import userBDService from "../services/mongodb/UserBDService";

class ProtectService {
    async checkUserToken(req: Request, res: Response, next: NextFunction) {
        try {
            const userToken: string | undefined = req.headers['user-token'] as string | undefined;

            if (!userToken) {
                return res.status(401).send({ error: 'Нет user-token' });
            }

            const decodedToken = JwtService.decode(userToken);

            if (!decodedToken) {
                return res.status(401).send({ error: "Токен устарел" });
            }

            const userFromBd = await userBDService.findOneUser(decodedToken);

            if (!userFromBd) {
                return res.status(401).send({ error: "Токен устарел" });
            }

            req.headers['user-id'] = decodedToken;

            next();

        } catch (error) {
            console.error("Ошибка в checkUserToken:", error);
            return res.status(500).send({ error: 'Внутренняя ошибка сервера' });
        }
    }
}

export default new ProtectService();
