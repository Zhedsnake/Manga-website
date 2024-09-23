import {Dispatch} from "react";
import UserService from "../../api/UserService.ts";
import {GetUserInfoAction, GetUserInfoActionTypes} from "../../types/getUserInfo.ts";
import {AxiosError} from "axios";

export const getUserInfoByToken = () => {
    return async (dispatch: Dispatch<GetUserInfoAction>) => {
        try {
            dispatch({type: GetUserInfoActionTypes.USER_INFO});
            const response = await UserService.getUserInfoByToken();

            if ("name" in response.data && "email" in response.data && "pic" in response.data && "registeredAt" in response.data) {
                dispatch({type: GetUserInfoActionTypes.USER_INFO_SUCCESS, payload: response.data});
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.data && "error" in e.response.data) {
                    dispatch({
                        type: GetUserInfoActionTypes.USER_INFO_ERROR,
                        payload: e.response.data.error
                    });
                } else {
                    dispatch({
                        type: GetUserInfoActionTypes.USER_INFO_ERROR,
                        payload: "Неизвестная ошибка"
                    });
                }
            } else {
                dispatch({
                    type: GetUserInfoActionTypes.USER_INFO_ERROR,
                    payload: "Ошибка выполнения запроса"
                });
            }
        }
    }
}

export const defUserInfoByToken = () => {
    return async (dispatch: Dispatch<GetUserInfoAction>) => {
        dispatch({type: GetUserInfoActionTypes.DEF_USER_INFO});
    }
}
