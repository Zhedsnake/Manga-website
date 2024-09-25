import { passwordFormReducer } from "../../../../../store/reducers/editUserInfo/passwordFormReducer";
import { PasswordActionTypes, PasswordAction, EditPasswordState } from "../../../../../types/editUserInfo/passwordForm";

describe('passwordFormReducer', () => {
    const initialState: EditPasswordState = {
        message: "",
        loading: false,
        error: null
    };

    test('должен возвращать начальное состояние по умолчанию', () => {
        const newState = passwordFormReducer(undefined, {} as PasswordAction);
        expect(newState).toEqual(initialState);
    });

    test('должен обрабатывать EDIT_PASSWORD', () => {
        const action: PasswordAction = {
            type: PasswordActionTypes.EDIT_PASSWORD,
        };

        const expectedState = {
            message: "",
            loading: true,
            error: null
        };

        const newState = passwordFormReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать EDIT_PASSWORD_SUCCESS', () => {
        const action: PasswordAction = {
            type: PasswordActionTypes.EDIT_PASSWORD_SUCCESS,
            payload: "Password updated successfully"
        };

        const expectedState = {
            message: "Password updated successfully",
            loading: false,
            error: null
        };

        const newState = passwordFormReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать EDIT_PASSWORD_ERROR', () => {
        const action: PasswordAction = {
            type: PasswordActionTypes.EDIT_PASSWORD_ERROR,
            payload: "Error updating password"
        };

        const expectedState = {
            message: "",
            loading: false,
            error: "Error updating password"
        };

        const newState = passwordFormReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать DEF_EDIT_PASSWORD и сбрасывать состояние', () => {
        const action: PasswordAction = {
            type: PasswordActionTypes.DEF_EDIT_PASSWORD,
        };

        const currentState: EditPasswordState = {
            message: "Password changed",
            loading: true,
            error: "Some error"
        };

        const newState = passwordFormReducer(currentState, action);
        expect(newState).toEqual(initialState);
    });
});
