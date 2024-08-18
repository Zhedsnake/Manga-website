import { Request, Response } from "express";
import GuestService from "../services/busines/GuestService";


class GuestController {
    async getGuestToken (req: Request, res: Response) {
        const guestToken: string = await GuestService.getGuestToken();
        res.status(200).send(guestToken);
    }
}

export default new GuestController();