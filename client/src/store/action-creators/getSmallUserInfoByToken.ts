import {Dispatch} from "react";
import {
    GetSmallUserInfoAction, GetSmallUserInfoActionTypes,
} from "../../types/getSmallUserInfo.ts";
import UserService from "../../api/UserService.ts";
import {AxiosError, AxiosResponse} from "axios";

export const getSmallUserInfoByToken = () => {
    return async (dispatch: Dispatch<GetSmallUserInfoAction>) => {
        try {
            dispatch({type: GetSmallUserInfoActionTypes.SMALL_USER_INFO});
            const response: AxiosResponse<{ name: string, pic: string } | { name: string, minPicWebp: string }> = await UserService.getSmallUserInfoByToken();

            if ("data" in response) {
                dispatch({type: GetSmallUserInfoActionTypes.SMALL_USER_INFO_SUCCESS, payload: response.data});
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.data && "error" in e.response.data) {
                    dispatch({
                        type: GetSmallUserInfoActionTypes.SMALL_USER_INFO_ERROR,
                        payload: e.response.data.error
                    });
                } else {
                    dispatch({
                        type: GetSmallUserInfoActionTypes.SMALL_USER_INFO_ERROR,
                        payload: "Неизвестная ошибка"
                    });
                }
            } else {
                dispatch({
                    type: GetSmallUserInfoActionTypes.SMALL_USER_INFO_ERROR,
                    payload: "Ошибка выполнения запроса"
                });
            }
        }
    }
}

export const defSmallUserInfoByToken = () => {
    return async (dispatch: Dispatch<GetSmallUserInfoAction>) => {
        dispatch({type: GetSmallUserInfoActionTypes.DEF_SMALL_USER_INFO});
    }
}