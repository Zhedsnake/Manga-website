import { getUserInfoByTokenReducer } from "../../../../store/reducers/getUserInfoByTokenReducer";
import { GetUserInfoActionTypes, GetUserInfoAction } from "../../../../types/getUserInfo";

const initialState = {
    name: "Неизвестно",
    email: "Неизвестно",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    picWebp: "",
    registeredAt: "Неизвестно",
    birthday: "Неизвестно",
    loading: false,
    error: null
};

describe("getUserInfoByTokenReducer", () => {

    test("должен возвращать начальное состояние по умолчанию", () => {
        const newState = getUserInfoByTokenReducer(undefined, {} as GetUserInfoAction);
        expect(newState).toEqual(initialState);
    });

    test("должен обрабатывать USER_INFO", () => {
        const action: GetUserInfoAction = { type: GetUserInfoActionTypes.USER_INFO };
        const expectedState = {
            ...initialState,
            loading: true,
            error: null
        };

        const newState = getUserInfoByTokenReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test("должен обрабатывать USER_INFO_SUCCESS", () => {
        const action: GetUserInfoAction = {
            type: GetUserInfoActionTypes.USER_INFO_SUCCESS,
            payload: {
                name: "John Doe",
                email: "john.doe@example.com",
                pic: "profile.jpg",
                registeredAt: "2023-09-23",
                birthday: "1990-01-01"
            }
        };
        const expectedState = {
            name: "John Doe",
            email: "john.doe@example.com",
            pic: "profile.jpg",
            picWebp: "",
            registeredAt: "2023-09-23",
            birthday: "1990-01-01",
            loading: false,
            error: null
        };

        const newState = getUserInfoByTokenReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test("должен обрабатывать USER_INFO_ERROR", () => {
        const action: GetUserInfoAction = {
            type: GetUserInfoActionTypes.USER_INFO_ERROR,
            payload: "Error message"
        };
        const expectedState = {
            ...initialState,
            loading: false,
            error: "Error message"
        };

        const newState = getUserInfoByTokenReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test("должен обрабатывать DEF_USER_INFO", () => {
        const action: GetUserInfoAction = { type: GetUserInfoActionTypes.DEF_USER_INFO };
        const currentState = {
            name: "John Doe",
            email: "john.doe@example.com",
            pic: "profile.jpg",
            picWebp: "profile.webp",
            registeredAt: "2023-09-23",
            birthday: "1990-01-01",
            loading: true,
            error: "Some error"
        };

        const newState = getUserInfoByTokenReducer(currentState, action);
        expect(newState).toEqual(initialState);
    });
});
