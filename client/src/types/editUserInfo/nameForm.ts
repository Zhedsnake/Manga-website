export interface EditNameState {
    message: string;
    loading: boolean;
    error: null | string;
}
export enum NameActionTypes {
    EDIT_NAME = 'EDIT_NAME',
    EDIT_NAME_SUCCESS = 'EDIT_NAME_SUCCESS',
    EDIT_NAME_ERROR = 'EDIT_NAME_ERROR',
    DEF_EDIT_NAME = 'DEF_EDIT_NAME'
}
interface EditNameAction {
    type: NameActionTypes.EDIT_NAME;
}
interface EditNameSuccessAction {
    type: NameActionTypes.EDIT_NAME_SUCCESS;
    payload: string
}
interface EditNameErrorAction {
    type: NameActionTypes.EDIT_NAME_ERROR;
    payload: string;
}
interface DefNameAction {
    type: NameActionTypes.DEF_EDIT_NAME;
}
export type NameAction = EditNameAction | EditNameSuccessAction | EditNameErrorAction | DefNameAction
