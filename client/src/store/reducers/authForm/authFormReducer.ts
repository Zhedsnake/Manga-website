import {AuthFormAction, AuthFormActionTypes, AuthFormState} from "../../../types/authForm/authForm.ts";

const defLogReg = {
    name: '',
    email: '',
    password: '',
};

const initialState: AuthFormState = {...defLogReg}


export const authFormReducer = (state = initialState, action: AuthFormAction): AuthFormState => {
    switch (action.type) {
        case AuthFormActionTypes.NAME:
            return {...state, name: action.payload}
        case AuthFormActionTypes.EMAIL:
            return {...state, email: action.payload}
        case AuthFormActionTypes.PASSWORD:
            return {...state, password: action.payload}
        case AuthFormActionTypes.DEF_AUTH_FORM:
            return {...initialState}
        default:
            return state;
    }
};
