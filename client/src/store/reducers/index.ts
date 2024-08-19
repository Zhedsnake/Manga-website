import {combineReducers} from "@reduxjs/toolkit";
import {getGuestTokenReducer} from "./getGuestTokenReducer.ts";
import {authFormReducer} from "./authFormReducer.ts";
import {registrationReducer} from "./logIn-Registration/registrationReducer.ts";
import {logInReducer} from "./logIn-Registration/logInReducer.ts";


export const rootReducer = combineReducers({
    getGuestToken: getGuestTokenReducer,
    logIn: logInReducer,
    registration: registrationReducer,
    authForm: authFormReducer,
})

export type RootState = ReturnType<typeof rootReducer>
