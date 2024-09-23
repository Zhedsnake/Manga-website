import {Dispatch} from "react";
import UserService from "../../api/UserService.ts";
import {UpdateUserTokenAction, UpdateUserTokenActionTypes} from "../../types/updateUserToken.ts";
import {AxiosError} from "axios";

export const updateUserToken = () => {
    return async (dispatch: Dispatch<UpdateUserTokenAction>) => {
        try {
            dispatch({type: UpdateUserTokenActionTypes.UPDATE_USER_TOKEN});
            const response = await UserService.updateUserToken();

            if ("userToken" in response.data) {
                dispatch({type: UpdateUserTokenActionTypes.UPDATE_USER_TOKEN_SUCCESS, payload: response.data.userToken});
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.data && "error" in e.response.data) {
                    dispatch({
                        type: UpdateUserTokenActionTypes.UPDATE_USER_TOKEN_ERROR,
                        payload: e.response.data.error
                    });
                } else {
                    dispatch({
                        type: UpdateUserTokenActionTypes.UPDATE_USER_TOKEN_ERROR,
                        payload: "Неизвестная ошибка"
                    });
                }
            } else {
                dispatch({
                    type: UpdateUserTokenActionTypes.UPDATE_USER_TOKEN_ERROR,
                    payload: "Ошибка выполнения запроса"
                });
            }
        }
    }
}

export const defUpdateUserToken = () => {
    return async (dispatch: Dispatch<UpdateUserTokenAction>) => {
        dispatch({type: UpdateUserTokenActionTypes.DEF_UPDATE_USER_TOKEN});
    }
}
