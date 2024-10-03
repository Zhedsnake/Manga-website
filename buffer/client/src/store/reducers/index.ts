import {combineReducers} from "@reduxjs/toolkit";
import {getGuestTokenReducer} from "./getGuestTokenReducer.ts";
import {authFormReducer} from "./authForm/authFormReducer.ts";
import {registrationReducer} from "./logIn-Registration/registrationReducer.ts";
import {logInReducer} from "./logIn-Registration/logInReducer.ts";
import {updateUserTokenReducer} from "./updateUserTokenReducer.ts";
import {getSmallUserInfoByTokenReducer} from "./getSmallUserInfoByTokenReducer.ts";
import {getUserInfoByTokenReducer} from "./getUserInfoByTokenReducer.ts";
import {nameFormReducer} from "./editUserInfo/nameFormReducer.ts";
import {emailFormReducer} from "./editUserInfo/emailFormReducer.ts";
import {passwordFormReducer} from "./editUserInfo/passwordFormReducer.ts";
import {avatarFormReducer} from "./editUserInfo/avatarFormReducer.ts";
import {authFormErrorReducer} from "./authForm/authFormErrorReducer.ts";


export const rootReducer = combineReducers({
    logIn: logInReducer,
    registration: registrationReducer,

    authForm: authFormReducer,
    authFormError: authFormErrorReducer,

    getGuestToken: getGuestTokenReducer,
    getSmallUserInfoByToken: getSmallUserInfoByTokenReducer,
    updateUserToken: updateUserTokenReducer,
    getUserInfoByToken: getUserInfoByTokenReducer,

    avatarForm: avatarFormReducer,
    nameForm: nameFormReducer,
    emailForm: emailFormReducer,
    passwordForm: passwordFormReducer,
})

export type RootState = ReturnType<typeof rootReducer>
