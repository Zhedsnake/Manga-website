import { authFormErrorSlice } from "../../../../../../../../client/src/store/reducers/authForm/authFormErrorSlice";
import { AuthFormErrorActionTypes, AuthFormErrorAction, AuthFormErrorState } from "../../../../../../../../client/src/types/authForm/authFormError";

describe('authFormErrorReducer', () => {
    const initialState: AuthFormErrorState = {
        nameError: '',
        emailError: '',
        passwordError: '',
    };

    test('должен возвращать начальное состояние по умолчанию', () => {
        const newState = authFormErrorSlice(undefined, {} as AuthFormErrorAction);
        expect(newState).toEqual(initialState);
    });

    test('должен обрабатывать NAME_ERROR', () => {
        const action: AuthFormErrorAction = {
            type: AuthFormErrorActionTypes.NAME_ERROR,
            payload: 'Invalid name'
        };

        const expectedState = {
            ...initialState,
            nameError: 'Invalid name',
        };

        const newState = authFormErrorSlice(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать EMAIL_ERROR', () => {
        const action: AuthFormErrorAction = {
            type: AuthFormErrorActionTypes.EMAIL_ERROR,
            payload: 'Invalid email'
        };

        const expectedState = {
            ...initialState,
            emailError: 'Invalid email',
        };

        const newState = authFormErrorSlice(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать PASSWORD_ERROR', () => {
        const action: AuthFormErrorAction = {
            type: AuthFormErrorActionTypes.PASSWORD_ERROR,
            payload: 'Invalid password'
        };

        const expectedState = {
            ...initialState,
            passwordError: 'Invalid password',
        };

        const newState = authFormErrorSlice(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать DEF_AUTH_FORM_ERROR и сбрасывать состояние', () => {
        const action: AuthFormErrorAction = {
            type: AuthFormErrorActionTypes.DEF_AUTH_FORM_ERROR,
        };

        const currentState: AuthFormErrorState = {
            nameError: 'Some name error',
            emailError: 'Some email error',
            passwordError: 'Some password error',
        };

        const newState = authFormErrorSlice(currentState, action);
        expect(newState).toEqual(initialState);
    });
});
