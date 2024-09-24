
export interface LogInState {
    logInToken: string,
    logInLoading: boolean,
    logInError: string,
}
export enum LogInActionTypes {
    LOG_IN = 'LOG_IN',
    LOG_IN_SUCCESS = 'LOG_IN_SUCCESS',
    LOG_IN_ERROR = 'LOG_IN_ERROR',
    DEF_LOG_IN= 'DEF_LOG_IN',
}
interface PostLogInAction {
    type: LogInActionTypes.LOG_IN;
}
interface PostLogInSuccessAction {
    type: LogInActionTypes.LOG_IN_SUCCESS;
    payload: string;
}
interface PostLogInErrorAction {
    type: LogInActionTypes.LOG_IN_ERROR;
    payload: string;
}
interface CleanLogInReducerAction {
    type: LogInActionTypes.DEF_LOG_IN
}
export type LogInAction = PostLogInAction | PostLogInSuccessAction | PostLogInErrorAction | CleanLogInReducerAction