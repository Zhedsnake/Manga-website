import {Request, Response} from "express";
import EditUserInfoService from "../services/busines/EditUserInfoService";


class EditUserInfoController {
    async EditUserNameByToken(req: Request, res: Response) {
        try {
            const userId: string = req.headers['user-id'] as string;
            const userName: string = req.body.name as string;

            if (!userName) {
                res.status(400).send({error: "Не указано имя"})
            }

            const updates = {name: userName}

            const userInfoResponse: {  message: string } | { error: string } = await EditUserInfoService.EditUserNameByToken(userId, updates);

            if ( "message" in userInfoResponse) {
                return res.status(200).send(userInfoResponse);
            } else if ( "error" in userInfoResponse) {
                return res.status(400).send(userInfoResponse);
            }

        } catch (error) {
            console.error(error)
            return res.status(500).send({error: "Неизвестная ошибка на сервере"});
        }
    }

    async EditUserEmailByToken(req: Request, res: Response) {
        try {
            const userId: string = req.headers['user-id'] as string;
            const userEmail: string = req.body.email as string;

            if (!userEmail) {
                res.status(400).send({error: "Не указано имя"})
            }

            const updates = {email: userEmail}

            const userInfoResponse: {  message: string } | { error: string } = await EditUserInfoService.EditUserEmailByToken(userId, updates);

            if ( "message" in userInfoResponse) {
                return res.status(200).send(userInfoResponse);
            } else if ( "error" in userInfoResponse) {
                return res.status(400).send(userInfoResponse);
            }

        } catch (error) {
            console.error(error)
            return res.status(500).send({error: "Неизвестная ошибка на сервере"});
        }
    }

    async EditUserPasswordByToken(req: Request, res: Response) {
        try {
            const userId: string = req.headers['user-id'] as string;
            const userOldPassword: string = req.body.oldPassword as string;
            const userNewPassword: string = req.body.newPassword as string;

            if (!userOldPassword) {
                res.status(400).send({error: "Не указан старый пароль"})
            }

            if (!userNewPassword) {
                res.status(400).send({error: "Не указан новый пароль"})
            }

            const updates = {password: userNewPassword}

            const userInfoResponse = await EditUserInfoService.EditUserPasswordByToken(userId, userOldPassword, updates);

            if ( userInfoResponse && "message" in userInfoResponse) {
                return res.status(200).send(userInfoResponse);
            } else if ( userInfoResponse && "error" in userInfoResponse) {
                return res.status(400).send(userInfoResponse);
            }

        } catch (error) {
            console.error(error)
            return res.status(500).send({error: "Неизвестная ошибка на сервере"});
        }
    }

    async EditUserAvatarByToken(req: Request, res: Response) {
        try {
            const userId: string = req.headers['user-id'] as string;
            const userAvatar = req.files;

            if (!userAvatar || userAvatar.length === 0) {
                return res.status(400).send({message: 'Файл не загружен'});
            }

            if (Array.isArray(userAvatar) && userAvatar.length > 1) {
                return res.status(400).send({message: 'Вы загрузили больше одного файла'});
            }

            const userInfoResponse: { message: string }| { error: string } | undefined = await EditUserInfoService.EditUserAvatarByToken(userId, { file: userAvatar as Express.Multer.File[] });

            if ( userInfoResponse && "message" in userInfoResponse) {
                return res.status(200).send(userInfoResponse);
            }

        } catch (error) {
            console.error(error)
            return res.status(500).send({error: "Неизвестная ошибка на сервере"});
        }
    }
}

export default new EditUserInfoController();