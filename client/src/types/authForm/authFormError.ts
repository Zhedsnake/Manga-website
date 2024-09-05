
export interface AuthFormErrorState {
    nameError: string,
    emailError: string,
    passwordError: string,
}
export enum AuthFormErrorActionTypes {
    NAME_ERROR = 'NAME_ERROR_PASSWORD',
    EMAIL_ERROR = 'EMAIL_ERROR_PASSWORD,',
    PASSWORD_ERROR = 'PASSWORD_ERROR_PASSWORD,',
    DEF_AUTH_FORM_ERROR= 'DEF_AUTH_FORM_ERROR',
}
interface SetNameErrorAction {
    type: AuthFormErrorActionTypes.NAME_ERROR;
    payload: string;
}
interface SetEmailErrorAction {
    type: AuthFormErrorActionTypes.EMAIL_ERROR;
    payload: string;
}
interface SetPasswordErrorAction {
    type: AuthFormErrorActionTypes.PASSWORD_ERROR;
    payload: string;
}
interface CleanAuthFormErrorReducerAction {
    type: AuthFormErrorActionTypes.DEF_AUTH_FORM_ERROR
}
export type AuthFormErrorAction =
    CleanAuthFormErrorReducerAction |
    SetNameErrorAction |
    SetEmailErrorAction |
    SetPasswordErrorAction ;
