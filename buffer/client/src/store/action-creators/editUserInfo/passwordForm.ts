
import {Dispatch} from "redux";
import EditUserInfoService from "../../../api/EditUserInfoService.ts";
import {PasswordAction, PasswordActionTypes} from "../../../types/editUserInfo/passwordForm.ts";

export const editPassword = (oldPassword: string, newPassword: string) => {
    return async (dispatch: Dispatch<PasswordAction>) => {
            dispatch({type: PasswordActionTypes.EDIT_PASSWORD})
            const response = await EditUserInfoService.editPasswordRequest(oldPassword, newPassword)

        if ("data" in response && "message" in response.data) {
            dispatch({type: PasswordActionTypes.EDIT_PASSWORD_SUCCESS, payload: response.data.message})
        } else if ("error" in response) {
            dispatch({
                type: PasswordActionTypes.EDIT_PASSWORD_ERROR,
                payload: response.error
            })
        }

    }
}
export const defEditPassword = () => {
    return (dispatch: Dispatch<PasswordAction>) => {
        dispatch({type: PasswordActionTypes.DEF_EDIT_PASSWORD})
    }
}
