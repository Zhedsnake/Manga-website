import { Router } from 'express';
import UserControllers from "../controllers/UserControllers";
import ProtectService from "../middlewares/ProtectService";
import {upload} from "../middlewares/multer";

const editUserRouter = Router();

editUserRouter.put('/edit-user-name-by-token', ProtectService.checkUserToken, UserControllers.EditUserNameByToken);
editUserRouter.put('/edit-user-email-by-token', ProtectService.checkUserToken, UserControllers.EditUserEmailByToken);
editUserRouter.put('/edit-user-password-by-token', ProtectService.checkUserToken, UserControllers.EditUserPasswordByToken);
editUserRouter.put('/edit-user-avatar-by-token', ProtectService.checkUserToken, upload, UserControllers.EditUserAvatarByToken);

export default editUserRouter;
