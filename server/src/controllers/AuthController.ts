import { Request, Response } from "express";
import registerRequestTypes from "../types/registerRequestTypes";
import loginRequestTypes from "../types/loginRequestTypes";
import AuthService from "../services/busines/AuthService";
import 'dotenv/config'


class AuthControllers {

    async registerGuest (req: Request, res: Response) {
        // if (process.env.IS_TEST_CLIENT_REQUEST && process.env.IS_TEST_CLIENT_REQUEST === "true") {
        //     console.log("Тест запроса от клиента registerGuest")
        //     return res.status(201).send({guestToken: "guestToken"});
        // }

        try {
            const guestToken: { guestToken: string } | undefined = await AuthService.getGuestToken();

            if (guestToken) {
                return res.status(201).send(guestToken);
            }
        } catch (error) {
            console.error(error)
            return res.status(500).send({error: "Неизвестная ошибка на сервере"});
        }
    }

    async registerUser (req: Request<registerRequestTypes>, res: Response) {
        try {
            const { name, email, password } = req.body;

            const regResponse: { error: string; } | { userToken: string; } | undefined = await AuthService.register(name, email, password)

            if (regResponse && "error" in regResponse) {
                return res.status(400).send(regResponse);
            } else if (regResponse && "userToken" in regResponse) {
                return res.status(201).send(regResponse);
            }

        } catch (error) {
            console.error(error)
            return res.status(500).send({error: "Неизвестная ошибка на сервере"});
        }
    }

    async loginUser (req: Request<loginRequestTypes>, res: Response) {
        try {
            const { name, password } = req.body;

            const loginResponse: { error: string; } | { userToken: string; } | undefined = await AuthService.login(name, password)

            if (loginResponse && "error" in loginResponse) {
                return res.status(400).send(loginResponse);
            } else if (loginResponse && "userToken" in loginResponse) {
                return res.status(200).send(loginResponse);
            }

        } catch (error) {
            console.error(error)
            return res.status(500).send({error: "Неизвестная ошибка на сервере"});
        }
    }
}

export default new AuthControllers();