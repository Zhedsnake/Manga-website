import {Dispatch} from "react";
import {
    GetSmallUserInfoAction, GetSmallUserInfoActionTypes,
} from "../../types/getSmallUserInfo.ts";
import UserService from "../../api/UserService.ts";


export const getSmallUserInfoByToken = () => {
    return async (dispatch: Dispatch<GetSmallUserInfoAction>) => {
        try {
            dispatch({type: GetSmallUserInfoActionTypes.SMALL_USER_INFO})
            const response = await UserService.getSmallUserInfoByToken();

            if ( "name" && "pic" in response.data) {
                dispatch({type: GetSmallUserInfoActionTypes.SMALL_USER_INFO_SUCCESS, payload: response.data})
            }
        } catch (e) {
            if ( "error" in e.response.data) {
                dispatch({
                    type: GetSmallUserInfoActionTypes.SMALL_USER_INFO_ERROR,
                    payload: e.response.data.error
                })
            }
        }
    }
}

export const defSmallUserInfoByToken = () => {
    return async (dispatch: Dispatch<GetSmallUserInfoAction>) => {
        dispatch({type: GetSmallUserInfoActionTypes.DEF_SMALL_USER_INFO})
    }
}