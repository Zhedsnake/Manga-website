import { nameFormReducer } from "../../../../../../../../client/src/store/reducers/editUserInfo/nameFormReducer";
import { NameActionTypes, NameAction, EditNameState } from "../../../../../../../../client/src/types/editUserInfo/nameForm";

describe('nameFormReducer', () => {
    const initialState: EditNameState = {
        message: "",
        loading: false,
        error: null
    };

    test('должен возвращать начальное состояние по умолчанию', () => {
        const newState = nameFormReducer(undefined, {} as NameAction);
        expect(newState).toEqual(initialState);
    });

    test('должен обрабатывать EDIT_NAME', () => {
        const action: NameAction = {
            type: NameActionTypes.EDIT_NAME,
        };

        const expectedState = {
            message: "",
            loading: true,
            error: null
        };

        const newState = nameFormReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать EDIT_NAME_SUCCESS', () => {
        const action: NameAction = {
            type: NameActionTypes.EDIT_NAME_SUCCESS,
            payload: "Name updated successfully"
        };

        const expectedState = {
            message: "Name updated successfully",
            loading: false,
            error: null
        };

        const newState = nameFormReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать EDIT_NAME_ERROR', () => {
        const action: NameAction = {
            type: NameActionTypes.EDIT_NAME_ERROR,
            payload: "Error updating name"
        };

        const expectedState = {
            message: "",
            loading: false,
            error: "Error updating name"
        };

        const newState = nameFormReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать DEF_EDIT_NAME и сбрасывать состояние', () => {
        const action: NameAction = {
            type: NameActionTypes.DEF_EDIT_NAME,
        };

        const currentState: EditNameState = {
            message: "Some message",
            loading: true,
            error: "Some error"
        };

        const newState = nameFormReducer(currentState, action);
        expect(newState).toEqual(initialState);
    });
});
