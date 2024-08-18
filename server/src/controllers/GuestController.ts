import { Request, Response } from "express";
import GuestService from "../services/busines/GuestService";


class GuestController {
    async getGuestToken (req: Request, res: Response) {
        const guestToken: string | undefined = await GuestService.getGuestToken();

        if (guestToken) {
            res.status(200).send(guestToken);
        } else if (!guestToken) {
            res.status(404).send("Токен не сгенерировался");
        }
    }
}

export default new GuestController();