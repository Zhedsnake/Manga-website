import {Request, Response} from "express";
import UserService from "../services/busines/UserService";
import registerRequestTypes from "../types/registerRequestTypes";
import loginRequestTypes from "../types/loginRequestTypes";


class UserControllers {
    async GetSmallUserInfoByToken(req: Request, res: Response) {
        try {
            const userId: string = req.headers['user-id'] as string;

            const userInfoResponse:
                { name: string, pic: string }
                | undefined = await UserService.GetSmallUserInfoByToken(userId);

            if (userInfoResponse) {
                return res.status(200).send(userInfoResponse);
            }
        } catch (error) {
            console.error(error)
            return res.status(500).send({error: "Неизвестная ошибка на сервере"});
        }
    }

    async UpdateUserToken(req: Request, res: Response) {
        try {
            const userId: string = req.headers['user-id'] as string;

            const userInfoResponse: { userToken: string } = await UserService.UpdateUserToken(userId);

            if (userInfoResponse) {
                return res.status(200).send(userInfoResponse);
            }
        } catch (error) {
            console.error(error)
            return res.status(500).send({error: "Неизвестная ошибка на сервере"});
        }
    }
}

export default new UserControllers();