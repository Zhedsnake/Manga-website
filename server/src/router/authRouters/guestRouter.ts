import { Router } from 'express';
import GuestController from "../../controllers/GuestController";

const guestRouter = Router();

guestRouter.get('/get-guest-token', GuestController.getGuestToken);

export default guestRouter;
