import {RegistrationAction, RegistrationActionTypes} from "../../../types/logInRegistration/registration";
import {Dispatch} from "react";
import AuthService from "../../../api/AuthService";


export const registrationAction = (name: string, email: string, password: string) => {
    return async (dispatch: Dispatch<RegistrationAction>) => {
        try {
            dispatch({type: RegistrationActionTypes.REGISTRATION})
            const response = await AuthService.registerRequest(name, email, password);
            dispatch({type: RegistrationActionTypes.REGISTRATION_SUCCESS, payload: response.data.userToken})
        } catch (e) {
            if (e instanceof Error) {
                dispatch({
                    type: RegistrationActionTypes.REGISTRATION_ERROR,
                    payload: `${e.message}`
                })
            }
        }
    }
}

export const defReg = () => {
    return async (dispatch: Dispatch<RegistrationAction>) => {
        dispatch({type: RegistrationActionTypes.DEF_REG})
    }
}