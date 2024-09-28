import logInReducer, { defLogIn, logIn, logInSuccess, logInError } from '../../../../../store/reducers/logIn-Registration/logInSlice';
import { LogInState } from '../../../../../types/logInRegistration/logIn';

describe('logInSlice reducer tests', () => {

    const initialState: LogInState = {
        logInToken: '',
        logInLoading: false,
        logInError: '',
    };

    test('должно быть возвращено исходное состояние', () => {
        expect(logInReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('должен обрабатывать действие defLogIn', () => {
        const newState = logInReducer(initialState, defLogIn());
        expect(newState).toEqual({
            logInToken: '',
            logInLoading: false,
            logInError: '',
        });
    });

    test('должен обрабатывать действие logIn', () => {
        const action = { type: logIn.type };
        const newState = logInReducer(initialState, action);
        expect(newState).toEqual({
            logInToken: '',
            logInLoading: true,
            logInError: '',
        });
    });

    test('должен обрабатывать действие logInSuccess', () => {
        const action = {
            type: logInSuccess.type,
            payload: 'logInToken123'
        };
        const newState = logInReducer(initialState, action);
        expect(newState).toEqual({
            logInToken: 'logInToken123',
            logInLoading: false,
            logInError: '',
        });
    });

    test('должен обрабатывать действие logInError', () => {
        const action = {
            type: logInError.type,
            payload: 'Log in failed'
        };
        const newState = logInReducer(initialState, action);
        expect(newState).toEqual({
            logInToken: '',
            logInLoading: false,
            logInError: 'Log in failed',
        });
    });
});
