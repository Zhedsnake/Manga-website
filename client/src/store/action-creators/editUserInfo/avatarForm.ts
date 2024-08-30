import {Dispatch} from "redux";
import EditUserInfoService from "../../../api/EditUserInfoService.ts";
import {AvatarAction, AvatarActionTypes} from "../../../types/editUserInfo/avatarForm.ts";

export const editAvatar = (avatar) => {
    return async (dispatch: Dispatch<AvatarAction>) => {
        try {
            dispatch({type: AvatarActionTypes.EDIT_AVATAR})
            const response = await EditUserInfoService.editAvatarRequest(avatar)
            dispatch({type: AvatarActionTypes.EDIT_AVATAR_SUCCESS, payload: response.data.message})
        } catch (e) {
            dispatch({
                type: AvatarActionTypes.EDIT_AVATAR_ERROR,
                payload: e.response.data.error
            })
        }
    }
}
export const defEditAvatar = () => {
    return (dispatch: Dispatch<AvatarAction>) => {
        dispatch({type: AvatarActionTypes.DEF_EDIT_AVATAR})
    }
}
