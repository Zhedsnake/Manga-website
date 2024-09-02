import {Request, Response} from "express";
import UserService from "../services/busines/UserService";
import registerRequestTypes from "../types/registerRequestTypes";
import loginRequestTypes from "../types/loginRequestTypes";
import ImagesService from "../services/busines/ImagesService";
import userService from "../services/busines/UserService";


class UserControllers {
    async GetSmallUserInfoByToken(req: Request, res: Response) {
        try {
            const userId: string = req.headers['user-id'] as string;
            const webpTest: string = req.headers['webp-test'] as string;

            const userInfoResponse:
                { name: string, minPic?: string, pic?: string }
                | {error: string}
                | null
                | undefined
                    = await UserService.GetSmallUserInfoByToken(userId, webpTest);

            if (userInfoResponse && "name" in userInfoResponse && ("pic" in userInfoResponse || "minPicWebp" in userInfoResponse)) {
                return res.status(200).send(userInfoResponse);
            } else if (userInfoResponse && "error" in userInfoResponse) {
                return res.status(400).send(userInfoResponse);
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

    async GetUserInfoByToken(req: Request, res: Response) {
        try {
            const userId: string = req.headers['user-id'] as string;
            const webpTest: string = req.headers['webp-test'] as string;

            const userInfoResponse = await UserService.GetUserInfoByToken(userId, webpTest);

            if (userInfoResponse) {
                return res.status(200).send(userInfoResponse);
            } else if (userInfoResponse && "error" in userInfoResponse) {
                return res.status(400).send(userInfoResponse);
            }
        } catch (error) {
            console.error(error)
            return res.status(500).send({error: "Неизвестная ошибка на сервере"});
        }
    }
}

export default new UserControllers();