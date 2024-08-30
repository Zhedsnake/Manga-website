import {combineReducers} from "@reduxjs/toolkit";
import {getGuestTokenReducer} from "./getGuestTokenReducer.ts";
import {authFormReducer} from "./authFormReducer.ts";
import {registrationReducer} from "./logIn-Registration/registrationReducer.ts";
import {logInReducer} from "./logIn-Registration/logInReducer.ts";
import {updateUserTokenReducer} from "./updateUserTokenReducer.ts";
import {getSmallUserInfoByTokenReducer} from "./getSmallUserInfoByTokenReducer.ts";
import {getUserInfoByTokenReducer} from "./getUserInfoByTokenReducer.ts";
import {nameFormReducer} from "./editUserInfo/nameFormReducer.ts";
import {emailFormReducer} from "./editUserInfo/emailFormReducer.ts";
import {passwordFormReducer} from "./editUserInfo/passwordFormReducer.ts";
import {avatarFormReducer} from "./editUserInfo/avatarFormReducer.ts";


export const rootReducer = combineReducers({
    getGuestToken: getGuestTokenReducer,
    logIn: logInReducer,
    registration: registrationReducer,
    authForm: authFormReducer,
    getSmallUserInfoByToken: getSmallUserInfoByTokenReducer,
    updateUserToken: updateUserTokenReducer,
    getUserInfoByToken: getUserInfoByTokenReducer,
    nameForm: nameFormReducer,
    emailForm: emailFormReducer,
    passwordForm: passwordFormReducer,
    avatarForm: avatarFormReducer,
})

export type RootState = ReturnType<typeof rootReducer>
