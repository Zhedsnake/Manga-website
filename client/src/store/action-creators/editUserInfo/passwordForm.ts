
import {Dispatch} from "redux";
import EditUserInfoService from "../../../api/EditUserInfoService.ts";
import {PasswordAction, PasswordActionTypes} from "../../../types/editUserInfo/passwordForm.ts";

export const editPassword = (oldPassword: string, newPassword: string) => {
    return async (dispatch: Dispatch<PasswordAction>) => {
        try {
            dispatch({type: PasswordActionTypes.EDIT_PASSWORD})
            const response = await EditUserInfoService.editPasswordRequest(oldPassword, newPassword)
            dispatch({type: PasswordActionTypes.EDIT_PASSWORD_SUCCESS, payload: response.data.message})
        } catch (e) {
            dispatch({
                type: PasswordActionTypes.EDIT_PASSWORD_ERROR,
                payload: e.response.data.error
            })
        }
    }
}
export const defEditPassword = () => {
    return (dispatch: Dispatch<PasswordAction>) => {
        dispatch({type: PasswordActionTypes.DEF_EDIT_PASSWORD})
    }
}
