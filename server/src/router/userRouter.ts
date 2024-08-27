import { Router } from 'express';
import UserControllers from "../controllers/UserControllers";
import ProtectService from "../middlewares/ProtectService";

const userRouter = Router();

userRouter.get('/update-user-token', ProtectService.checkUserToken, UserControllers.UpdateUserToken);
userRouter.get('/user-small-info-by-token', ProtectService.checkUserToken, UserControllers.GetSmallUserInfoByToken);
userRouter.get('/user-info-by-token', ProtectService.checkUserToken, UserControllers.GetUserInfoByToken);
userRouter.put('/edit-user-name-by-token', ProtectService.checkUserToken, UserControllers.EditUserNameByToken);
userRouter.put('/edit-user-email-by-token', ProtectService.checkUserToken, UserControllers.EditUserEmailByToken);

export default userRouter;
