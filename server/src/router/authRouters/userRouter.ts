import { Router } from 'express';
import userController from "../../controllers/UserControllers";

const guestRouter = Router();

guestRouter.post('/register', userController.register);
guestRouter.post('/login', userController.login);

export default guestRouter;
