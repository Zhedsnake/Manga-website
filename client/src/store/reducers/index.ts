import {combineReducers} from "@reduxjs/toolkit";
import emailFormReducer from "./editUserInfo/emailFormSlice.ts";


export const rootReducer = combineReducers({
    emailForm: emailFormReducer,
})

export type RootState = ReturnType<typeof rootReducer>
