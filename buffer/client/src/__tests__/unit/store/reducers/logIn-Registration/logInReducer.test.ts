import { logInReducer } from "../../../../../../../../client/src/store/reducers/logIn-Registration/logInReducer";
import { LogInActionTypes, LogInAction, LogInState } from "../../../../../../../../client/src/types/logInRegistration/logIn";

describe('logInReducer', () => {
    const initialState: LogInState = {
        logInToken: '',
        logInLoading: false,
        logInError: '',
    };

    test('должен возвращать начальное состояние по умолчанию', () => {
        const newState = logInReducer(undefined, {} as LogInAction);
        expect(newState).toEqual(initialState);
    });

    test('должен обрабатывать LOG_IN', () => {
        const action: LogInAction = {
            type: LogInActionTypes.LOG_IN,
        };

        const expectedState: LogInState = {
            logInToken: '',
            logInLoading: true,
            logInError: ''
        };

        const newState = logInReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать LOG_IN_SUCCESS', () => {
        const action: LogInAction = {
            type: LogInActionTypes.LOG_IN_SUCCESS,
            payload: "token_123"
        };

        const expectedState: LogInState = {
            logInToken: "token_123",
            logInLoading: false,
            logInError: ''
        };

        const newState = logInReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать LOG_IN_ERROR', () => {
        const action: LogInAction = {
            type: LogInActionTypes.LOG_IN_ERROR,
            payload: "Invalid credentials"
        };

        const expectedState: LogInState = {
            logInToken: '',
            logInLoading: false,
            logInError: "Invalid credentials"
        };

        const newState = logInReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать DEF_LOG_IN и сбрасывать состояние', () => {
        const action: LogInAction = {
            type: LogInActionTypes.DEF_LOG_IN,
        };

        const currentState: LogInState = {
            logInToken: "token_123",
            logInLoading: true,
            logInError: "Some error"
        };

        const newState = logInReducer(currentState, action);
        expect(newState).toEqual(initialState);
    });
});
