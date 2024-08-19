
export interface AuthFormState {
    name: string,
    email: string,
    password: string,
    confPassword: string,
    nameError: string,
    emailError: string,
    passwordError: string,
    confirmPasswordError: string,
}
export enum AuthFormActionTypes {
    NAME = 'NAME',
    EMAIL = 'EMAIL',
    PASSWORD = 'PASSWORD',
    CONF_PASSWORD = 'CONF_PASSWORD',
    NAME_ERROR = 'NAME_ERROR_PASSWORD',
    EMAIL_ERROR = 'EMAIL_ERROR_PASSWORD,',
    PASSWORD_ERROR = 'PASSWORD_ERROR_PASSWORD,',
    CONF_PASSWORD_ERROR = 'CONF_PASSWORD_ERROR_PASSWORD,',
    DEF_AUTH_FORM= 'DEF_AUTH_FORM',
}
interface SetNameAction {
    type: AuthFormActionTypes.NAME;
    payload: string;
}
interface SetEmailAction {
    type: AuthFormActionTypes.EMAIL;
    payload: string;
}
interface SetPasswordAction {
    type: AuthFormActionTypes.PASSWORD;
    payload: string;
}
interface SetConfPasswordAction {
    type: AuthFormActionTypes.CONF_PASSWORD;
    payload: string;
}
interface SetNameErrorAction {
    type: AuthFormActionTypes.NAME_ERROR;
    payload: string;
}
interface SetEmailErrorAction {
    type: AuthFormActionTypes.EMAIL_ERROR;
    payload: string;
}
interface SetPasswordErrorAction {
    type: AuthFormActionTypes.PASSWORD_ERROR;
    payload: string;
}
interface SetConfirmPasswordErrorAction {
    type: AuthFormActionTypes.CONF_PASSWORD_ERROR;
    payload: string;
}
interface CleanAuthFormReducerAction {
    type: AuthFormActionTypes.DEF_AUTH_FORM
}
export type AuthFormAction =
    CleanAuthFormReducerAction |
    SetNameAction |
    SetEmailAction |
    SetPasswordAction |
    SetConfPasswordAction |
    SetNameErrorAction |
    SetEmailErrorAction |
    SetPasswordErrorAction |
    SetConfirmPasswordErrorAction ;
