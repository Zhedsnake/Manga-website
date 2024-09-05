import {Dispatch} from "react";
import {AuthFormAction, AuthFormActionTypes} from "../../../types/authForm/authForm.ts";


export const setNameAction = (name: string) => {
    return async (dispatch: Dispatch<AuthFormAction>) => {
        dispatch({type: AuthFormActionTypes.NAME, payload: name})
    }
}
export const setEmailAction = (email: string) => {
    return async (dispatch: Dispatch<AuthFormAction>) => {
        dispatch({type: AuthFormActionTypes.EMAIL, payload: email})
    }
}
export const setPasswordAction = (password: string) => {
    return async (dispatch: Dispatch<AuthFormAction>) => {
        dispatch({type: AuthFormActionTypes.PASSWORD, payload: password})
    }
}
export const setDefInputs = () => {
    return async (dispatch: Dispatch<AuthFormAction>) => {
        dispatch({type: AuthFormActionTypes.DEF_AUTH_FORM})
    }
}

