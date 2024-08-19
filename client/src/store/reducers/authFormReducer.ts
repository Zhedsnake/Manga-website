import {AuthFormAction, AuthFormActionTypes, AuthFormState} from "../../types/authForm.ts";

const defLogReg = {
    name: '',
    email: '',
    password: '',
};
const defConfirmPassword = { confPassword: ''};
const defLogRegErrors = {
    nameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
};

const initialState: AuthFormState = {...defLogReg, ...defConfirmPassword, ...defLogRegErrors}


export const authFormReducer = (state = initialState, action: AuthFormAction): AuthFormState => {
    switch (action.type) {
        case AuthFormActionTypes.NAME:
            return {...state, name: action.payload}
        case AuthFormActionTypes.NAME_ERROR:
            return {...state, nameError: action.payload}
        case AuthFormActionTypes.EMAIL:
            return {...state, email: action.payload}
        case AuthFormActionTypes.EMAIL_ERROR:
            return {...state, emailError: action.payload}
        case AuthFormActionTypes.PASSWORD:
            return {...state, password: action.payload}
        case AuthFormActionTypes.PASSWORD_ERROR:
            return {...state, passwordError: action.payload}
        case AuthFormActionTypes.CONF_PASSWORD:
            return {...state, confPassword: action.payload}
        case AuthFormActionTypes.CONF_PASSWORD_ERROR:
            return {...state, confirmPasswordError: action.payload}
        case AuthFormActionTypes.DEF_AUTH_FORM:
            return {...state, ...initialState}
        default:
            return state;
    }
};
