import { Router } from 'express';
import ProtectService from "../middlewares/ProtectService";
import {upload} from "../middlewares/multer";
import EditUserInfoController from "../controllers/EditUserInfoController";

const editUserRouter = Router();

editUserRouter.put('/edit-user-name-by-token', ProtectService.checkUserToken, EditUserInfoController.EditUserNameByToken);
editUserRouter.put('/edit-user-email-by-token', ProtectService.checkUserToken, EditUserInfoController.EditUserEmailByToken);
editUserRouter.put('/edit-user-password-by-token', ProtectService.checkUserToken, EditUserInfoController.EditUserPasswordByToken);
editUserRouter.put('/edit-user-avatar-by-token', ProtectService.checkUserToken, upload, EditUserInfoController.EditUserAvatarByToken);

export default editUserRouter;
