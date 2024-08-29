export interface EditEmailState {
    message: string;
    loading: boolean;
    error: null | string;
}
export enum EmailActionTypes {
    EDIT_EMAIL = 'EDIT_EMAIL',
    EDIT_EMAIL_SUCCESS = 'EDIT_EMAIL_SUCCESS',
    EDIT_EMAIL_ERROR = 'EDIT_EMAIL_ERROR',
    DEF_EDIT_EMAIL = 'DEF_EDIT_EMAIL'
}
interface EditEmailAction {
    type: EmailActionTypes.EDIT_EMAIL;
}
interface EditEmailSuccessAction {
    type: EmailActionTypes.EDIT_EMAIL_SUCCESS;
    payload: string
}
interface EditEmailErrorAction {
    type: EmailActionTypes.EDIT_EMAIL_ERROR;
    payload: string;
}
interface DefEmailAction {
    type: EmailActionTypes.DEF_EDIT_EMAIL;
}
export type EmailAction = EditEmailAction | EditEmailSuccessAction | EditEmailErrorAction | DefEmailAction
