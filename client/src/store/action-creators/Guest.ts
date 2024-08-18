import {Dispatch} from "redux";
import {GuestTokenAction, GuestTokenActionTypes} from "../../types/getGuestToken.ts";
import guestService from "../../api/guestService.ts";

export const getGuestToken = () => {
    return async (dispatch: Dispatch<GuestTokenAction>) => {
        try {
            dispatch({type: GuestTokenActionTypes.GET_GUEST_TOKEN})
            const response = await guestService.getGuestToken()
            console.log(response)
            dispatch({type: GuestTokenActionTypes.GET_GUEST_TOKEN_SUCCESS, payload: response.data})
        } catch (e) {
            console.error(e)

            dispatch({
                type: GuestTokenActionTypes.GET_GUEST_TOKEN_ERROR,
                payload: 'Произошла ошибка при загрузке guest токена'
            })
        }
    }
}
export const defGuestToken = () => {
    return (dispatch: Dispatch<GuestTokenAction>) => {
        dispatch({type: GuestTokenActionTypes.DEF_GUEST_TOKEN})
    }
}
