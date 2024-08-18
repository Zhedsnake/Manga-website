import {GuestTokenAction, GuestTokenActionTypes, GuestTokenState} from "../../types/getGuestToken.ts";

const initialState: GuestTokenState = {
    guestToken: null,
    loading: false,
    error: null
}

export const getGuestTokenReducer = (state = initialState, action: GuestTokenAction): GuestTokenState => {
    switch (action.type) {
        case GuestTokenActionTypes.GET_GUEST_TOKEN:
            return { guestToken: null, loading: true, error: null }
        case GuestTokenActionTypes.GET_GUEST_TOKEN_SUCCESS:
            return { guestToken: action.payload, loading: false, error: null }
        case GuestTokenActionTypes.GET_GUEST_TOKEN_ERROR:
            return { guestToken: null, loading: false, error: action.payload }
        case GuestTokenActionTypes.DEF_GUEST_TOKEN:
            return { ...initialState }
        default:
            return state
    }
}
