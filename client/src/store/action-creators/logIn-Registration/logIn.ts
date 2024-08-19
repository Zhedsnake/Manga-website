import {Dispatch} from "react";
import {LogInAction, LogInActionTypes} from "../../../types/logInRegistration/logIn";
import AuthService from "../../../api/AuthService";


export const logInAction = (name: string, email: string, password: string) => {
    return async (dispatch: Dispatch<LogInAction>) => {
        try {
            dispatch({type: LogInActionTypes.LOG_IN})
            const response = await AuthService.logInRequest(name, email, password);
            dispatch({type: LogInActionTypes.LOG_IN_SUCCESS, payload: response.data.userToken})
        } catch (e) {
            if (e instanceof Error) {
                dispatch({
                    type: LogInActionTypes.LOG_IN_ERROR,
                    payload: `${e.message}`
                })
            }
        }
    }
}

export const defLogIn = () => {
    return async (dispatch: Dispatch<LogInAction>) => {
        dispatch({type: LogInActionTypes.DEF_LOG_IN})
    }
}