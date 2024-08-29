import {EditEmailState, EmailAction, EmailActionTypes} from "../../../types/editUserInfo/emailForm.ts";

const initialState: EditEmailState = {
    message: "",
    loading: false,
    error: null
}

export const emailFormReducer = (state = initialState, action: EmailAction): EditEmailState => {
    switch (action.type) {
        case EmailActionTypes.EDIT_EMAIL:
            return { message: "", loading: true, error: null }
        case EmailActionTypes.EDIT_EMAIL_SUCCESS:
            return { message: action.payload, loading: false, error: null }
        case EmailActionTypes.EDIT_EMAIL_ERROR:
            return { message: "", loading: false, error: action.payload }
        case EmailActionTypes.DEF_EDIT_EMAIL:
            return { ...initialState }
        default:
            return state
    }
}
