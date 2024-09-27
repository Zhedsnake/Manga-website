import { getGuestTokenReducer } from "../../../../../../../client/src/store/reducers/getGuestTokenReducer";
import { GuestTokenActionTypes, GuestTokenAction } from "../../../../../../../client/src/types/getGuestToken";

const initialState = {
    guestToken: null,
    loading: false,
    error: null
};

describe("getGuestTokenReducer", () => {

    test("должен возвращать начальное состояние по умолчанию", () => {
        const newState = getGuestTokenReducer(undefined, {} as GuestTokenAction);
        expect(newState).toEqual(initialState);
    });

    test("должен обрабатывать GET_GUEST_TOKEN", () => {
        const action: GuestTokenAction = { type: GuestTokenActionTypes.GET_GUEST_TOKEN };
        const expectedState = {
            guestToken: null,
            loading: true,
            error: null
        };

        const newState = getGuestTokenReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test("должен обрабатывать GET_GUEST_TOKEN_SUCCESS", () => {
        const action: GuestTokenAction = {
            type: GuestTokenActionTypes.GET_GUEST_TOKEN_SUCCESS,
            payload: "newGuestToken"
        };
        const expectedState = {
            guestToken: "newGuestToken",
            loading: false,
            error: null
        };

        const newState = getGuestTokenReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test("должен обрабатывать GET_GUEST_TOKEN_ERROR", () => {
        const action: GuestTokenAction = {
            type: GuestTokenActionTypes.GET_GUEST_TOKEN_ERROR,
            payload: "Error message"
        };
        const expectedState = {
            guestToken: null,
            loading: false,
            error: "Error message"
        };

        const newState = getGuestTokenReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test("должен обрабатывать DEF_GUEST_TOKEN", () => {
        const action: GuestTokenAction = { type: GuestTokenActionTypes.DEF_GUEST_TOKEN };
        const currentState = { guestToken: "token", loading: true, error: "error" };

        const newState = getGuestTokenReducer(currentState, action);
        expect(newState).toEqual(initialState);
    });
});
