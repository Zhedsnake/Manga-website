import { authFormErrorReducer } from "../../../../../store/reducers/authForm/authFormErrorReducer";
import { AuthFormErrorActionTypes, AuthFormErrorAction, AuthFormErrorState } from "../../../../../types/authForm/authFormError";

describe('authFormErrorReducer', () => {
    const initialState: AuthFormErrorState = {
        nameError: '',
        emailError: '',
        passwordError: '',
    };

    test('должен возвращать начальное состояние по умолчанию', () => {
        const newState = authFormErrorReducer(undefined, {} as AuthFormErrorAction);
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

        const newState = authFormErrorReducer(initialState, action);
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

        const newState = authFormErrorReducer(initialState, action);
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

        const newState = authFormErrorReducer(initialState, action);
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

        const newState = authFormErrorReducer(currentState, action);
        expect(newState).toEqual(initialState);
    });
});
