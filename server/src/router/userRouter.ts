import { Router } from 'express';
import userController from "../controllers/UserControllers";
import UserControllers from "../controllers/UserControllers";

const userRouter = Router();

userRouter.get('/user-small-info-by-token', UserControllers.GetSmallUserInfoByToken);
userRouter.get('/update-user-token', UserControllers.UpdateUserToken);

export default userRouter;
