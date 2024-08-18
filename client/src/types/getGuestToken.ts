export interface GuestTokenState {
    guestToken: string | null;
    loading: boolean;
    error: null | string;
}
export enum GuestTokenActionTypes {
    GET_GUEST_TOKEN = 'GET_GUEST_TOKEN',
    GET_GUEST_TOKEN_SUCCESS = 'GET_GUEST_TOKEN_SUCCESS',
    GET_GUEST_TOKEN_ERROR = 'GET_GUEST_TOKEN_ERROR',
    DEF_GUEST_TOKEN = 'DEF_GUEST_TOKEN'
}
interface GetGuestTokenAction {
    type: GuestTokenActionTypes.GET_GUEST_TOKEN;
}
interface GetGuestTokenSuccessAction {
    type: GuestTokenActionTypes.GET_GUEST_TOKEN_SUCCESS;
    payload: string
}
interface GetGuestTokenErrorAction {
    type: GuestTokenActionTypes.GET_GUEST_TOKEN_ERROR;
    payload: string;
}
interface DefGuestTokenAction {
    type: GuestTokenActionTypes.DEF_GUEST_TOKEN;
}
export type GuestTokenAction = GetGuestTokenAction | GetGuestTokenSuccessAction | GetGuestTokenErrorAction | DefGuestTokenAction
