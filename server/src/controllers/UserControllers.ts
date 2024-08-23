import {Request, Response} from "express";
import UserService from "../services/busines/UserService";
import registerRequestTypes from "../types/registerRequestTypes";
import loginRequestTypes from "../types/loginRequestTypes";


class UserControllers {

    async GetSmallUserInfoByToken(req: Request, res: Response) {
        const userToken: string | undefined = req.headers['user-token'] as string | undefined;

        if (userToken) {
            const userInfoResponse:
                { error: string }
                | { name: string, pic: string }
                | undefined = await UserService.GetSmallUserInfoByToken(userToken);

            if (userInfoResponse) {
                if ("name" in userInfoResponse && "pic" in userInfoResponse) {
                    res.status(200).send(userInfoResponse);
                } else if ("error" in userInfoResponse) {
                    res.status(400).send(userInfoResponse);
                }
            } else if (!userInfoResponse) {
                res.status(500).send({ error: "Неизвестная ошибка на сервере" });
            }
        } else {
            res.status(400).send({ error: 'Нет user-token' });
        }
    }
}

export default new UserControllers();