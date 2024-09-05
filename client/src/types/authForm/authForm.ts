
export interface ToggleShowType {
    toggleShowPassword: boolean;
    toggleShowConfirmPassword: boolean;
}
export interface AuthFormState {
    name: string,
    email: string,
    password: string,
}
export enum AuthFormActionTypes {
    NAME = 'NAME',
    EMAIL = 'EMAIL',
    PASSWORD = 'PASSWORD',
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
interface CleanAuthFormReducerAction {
    type: AuthFormActionTypes.DEF_AUTH_FORM
}
export type AuthFormAction =
    CleanAuthFormReducerAction |
    SetNameAction |
    SetEmailAction |
    SetPasswordAction ;
