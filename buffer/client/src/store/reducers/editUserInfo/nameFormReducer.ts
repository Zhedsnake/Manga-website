import {EditNameState, NameAction, NameActionTypes} from "../../../types/editUserInfo/nameForm.ts";

const initialState: EditNameState = {
    message: "",
    loading: false,
    error: null
}

export const nameFormReducer = (state = initialState, action: NameAction): EditNameState => {
    switch (action.type) {
        case NameActionTypes.EDIT_NAME:
            return { message: "", loading: true, error: null }
        case NameActionTypes.EDIT_NAME_SUCCESS:
            return { message: action.payload, loading: false, error: null }
        case NameActionTypes.EDIT_NAME_ERROR:
            return { message: "", loading: false, error: action.payload }
        case NameActionTypes.DEF_EDIT_NAME:
            return { ...initialState }
        default:
            return state
    }
}
