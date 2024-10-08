export interface GetUserInfoState {
    name: string,
    email: string,
    pic: string,
    picWebp?: string,
    registeredAt: string
    birthday?: string
    loading: boolean;
    error: string;
}

export enum GetUserInfoActionTypes {
    USER_INFO = 'USER_INFO',
    USER_INFO_SUCCESS = 'USER_INFO_SUCCESS',
    USER_INFO_ERROR = 'USER_INFO_ERROR',
    DEF_USER_INFO = 'DEF_USER_INFO'
}

interface UserInfoAction {
    type: GetUserInfoActionTypes.USER_INFO;
}

interface UserInfoSuccessAction {
    type: GetUserInfoActionTypes.USER_INFO_SUCCESS;
    payload: {
        name: string,
        email: string,
        pic: string,
        registeredAt: string,
        birthday: string
    }
}

interface UserInfoErrorAction {
    type: GetUserInfoActionTypes.USER_INFO_ERROR;
    payload: string;
}

interface DefUserInfoAction {
    type: GetUserInfoActionTypes.DEF_USER_INFO;
}

export type GetUserInfoAction = UserInfoAction | UserInfoSuccessAction | UserInfoErrorAction | DefUserInfoAction
