import { Request, Response } from "express";
import UserService from "../services/busines/auth/UserService";
import registerRequestTypes from "../types/registerRequestTypes";


class UserControllers {
    async register (req: Request<registerRequestTypes>, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).send({ error: "Пожалуйста, заполните все поля."});
        }

        const regResponse: { error: string; } | { userToken: string; } | undefined = await UserService.register(req.body)

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

    async login (req: Request, res: Response) {
        console.log(req.body);
    }
}

export default new UserControllers();