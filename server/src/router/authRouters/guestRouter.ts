import { Router } from 'express';
import GuestControllers from "../../controllers/GuestControllers";

const guestRouter = Router();

guestRouter.post('/guest', GuestControllers.registerGuest);
// guestRouter.delete('/guest', GuestControllers.removeGuest);

export default guestRouter;
