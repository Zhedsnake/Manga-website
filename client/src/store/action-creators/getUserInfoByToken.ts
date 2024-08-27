import {Dispatch} from "react";
import UserService from "../../api/UserService.ts";
import {GetUserInfoAction, GetUserInfoActionTypes} from "../../types/getUserInfo.ts";


export const getUserInfoByToken = () => {
    return async (dispatch: Dispatch<GetUserInfoAction>) => {
        try {
            dispatch({type: GetUserInfoActionTypes.USER_INFO})
            const response = await UserService.getUserInfoByToken();

            if ( "name" && "email" && "pic" && "registeredAt" in response.data) {
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

export const defUserInfoByToken = () => {
    return async (dispatch: Dispatch<GetUserInfoAction>) => {
        dispatch({type: GetUserInfoActionTypes.DEF_USER_INFO})
    }
}