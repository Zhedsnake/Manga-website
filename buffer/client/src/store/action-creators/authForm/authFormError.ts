import {Dispatch} from "react";
import {AuthFormErrorAction, AuthFormErrorActionTypes} from "../../../types/authForm/authFormError.ts";


export const setNameErrorAction = (nameError: string) => {
    return async (dispatch: Dispatch<AuthFormErrorAction>) => {
        dispatch({type: AuthFormErrorActionTypes.NAME_ERROR, payload: nameError})
    }
}
export const setEmailErrorAction = (emailError: string) => {
    return async (dispatch: Dispatch<AuthFormErrorAction>) => {
        dispatch({type: AuthFormErrorActionTypes.EMAIL_ERROR, payload: emailError})
    }
}
export const setPasswordErrorAction = (passwordError: string) => {
    return async (dispatch: Dispatch<AuthFormErrorAction>) => {
        dispatch({type: AuthFormErrorActionTypes.PASSWORD_ERROR, payload: passwordError})
    }
}
export const setDefErrorInputs = () => {
    return async (dispatch: Dispatch<AuthFormErrorAction>) => {
        dispatch({type: AuthFormErrorActionTypes.DEF_AUTH_FORM_ERROR})
    }
}

