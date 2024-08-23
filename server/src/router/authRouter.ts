import { Router } from 'express';
import AuthController from "../controllers/AuthController";

const authRouter = Router();

authRouter.post('/guest', AuthController.registerGuest);
authRouter.post('/register', AuthController.registerUser);
authRouter.post('/login', AuthController.loginUser);

export default authRouter;
