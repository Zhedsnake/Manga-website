import { Router } from 'express';
import guestController from "../../controllers/guestController";

const guestRouter = Router();

guestRouter.get('/create-guest', guestController.createGuest);

export default guestRouter;
