export interface UpdateUserTokenState {
    userToken: string;
    loading: boolean;
    error: null | string;
}

export enum UpdateUserTokenActionTypes {
    UPDATE_USER_TOKEN = 'UPDATE_USER_TOKEN',
    UPDATE_USER_TOKEN_SUCCESS = 'UPDATE_USER_TOKEN_SUCCESS',
    UPDATE_USER_TOKEN_ERROR = 'UPDATE_USER_TOKEN_ERROR',
    DEF_UPDATE_USER_TOKEN = 'DEF_UPDATE_USER_TOKEN'
}

interface GetUpdateUserTokenAction {
    type: UpdateUserTokenActionTypes.UPDATE_USER_TOKEN;
}

interface UpdateUserTokenSuccessAction {
    type: UpdateUserTokenActionTypes.UPDATE_USER_TOKEN_SUCCESS;
    payload: string
}

interface UpdateUserTokenErrorAction {
    type: UpdateUserTokenActionTypes.UPDATE_USER_TOKEN_ERROR;
    payload: string;
}

interface DefUpdateUserTokenAction {
    type: UpdateUserTokenActionTypes.DEF_UPDATE_USER_TOKEN;
}

export type UpdateUserTokenAction = GetUpdateUserTokenAction | UpdateUserTokenSuccessAction | UpdateUserTokenErrorAction | DefUpdateUserTokenAction
