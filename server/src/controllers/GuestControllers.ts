import { Request, Response } from "express";
import GuestService from "../services/busines/GuestService";


class GuestControllers {

    // async removeGuest (req: Request, res: Response) {
    //     const guestToken = req.headers['guest-token'] as string | undefined;
    //
    //     if (guestToken) {
    //         await GuestService.removeGuest(guestToken);
    //     }
    // }
}

export default new GuestControllers();