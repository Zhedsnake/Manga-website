import { Router } from 'express';
import UserControllers from "../controllers/UserControllers";
import ProtectService from "../middlewares/ProtectService";

const userRouter = Router();

userRouter.get('/update-user-token', ProtectService.checkUserToken, UserControllers.UpdateUserToken);
userRouter.get('/user-small-info-by-token', ProtectService.checkUserToken, UserControllers.GetSmallUserInfoByToken);
userRouter.get('/user-info-by-token', ProtectService.checkUserToken, UserControllers.GetUserInfoByToken);

export default userRouter;
