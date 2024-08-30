import * as GuestActionCreators from "./guest.ts";
import * as RegistrationActionCreators from "./logIn-Registration/registraion.ts";
import * as LogInActionCreators from "./logIn-Registration/logIn.ts";
import * as AuthFormActions from "./authForm.ts";
import * as getSmallUserInfoByToken from "./getSmallUserInfoByToken.ts";
import * as updateUserToken from "./updateUserToken.ts";
import * as getUserInfoByToken from "./getUserInfoByToken.ts";
import * as nameForm from "./editUserInfo/nameForm.ts";
import * as emailForm from "./editUserInfo/emailForm.ts";
import * as passwordForm from "./editUserInfo/passwordForm.ts";
import * as avatarForm from "./editUserInfo/avatarForm.ts";

export default {
    ...GuestActionCreators,
    ...RegistrationActionCreators,
    ...LogInActionCreators,
    ...AuthFormActions,
    ...getSmallUserInfoByToken,
    ...updateUserToken,
    ...getUserInfoByToken,
    ...nameForm,
    ...emailForm,
    ...passwordForm,
    ...avatarForm
}
