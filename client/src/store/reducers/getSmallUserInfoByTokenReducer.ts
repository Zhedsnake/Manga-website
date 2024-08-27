import {
    GetSmallUserInfoAction,
    GetSmallUserInfoActionTypes, GetSmallUserInfoState
} from "../../types/getSmallUserInfo.ts";

const initialState: GetSmallUserInfoState = {
    data: {
        name: "",
        pic: ""
    },
    loading: false,
    error: null
}

export const getSmallUserInfoByTokenReducer = (state = initialState, action: GetSmallUserInfoAction): GetSmallUserInfoState => {
    switch (action.type) {
        case GetSmallUserInfoActionTypes.SMALL_USER_INFO:
            return {
                data: {
                    name: "",
                    pic: ""
                },
                loading: true,
                error: null }
        case GetSmallUserInfoActionTypes.SMALL_USER_INFO_SUCCESS:
            return { data: action.payload, loading: false, error: null }
        case GetSmallUserInfoActionTypes.SMALL_USER_INFO_ERROR:
            return {
                data: {
                    name: "",
                    pic: ""
                },
                loading: false,
                error: action.payload }
        case GetSmallUserInfoActionTypes.DEF_SMALL_USER_INFO:
            return { ...initialState }
        default:
            return state
    }
}
