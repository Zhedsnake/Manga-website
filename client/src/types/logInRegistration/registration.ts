
export interface RegistrationState {
    regToken: string,
    regLoading: boolean,
    regError: string | null,
}
export enum RegistrationActionTypes {
    REGISTRATION = 'REGISTRATION',
    REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
    REGISTRATION_ERROR = 'REGISTRATION_ERROR',
    DEF_REG='DEF_REG'
}
interface PostRegistrationAction {
    type: RegistrationActionTypes.REGISTRATION;
}
interface PostRegistrationSuccessAction {
    type: RegistrationActionTypes.REGISTRATION_SUCCESS;
    payload: string;
}
interface PostRegistrationErrorAction {
    type: RegistrationActionTypes.REGISTRATION_ERROR;
    payload: string;
}
interface CleanRegistrationReducerAction {
    type: RegistrationActionTypes.DEF_REG
}
export type RegistrationAction = PostRegistrationAction | PostRegistrationSuccessAction | PostRegistrationErrorAction | CleanRegistrationReducerAction