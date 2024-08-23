import {Dispatch} from "react";
import {GetUserInfoAction, GetUserInfoActionTypes} from "../../types/getUserInfo.ts";
import UserService from "../../api/UserService.ts";


export const getSmallUserInfoByToken = () => {
    return async (dispatch: Dispatch<GetUserInfoAction>) => {
        try {
            dispatch({type: GetUserInfoActionTypes.USER_INFO})
            const response = await UserService.getSmallUserInfoByToken();

            if ( "name" && "pic" in response.data) {
                dispatch({type: GetUserInfoActionTypes.USER_INFO_SUCCESS, payload: response.data})
            }
        } catch (e) {
            if ( "error" in e.response.data) {
                dispatch({
                    type: GetUserInfoActionTypes.USER_INFO_ERROR,
                    payload: e.response.data.error
                })
            }
        }
    }
}

export const defSmallUserInfoByToken = () => {
    return async (dispatch: Dispatch<GetUserInfoAction>) => {
        dispatch({type: GetUserInfoActionTypes.DEF_USER_INFO})
    }
}