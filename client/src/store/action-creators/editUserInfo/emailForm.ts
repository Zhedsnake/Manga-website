import {Dispatch} from "redux";
import EditUserInfoService from "../../../api/EditUserInfoService.ts";
import {EmailAction, EmailActionTypes} from "../../../types/editUserInfo/emailForm.ts";

export const editEmail = (email: string) => {
    return async (dispatch: Dispatch<EmailAction>) => {
        try {
            dispatch({type: EmailActionTypes.EDIT_EMAIL})
            const response = await EditUserInfoService.editEmailRequest(email)
            dispatch({type: EmailActionTypes.EDIT_EMAIL_SUCCESS, payload: response.data.message})
        } catch (e) {
            dispatch({
                type: EmailActionTypes.DEF_EDIT_EMAIL,
                payload: e.response.data.error
            })
        }
    }
}
export const defEditEmail = () => {
    return (dispatch: Dispatch<EmailAction>) => {
        dispatch({type: EmailActionTypes.DEF_EDIT_EMAIL})
    }
}
