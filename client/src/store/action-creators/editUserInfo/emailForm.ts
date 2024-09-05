import {Dispatch} from "redux";
import EditUserInfoService from "../../../api/EditUserInfoService.ts";
import {EmailAction, EmailActionTypes} from "../../../types/editUserInfo/emailForm.ts";

export const editEmail = (email: string) => {
    return async (dispatch: Dispatch<EmailAction>) => {
        dispatch({type: EmailActionTypes.EDIT_EMAIL})

        const response = await EditUserInfoService.editEmailRequest(email)

        if ("data" in response && "message" in response.data) {
            dispatch({type: EmailActionTypes.EDIT_EMAIL_SUCCESS, payload: response.data.message})

        } else if ("error" in response) {
            dispatch({
                type: EmailActionTypes.EDIT_EMAIL_ERROR,
                payload: response.error
            })
        }
    }
}
export const defEditEmail = () => {
    return (dispatch: Dispatch<EmailAction>) => {
        dispatch({type: EmailActionTypes.DEF_EDIT_EMAIL})
    }
}
