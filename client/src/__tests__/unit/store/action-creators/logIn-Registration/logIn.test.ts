import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import AuthService from '../../../../../api/AuthService';
import { logIn } from '../../../../../store/action-creators/logIn-Registration/logIn';
import { AnyAction } from 'redux';
import {AxiosError, AxiosResponse} from 'axios';
import {LogInState} from "../../../../../types/logInRegistration/logIn";
import logInReducer from "../../../../../store/reducers/logIn-Registration/logInSlice";

jest.mock('../../../../../api/AuthService', () => ({
    __esModule: true,
    default: {
        logInRequest: jest.fn(),
        registerRequest: jest.fn()
    },
}));

describe('logIn async thunk tests', () => {
    let store: EnhancedStore<{ logIn: LogInState }, AnyAction>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                logIn: logInReducer
            },
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    serializableCheck: false
                }),
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('должно диспатчить на успешное действие', async () => {
        const mockToken = 'userToken123';

        (AuthService.logInRequest as jest.Mock).mockResolvedValue({
            data: { userToken: mockToken },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {}
        } as AxiosResponse<{ userToken: string }>);

        const action = await store.dispatch(logIn({ name: 'user', password: 'password' }) as any);

        const state = store.getState().logIn;

        expect(action.type).toBe(logIn.fulfilled.type);
        expect(action.payload).toBe(mockToken);

        expect(state).toEqual({
            logInToken: mockToken,
            logInLoading: false,
            logInError: '',
        });
    });

    test('должно диспатчить на не успешное действие с ошибкой при входе', async () => {
        const mockError = 'Ошибка при входе';

        (AuthService.logInRequest as jest.Mock).mockRejectedValue({
            isAxiosError: true,
            response: {
                data: { error: mockError },
                status: 400,
                statusText: 'Bad Request',
                headers: {},
                config: {},
            },
        } as AxiosError<{error: string}>);

        const action = await store.dispatch(logIn({ name: 'user', password: 'wrongpassword' }) as any);

        const state = store.getState().logIn;

        expect(action.type).toBe(logIn.rejected.type);
        expect(action.payload).toBe(mockError);

        expect(state).toEqual({
            logInToken: "",
            logInLoading: false,
            logInError: mockError,
        });
    });
});
