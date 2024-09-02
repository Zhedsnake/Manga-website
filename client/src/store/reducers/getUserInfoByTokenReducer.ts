import {GetUserInfoAction, GetUserInfoActionTypes, GetUserInfoState} from "../../types/getUserInfo.ts";

const initialState: GetUserInfoState = {
    name: "Неизвестно",
    email: "Неизвестно",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    picWebp: "",
    registeredAt: "Неизвестно",
    birthday: "Неизвестно",
    loading: false,
    error: null
}

export const getUserInfoByTokenReducer = (state = initialState, action: GetUserInfoAction): GetUserInfoState => {
    switch (action.type) {
        case GetUserInfoActionTypes.USER_INFO:
            return {
                ...initialState,
                loading: true,
                error: null }
        case GetUserInfoActionTypes.USER_INFO_SUCCESS:
            return { ...initialState, ...action.payload, loading: false, error: null }
        case GetUserInfoActionTypes.USER_INFO_ERROR:
            return {
                ...initialState,
                loading: false,
                error: action.payload }
        case GetUserInfoActionTypes.DEF_USER_INFO:
            return { ...initialState }
        default:
            return state
    }
}
