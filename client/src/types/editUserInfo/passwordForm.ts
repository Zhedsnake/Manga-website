export interface EditPasswordState {
    message: string;
    loading: boolean;
    error: null | string;
}
export enum PasswordActionTypes {
    EDIT_PASSWORD = 'EDIT_PASSWORD',
    EDIT_PASSWORD_SUCCESS = 'EDIT_PASSWORD_SUCCESS',
    EDIT_PASSWORD_ERROR = 'EDIT_PASSWORD_ERROR',
    DEF_EDIT_PASSWORD = 'DEF_EDIT_PASSWORD'
}
interface EditPasswordAction {
    type: PasswordActionTypes.EDIT_PASSWORD;
}
interface EditPasswordSuccessAction {
    type: PasswordActionTypes.EDIT_PASSWORD_SUCCESS;
    payload: string
}
interface EditPasswordErrorAction {
    type: PasswordActionTypes.EDIT_PASSWORD_ERROR;
    payload: string;
}
interface DefPasswordAction {
    type: PasswordActionTypes.DEF_EDIT_PASSWORD;
}
export type PasswordAction = EditPasswordAction | EditPasswordSuccessAction | EditPasswordErrorAction | DefPasswordAction
