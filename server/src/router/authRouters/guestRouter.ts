import { Router } from 'express';
import GuestControllers from "../../controllers/GuestControllers";

const guestRouter = Router();

guestRouter.get('/get-guest-token', GuestControllers.getGuestToken);

export default guestRouter;
