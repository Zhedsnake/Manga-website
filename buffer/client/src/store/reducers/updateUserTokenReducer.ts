import {UpdateUserTokenAction, UpdateUserTokenActionTypes, UpdateUserTokenState} from "../../types/updateUserToken.ts";

const initialState: UpdateUserTokenState = {
    userToken: "",
    loading: false,
    error: null
}

export const updateUserTokenReducer = (state = initialState, action: UpdateUserTokenAction): UpdateUserTokenState => {
    switch (action.type) {
        case UpdateUserTokenActionTypes.UPDATE_USER_TOKEN:
            return {
                userToken: "",
                loading: true,
                error: null }
        case UpdateUserTokenActionTypes.UPDATE_USER_TOKEN_SUCCESS:
            return { userToken: action.payload, loading: false, error: null }
        case UpdateUserTokenActionTypes.UPDATE_USER_TOKEN_ERROR:
            return {
                userToken: "",
                loading: false,
                error: action.payload }
        case UpdateUserTokenActionTypes.DEF_UPDATE_USER_TOKEN:
            return { ...initialState }
        default:
            return state
    }
}
