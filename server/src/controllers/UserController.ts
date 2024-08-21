import { Request, Response } from "express";
import UserService from "../services/busines/UserService";
import registerRequestTypes from "../types/registerRequestTypes";
import loginRequestTypes from "../types/loginRequestTypes";


class UserControllers {
    async register (req: Request<registerRequestTypes>, res: Response) {
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

    async login (req: Request<loginRequestTypes>, res: Response) {
        const { name, password } = req.body;

        if (!name || !password) {
            res.status(400).send({ error: "Пожалуйста, заполните все поля."});
        }

        const loginResponse = await UserService.login(name, password)


        if (loginResponse) {
            if ("error" in loginResponse) {
                res.status(400).send(loginResponse);
            } else if ("userToken" in loginResponse) {
                res.status(201).send(loginResponse);
            }
        } else {
            res.status(500).send({ error: "Неизвестная ошибка" });
        }
    }
}

export default new UserControllers();