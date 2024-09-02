export interface GetSmallUserInfoState {
    data:  {
        name: string,
        pic: string
    } |
        {
            name: string,
            minPicWebp: string
        };
    loading: boolean;
    error: null | string;
}

export enum GetSmallUserInfoActionTypes {
    SMALL_USER_INFO = 'SMALL_USER_INFO',
    SMALL_USER_INFO_SUCCESS = 'SMALL_USER_INFO_SUCCESS',
    SMALL_USER_INFO_ERROR = 'SMALL_USER_INFO_ERROR',
    DEF_SMALL_USER_INFO = 'DEF_SMALL_USER_INFO'
}

interface SmallUserInfoAction {
    type: GetSmallUserInfoActionTypes.SMALL_USER_INFO;
}

interface SmallUserInfoSuccessAction {
    type: GetSmallUserInfoActionTypes.SMALL_USER_INFO_SUCCESS;
    payload: {
            name: string,
            pic: string
        }
        | {
            name: string,
            minPicWebp: string
        }
}

interface SmallUserInfoErrorAction {
    type: GetSmallUserInfoActionTypes.SMALL_USER_INFO_ERROR;
    payload: string;
}

interface DefSmallUserInfoAction {
    type: GetSmallUserInfoActionTypes.DEF_SMALL_USER_INFO;
}

export type GetSmallUserInfoAction = SmallUserInfoAction | SmallUserInfoSuccessAction | SmallUserInfoErrorAction | DefSmallUserInfoAction
