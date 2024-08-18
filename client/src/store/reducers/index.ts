import {combineReducers} from "@reduxjs/toolkit";
import {getGuestTokenReducer} from "./getGuestTokenReducer.ts";


export const rootReducer = combineReducers({
    getGuestToken: getGuestTokenReducer
})

export type RootState = ReturnType<typeof rootReducer>
