import {GetUserInfoAction, GetUserInfoActionTypes, GetUserInfoState} from "../../types/getUserInfo.ts";

const initialState: GetUserInfoState = {
    data: {
        name: "",
        email:"",
        pic: "",
        registeredAt: ""
    },
    loading: false,
    error: null
}

export const getUserInfoByTokenReducer = (state = initialState, action: GetUserInfoAction): GetUserInfoState => {
    switch (action.type) {
        case GetUserInfoActionTypes.USER_INFO:
            return {
                data: {
                    name: "",
                    email:"",
                    pic: "",
                    registeredAt: ""
                },
                loading: true,
                error: null }
        case GetUserInfoActionTypes.USER_INFO_SUCCESS:
            return { data: action.payload, loading: false, error: null }
        case GetUserInfoActionTypes.USER_INFO_ERROR:
            return {
                data: {
                    name: "",
                    email:"",
                    pic: "",
                    registeredAt: ""
                },
                loading: false,
                error: action.payload }
        case GetUserInfoActionTypes.DEF_USER_INFO:
            return { ...initialState }
        default:
            return state
    }
}
