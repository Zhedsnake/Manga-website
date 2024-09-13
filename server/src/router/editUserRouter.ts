import { Router } from 'express';
import ProtectService from "../middlewares/ProtectService";
import EditUserInfoController from "../controllers/EditUserInfoController";
import FileService from "../middlewares/FileService";

const editUserRouter = Router();
const fileService = new FileService();

editUserRouter.put('/edit-user-name-by-token', ProtectService.checkUserToken, EditUserInfoController.EditUserNameByToken);
editUserRouter.put('/edit-user-email-by-token', ProtectService.checkUserToken, EditUserInfoController.EditUserEmailByToken);
editUserRouter.put('/edit-user-password-by-token', ProtectService.checkUserToken, EditUserInfoController.EditUserPasswordByToken);

editUserRouter.put(
    '/edit-user-avatar-by-token',
    ProtectService.checkUserToken,
    fileService.uploadUserAvatar(),
    EditUserInfoController.EditUserAvatarByToken
);

export default editUserRouter;
