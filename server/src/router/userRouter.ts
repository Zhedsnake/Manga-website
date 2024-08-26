import { Router } from 'express';
import UserControllers from "../controllers/UserControllers";
import ProtectService from "../middlewares/ProtectService";

const userRouter = Router();

userRouter.get('/user-small-info-by-token', ProtectService.checkUserToken, UserControllers.GetSmallUserInfoByToken);
userRouter.get('/update-user-token', ProtectService.checkUserToken, UserControllers.UpdateUserToken);

export default userRouter;
