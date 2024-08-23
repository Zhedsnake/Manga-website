import { Request, Response } from "express";
import GuestService from "../services/busines/GuestService";
import registerRequestTypes from "../types/registerRequestTypes";
import UserService from "../services/busines/UserService";
import loginRequestTypes from "../types/loginRequestTypes";


class AuthControllers {

    async registerGuest (req: Request, res: Response) {
        const guestToken: string | undefined = await GuestService.getGuestToken();
        const tokenError = "Токен не сгенерировался";

        if (guestToken) {
            res.status(201).send(guestToken);
        } else if (!guestToken) {
            res.status(404).send(tokenError);
            throw new Error(tokenError);
        }
    }

    async registerUser (req: Request<registerRequestTypes>, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).send({ error: "Пожалуйста, заполните все поля."});
        }

        const regResponse: { error: string; } | { userToken: string; } | undefined = await UserService.register(name, email, password)

        if (regResponse) {
            if ("error" in regResponse) {
                res.status(400).send(regResponse);
            } else if ("userToken" in regResponse) {
                res.status(201).send(regResponse);
            }
        } else {
            res.status(500).send({ error: "Неизвестная ошибка" });
        }
    }

    async loginUser (req: Request<loginRequestTypes>, res: Response) {
        const { name, password } = req.body;

        if (!name || !password) {
            res.status(400).send({ error: "Пожалуйста, заполните все поля."});
        }

        const loginResponse = await UserService.login(name, password)


        if (loginResponse) {
            if ("error" in loginResponse) {
                res.status(400).send(loginResponse);
            } else if ("userToken" in loginResponse) {
                res.status(200).send(loginResponse);
            }
        } else {
            res.status(500).send({ error: "Неизвестная ошибка" });
        }
    }
}

export default new AuthControllers();