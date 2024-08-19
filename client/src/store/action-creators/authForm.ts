import {Dispatch} from "react";
import {AuthFormAction, AuthFormActionTypes} from "../../types/authForm.ts";


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
export const setConfirmPasswordAction = (confirmPassword: string) => {
    return async (dispatch: Dispatch<AuthFormAction>) => {
        dispatch({type: AuthFormActionTypes.CONF_PASSWORD, payload: confirmPassword})
    }
}
export const setNameErrorAction = (nameError: string) => {
    return async (dispatch: Dispatch<AuthFormAction>) => {
        dispatch({type: AuthFormActionTypes.NAME_ERROR, payload: nameError})
    }
}
export const setEmailErrorAction = (emailError: string) => {
    return async (dispatch: Dispatch<AuthFormAction>) => {
        dispatch({type: AuthFormActionTypes.EMAIL_ERROR, payload: emailError})
    }
}
export const setPasswordErrorAction = (passwordError: string) => {
    return async (dispatch: Dispatch<AuthFormAction>) => {
        dispatch({type: AuthFormActionTypes.PASSWORD_ERROR, payload: passwordError})
    }
}
export const setConfirmPasswordErrorAction = (confirmPasswordError: string) => {
    return async (dispatch: Dispatch<AuthFormAction>) => {
        dispatch({type: AuthFormActionTypes.CONF_PASSWORD_ERROR, payload: confirmPasswordError})
    }
}
export const setDefInputs = () => {
    return async (dispatch: Dispatch<AuthFormAction>) => {
        dispatch({type: AuthFormActionTypes.DEF_AUTH_FORM})
    }
}

