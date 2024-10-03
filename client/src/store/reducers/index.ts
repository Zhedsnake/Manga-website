import {combineReducers} from "@reduxjs/toolkit";
import emailFormReducer from "./editUserInfo/emailFormSlice.ts";
import LogInSlice from "./logIn-Registration/logInSlice.ts";
import registrationSlice from "./logIn-Registration/registrationSlice.ts";
import avatarFormSlice from "./editUserInfo/avatarFormSlice.ts";
import nameFormSlice from "./editUserInfo/nameFormSlice.ts";
import passwordFormSlice from "./editUserInfo/passwordFormSlice.ts";
import authFormSlice from "./authForm/authFormSlice.ts";
import authFormErrorSlice from "./authForm/authFormErrorSlice.ts";

import getGuestTokenSlice from "./getGuestTokenSlice.ts";
import getSmallUserInfoByTokenSlice from "./getSmallUserInfoByTokenSlice.ts";
import updateUserTokenSlice from "./updateUserTokenSlice.ts";
import getUserInfoByTokenSlice from "./getUserInfoByTokenSlice.ts";


export const rootReducer = combineReducers({
    logIn: LogInSlice,
    registration: registrationSlice,

    avatarForm: avatarFormSlice,
    nameForm: nameFormSlice,
    emailForm: emailFormReducer,
    passwordForm: passwordFormSlice,

    authForm: authFormSlice,
    authFormError: authFormErrorSlice,

    getGuestToken: getGuestTokenSlice,
    getSmallUserInfoByToken: getSmallUserInfoByTokenSlice,
    updateUserToken: updateUserTokenSlice,
    getUserInfoByToken: getUserInfoByTokenSlice,
})

export type RootState = ReturnType<typeof rootReducer>
