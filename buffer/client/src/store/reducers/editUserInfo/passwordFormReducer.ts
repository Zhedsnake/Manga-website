import {EditPasswordState, PasswordAction, PasswordActionTypes} from "../../../types/editUserInfo/passwordForm.ts";

const initialState: EditPasswordState = {
    message: "",
    loading: false,
    error: null
}

export const passwordFormReducer = (state = initialState, action: PasswordAction): EditPasswordState => {
    switch (action.type) {
        case PasswordActionTypes.EDIT_PASSWORD:
            return { message: "", loading: true, error: null }
        case PasswordActionTypes.EDIT_PASSWORD_SUCCESS:
            return { message: action.payload, loading: false, error: null }
        case PasswordActionTypes.EDIT_PASSWORD_ERROR:
            return { message: "", loading: false, error: action.payload }
        case PasswordActionTypes.DEF_EDIT_PASSWORD:
            return { ...initialState }
        default:
            return state
    }
}
