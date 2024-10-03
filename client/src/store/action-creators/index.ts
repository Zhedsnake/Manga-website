import * as GuestActionCreators from "./getGuestToken";
import * as RegistrationActionCreators from "./logIn-Registration/registraion";
import * as LogInActionCreators from "./logIn-Registration/logIn";
import * as getSmallUserInfoByToken from "./getSmallUserInfoByToken";
import * as updateUserToken from "./updateUserToken";
import * as getUserInfoByToken from "./getUserInfoByToken";
import * as nameForm from "./editUserInfo/nameForm";
import * as emailForm from "./editUserInfo/emailForm";
import * as passwordForm from "./editUserInfo/passwordForm";
import * as avatarForm from "./editUserInfo/avatarForm";

export default {
    ...GuestActionCreators,
    ...RegistrationActionCreators,
    ...LogInActionCreators,
    ...getSmallUserInfoByToken,
    ...updateUserToken,
    ...getUserInfoByToken,
    ...nameForm,
    ...emailForm,
    ...passwordForm,
    ...avatarForm
}
