import {Dispatch} from "react";
import UserService from "../../api/UserService.ts";
import {UpdateUserTokenAction, UpdateUserTokenActionTypes} from "../../types/updateUserToken.ts";


export const updateUserToken = () => {
    return async (dispatch: Dispatch<UpdateUserTokenAction>) => {
        try {
            dispatch({type: UpdateUserTokenActionTypes.UPDATE_USER_TOKEN})
            const response = await UserService.updateUserToken();

            if ( "userToken" in response.data) {
                dispatch({type: UpdateUserTokenActionTypes.UPDATE_USER_TOKEN_SUCCESS, payload: response.data.userToken})
            }
        } catch (e) {
            if ( "error" in e.response.data) {
                dispatch({
                    type: UpdateUserTokenActionTypes.UPDATE_USER_TOKEN_ERROR,
                    payload: e.response.data.error
                })
            }
        }
    }
}

export const defUpdateUserToken = () => {
    return async (dispatch: Dispatch<UpdateUserTokenAction>) => {
        dispatch({type: UpdateUserTokenActionTypes.DEF_UPDATE_USER_TOKEN})
    }
}