import logInReducer, { defLogIn } from '../../../../../store/reducers/logIn-Registration/logInSlice';
import { logIn } from '../../../../../store/action-creators/logIn-Registration/logIn';

jest.mock('../../../../../api/AuthService', () => ({
    __esModule: true,
    default: {
        logInRequest: jest.fn(),
    },
}));

describe('logInSlice reducer tests', () => {

    const initialState = {
        logInToken: '',
        logInLoading: false,
        logInError: '',
    };

    test('должно быть возвращено исходное состояние', () => {
        expect(logInReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('должен обрабатывать действие defLogIn', () => {
        const initialState = {
            logInToken: 'sdsd',
            logInLoading: false,
            logInError: 'sdsds',
        };

        const newState = logInReducer(initialState, defLogIn());
        expect(newState).toEqual({
            logInToken: '',
            logInLoading: false,
            logInError: ''
        });
    });

    test('должен обрабатывать действие logIn.pending', () => {
        const action = { type: logIn.pending.type };
        const newState = logInReducer(initialState, action);
        expect(newState).toEqual({
            logInToken: '',
            logInLoading: true,
            logInError: ''
        });
    });

    test('должен обрабатывать действие logIn.fulfilled', () => {
        const action = {
            type: logIn.fulfilled.type,
            payload: 'userToken123'
        };
        const newState = logInReducer(initialState, action);
        expect(newState).toEqual({
            logInToken: 'userToken123',
            logInLoading: false,
            logInError: ''
        });
    });

    test('должен обрабатывать действие logIn.rejected', () => {
        const action = {
            type: logIn.rejected.type,
            payload: 'Ошибка входа'
        };
        const newState = logInReducer(initialState, action);
        expect(newState).toEqual({
            logInToken: '',
            logInLoading: false,
            logInError: 'Ошибка входа'
        });
    });
});
