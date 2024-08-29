import {combineReducers} from "@reduxjs/toolkit";
import {getGuestTokenReducer} from "./getGuestTokenReducer.ts";
import {authFormReducer} from "./authFormReducer.ts";
import {registrationReducer} from "./logIn-Registration/registrationReducer.ts";
import {logInReducer} from "./logIn-Registration/logInReducer.ts";
import {updateUserTokenReducer} from "./updateUserTokenReducer.ts";
import {getSmallUserInfoByTokenReducer} from "./getSmallUserInfoByTokenReducer.ts";
import {getUserInfoByTokenReducer} from "./getUserInfoByTokenReducer.ts";
import {nameFormReducer} from "./editUserInfo/nameFormReducer.ts";


export const rootReducer = combineReducers({
    getGuestToken: getGuestTokenReducer,
    logIn: logInReducer,
    registration: registrationReducer,
    authForm: authFormReducer,
    getSmallUserInfoByToken: getSmallUserInfoByTokenReducer,
    updateUserToken: updateUserTokenReducer,
    getUserInfoByToken: getUserInfoByTokenReducer,
    nameForm: nameFormReducer
})

export type RootState = ReturnType<typeof rootReducer>
