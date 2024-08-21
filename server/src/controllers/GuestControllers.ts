import { Request, Response } from "express";
import GuestService from "../services/busines/GuestService";


class GuestControllers {

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

    // async removeGuest (req: Request, res: Response) {
    //     const guestToken = req.headers['guest-token'] as string | undefined;
    //
    //     if (guestToken) {
    //         await GuestService.removeGuest(guestToken);
    //     }
    // }
}

export default new GuestControllers();