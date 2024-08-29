import {NameAction, NameActionTypes} from "../../../types/editUserInfo/nameForm.ts";

import {Dispatch} from "redux";
import EditUserInfoService from "../../../api/EditUserInfoService.ts";

export const editName = (name: string) => {
    return async (dispatch: Dispatch<NameAction>) => {
        try {
            dispatch({type: NameActionTypes.EDIT_NAME})
            const response = await EditUserInfoService.editNameRequest(name)
            dispatch({type: NameActionTypes.EDIT_NAME_SUCCESS, payload: response.data.message})
        } catch (e) {
            dispatch({
                type: NameActionTypes.EDIT_NAME_ERROR,
                payload: e.response.data.error
            })
        }
    }
}
export const defEditName = () => {
    return (dispatch: Dispatch<NameAction>) => {
        dispatch({type: NameActionTypes.DEF_EDIT_NAME})
    }
}
