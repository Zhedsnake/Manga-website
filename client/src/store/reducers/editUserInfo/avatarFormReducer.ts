import {AvatarAction, AvatarActionTypes, EditAvatarState} from "../../../types/editUserInfo/avatarForm.ts";

const initialState: EditAvatarState = {
    message: "",
    loading: false,
    error: null
}

export const avatarFormReducer = (state = initialState, action: AvatarAction): EditAvatarState => {
    switch (action.type) {
        case AvatarActionTypes.EDIT_AVATAR:
            return { message: "", loading: true, error: null }
        case AvatarActionTypes.EDIT_AVATAR_SUCCESS:
            return { message: action.payload, loading: false, error: null }
        case AvatarActionTypes.EDIT_AVATAR_ERROR:
            return { message: "", loading: false, error: action.payload }
        case AvatarActionTypes.DEF_EDIT_AVATAR:
            return { ...initialState }
        default:
            return state
    }
}
