import { emailFormReducer } from "../../../../../store/reducers/editUserInfo/emailFormReducer";
import { EmailActionTypes, EmailAction, EditEmailState } from "../../../../../types/editUserInfo/emailForm";

describe('emailFormReducer', () => {
    const initialState: EditEmailState = {
        message: "",
        loading: false,
        error: null
    };

    test('должен возвращать начальное состояние по умолчанию', () => {
        const newState = emailFormReducer(undefined, {} as EmailAction);
        expect(newState).toEqual(initialState);
    });

    test('должен обрабатывать EDIT_EMAIL', () => {
        const action: EmailAction = {
            type: EmailActionTypes.EDIT_EMAIL,
        };

        const expectedState = {
            message: "",
            loading: true,
            error: null
        };

        const newState = emailFormReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать EDIT_EMAIL_SUCCESS', () => {
        const action: EmailAction = {
            type: EmailActionTypes.EDIT_EMAIL_SUCCESS,
            payload: "Email updated successfully"
        };

        const expectedState = {
            message: "Email updated successfully",
            loading: false,
            error: null
        };

        const newState = emailFormReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать EDIT_EMAIL_ERROR', () => {
        const action: EmailAction = {
            type: EmailActionTypes.EDIT_EMAIL_ERROR,
            payload: "Error updating email"
        };

        const expectedState = {
            message: "",
            loading: false,
            error: "Error updating email"
        };

        const newState = emailFormReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать DEF_EDIT_EMAIL и сбрасывать состояние', () => {
        const action: EmailAction = {
            type: EmailActionTypes.DEF_EDIT_EMAIL,
        };

        const currentState: EditEmailState = {
            message: "Some message",
            loading: true,
            error: "Some error"
        };

        const newState = emailFormReducer(currentState, action);
        expect(newState).toEqual(initialState);
    });
});
