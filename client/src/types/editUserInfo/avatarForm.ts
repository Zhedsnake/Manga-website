export interface EditAvatarState {
    message: string;
    loading: boolean;
    error: null | string;
}
export enum AvatarActionTypes {
    EDIT_AVATAR = 'EDIT_AVATAR',
    EDIT_AVATAR_SUCCESS = 'EDIT_AVATAR_SUCCESS',
    EDIT_AVATAR_ERROR = 'EDIT_AVATAR_ERROR',
    DEF_EDIT_AVATAR = 'DEF_EDIT_AVATAR'
}
interface EditEmailAction {
    type: AvatarActionTypes.EDIT_AVATAR;
}
interface EditAvatarSuccessAction {
    type: AvatarActionTypes.EDIT_AVATAR_SUCCESS;
    payload: string
}
interface EditAvatarErrorAction {
    type: AvatarActionTypes.EDIT_AVATAR_ERROR;
    payload: string;
}
interface DefAvatarAction {
    type: AvatarActionTypes.DEF_EDIT_AVATAR;
}
export type AvatarAction = EditEmailAction | EditAvatarSuccessAction | EditAvatarErrorAction | DefAvatarAction
