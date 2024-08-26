import { Request, Response } from "express";
import GuestService from "../services/busines/GuestService";
import registerRequestTypes from "../types/registerRequestTypes";
import UserService from "../services/busines/UserService";
import loginRequestTypes from "../types/loginRequestTypes";


class AuthControllers {

    async registerGuest (req: Request, res: Response) {
        try {
            const guestToken: string = await GuestService.getGuestToken();
            const tokenError = "Токен не сгенерировался";

            if (guestToken) {
                return res.status(201).send(guestToken);
            } else {
                return res.status(500).send(tokenError);
            }
        } catch (error) {
            console.error("Ошибка в registerGuest:", error);
        }
    }

    async registerUser (req: Request<registerRequestTypes>, res: Response) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).send({ error: "Пожалуйста, заполните все поля."});
            }

            const regResponse: { error: string; } | { userToken: string; } | undefined = await UserService.register(name, email, password)

            if (regResponse) {
                if ("error" in regResponse) {
                    return res.status(400).send(regResponse);
                } else if ("userToken" in regResponse) {
                    return res.status(201).send(regResponse);
                }
            } else {
                return res.status(500).send({ error: "Неизвестная ошибка" });
            }
        } catch (error) {
            console.error("Ошибка в registerUser:", error);
        }
    }

    async loginUser (req: Request<loginRequestTypes>, res: Response) {
        try {
            const { name, password } = req.body;

            if (!name || !password) {
                return res.status(400).send({ error: "Пожалуйста, заполните все поля."});
            }

            const loginResponse = await UserService.login(name, password)


            if (loginResponse) {
                if ("error" in loginResponse) {
                    return res.status(400).send(loginResponse);
                } else if ("userToken" in loginResponse) {
                    return res.status(200).send(loginResponse);
                }return
            } else {
                return res.status(500).send({ error: "Неизвестная ошибка" });
            }
        } catch (error) {
            console.error("Ошибка в loginUser:", error);
        }
    }
}

export default new AuthControllers();