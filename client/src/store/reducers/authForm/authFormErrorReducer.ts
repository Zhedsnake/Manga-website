import {
    AuthFormErrorAction,
    AuthFormErrorActionTypes,
    AuthFormErrorState
} from "../../../types/authForm/authFormError.ts";

const initialState: AuthFormErrorState = {
    nameError: '',
    emailError: '',
    passwordError: '',
};

export const authFormErrorReducer = (state = initialState, action: AuthFormErrorAction): AuthFormErrorState => {
    switch (action.type) {
        case AuthFormErrorActionTypes.NAME_ERROR:
            return {...state, nameError: action.payload}
        case AuthFormErrorActionTypes.EMAIL_ERROR:
            return {...state, emailError: action.payload}
        case AuthFormErrorActionTypes.PASSWORD_ERROR:
            return {...state, passwordError: action.payload}
        case AuthFormErrorActionTypes.DEF_AUTH_FORM_ERROR:
            return {...initialState}
        default:
            return state;
    }
};
