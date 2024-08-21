import { Request, Response } from "express";
import GuestService from "../services/busines/auth/GuestService";


class GuestControllers {
    async getGuestToken (req: Request, res: Response) {
        const guestToken: string | undefined = await GuestService.getGuestToken();
        const tokenError = "Токен не сгенерировался";

        if (guestToken) {
            res.status(200).send(guestToken);
        } else if (!guestToken) {
            res.status(404).send(tokenError);
            throw new Error(tokenError);
        }
    }
}

export default new GuestControllers();