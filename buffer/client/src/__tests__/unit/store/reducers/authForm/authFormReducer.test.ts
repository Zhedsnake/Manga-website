import { authFormSlice } from "../../../../../../../../client/src/store/reducers/authForm/authFormSlice";
import { AuthFormActionTypes, AuthFormAction, AuthFormState } from "../../../../../../../../client/src/types/authForm/authForm";

describe('authFormReducer', () => {
    const initialState: AuthFormState = {
        name: '',
        email: '',
        password: '',
    };

    test('должен возвращать начальное состояние по умолчанию', () => {
        const newState = authFormSlice(undefined, {} as AuthFormAction);
        expect(newState).toEqual(initialState);
    });

    test('должен обрабатывать NAME', () => {
        const action: AuthFormAction = {
            type: AuthFormActionTypes.NAME,
            payload: 'John Doe',
        };

        const expectedState = {
            ...initialState,
            name: 'John Doe',
        };

        const newState = authFormSlice(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать EMAIL', () => {
        const action: AuthFormAction = {
            type: AuthFormActionTypes.EMAIL,
            payload: 'john.doe@example.com',
        };

        const expectedState = {
            ...initialState,
            email: 'john.doe@example.com',
        };

        const newState = authFormSlice(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать PASSWORD', () => {
        const action: AuthFormAction = {
            type: AuthFormActionTypes.PASSWORD,
            payload: 'strongPassword123',
        };

        const expectedState = {
            ...initialState,
            password: 'strongPassword123',
        };

        const newState = authFormSlice(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать DEF_AUTH_FORM и сбрасывать состояние', () => {
        const action: AuthFormAction = {
            type: AuthFormActionTypes.DEF_AUTH_FORM,
        };

        const currentState: AuthFormState = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'strongPassword123',
        };

        const newState = authFormSlice(currentState, action);
        expect(newState).toEqual(initialState);
    });
});
