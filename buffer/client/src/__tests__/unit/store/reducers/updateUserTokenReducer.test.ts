import { updateUserTokenSlice } from "../../../../../../../client/src/store/reducers/updateUserTokenSlice";
import { UpdateUserTokenActionTypes, UpdateUserTokenAction } from "../../../../../../../client/src/types/updateUserToken";

const initialState = {
    userToken: "",
    loading: false,
    error: null
};

describe("updateUserTokenReducer", () => {

    test("должен возвращать начальное состояние по умолчанию", () => {
        const newState = updateUserTokenSlice(undefined, {} as UpdateUserTokenAction);
        expect(newState).toEqual(initialState);
    });

    test("должен обрабатывать UPDATE_USER_TOKEN", () => {
        const action: UpdateUserTokenAction = { type: UpdateUserTokenActionTypes.UPDATE_USER_TOKEN };
        const expectedState = {
            userToken: "",
            loading: true,
            error: null
        };

        const newState = updateUserTokenSlice(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test("должен обрабатывать UPDATE_USER_TOKEN_SUCCESS", () => {
        const action: UpdateUserTokenAction = {
            type: UpdateUserTokenActionTypes.UPDATE_USER_TOKEN_SUCCESS,
            payload: "newToken"
        };
        const expectedState = {
            userToken: "newToken",
            loading: false,
            error: null
        };

        const newState = updateUserTokenSlice(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test("должен обрабатывать UPDATE_USER_TOKEN_ERROR", () => {
        const action: UpdateUserTokenAction = {
            type: UpdateUserTokenActionTypes.UPDATE_USER_TOKEN_ERROR,
            payload: "Error message"
        };
        const expectedState = {
            userToken: "",
            loading: false,
            error: "Error message"
        };

        const newState = updateUserTokenSlice(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test("должен обрабатывать DEF_UPDATE_USER_TOKEN", () => {
        const action: UpdateUserTokenAction = { type: UpdateUserTokenActionTypes.DEF_UPDATE_USER_TOKEN };
        const newState = updateUserTokenSlice({ userToken: "token", loading: true, error: "error" }, action);

        expect(newState).toEqual(initialState);
    });
});
