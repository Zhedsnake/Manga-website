import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import AuthService from '../../../../../api/AuthService';
import { registration, defReg } from '../../../../../store/action-creators/logIn-Registration/registraion';
import { AnyAction } from 'redux';
import { AxiosError, AxiosResponse } from 'axios';
import { RegistrationState } from '../../../../../types/logInRegistration/registration';
import registrationReducer from '../../../../../store/reducers/logIn-Registration/registrationSlice';

jest.mock('../../../../../api/AuthService', () => ({
    __esModule: true,
    default: {
        logInRequest: jest.fn(),
        registerRequest: jest.fn()
    },
}));

describe('registration async thunk tests', () => {
    let store: EnhancedStore<{ registration: RegistrationState }, AnyAction>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                registration: registrationReducer
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

        (AuthService.registerRequest as jest.Mock).mockResolvedValue({
            data: { userToken: mockToken },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {}
        } as AxiosResponse<{ userToken: string }>);

        const action = await store.dispatch(registration({ name: 'user', email: 'user@example.com', password: 'password' }) as any);

        const state = store.getState().registration;

        expect(action.type).toBe(registration.fulfilled.type);
        expect(action.payload).toBe(mockToken);

        expect(state).toEqual({
            regToken: mockToken,
            regError: "",
            regLoading: false,
        });
    });

    test('должно диспатчить на не успешное действие с ошибкой при регистрации', async () => {
        const mockError = 'Ошибка при регистрации';

        (AuthService.registerRequest as jest.Mock).mockRejectedValue({
            isAxiosError: true,
            response: {
                data: { error: mockError },
                status: 400,
                statusText: 'Bad Request',
                headers: {},
                config: {},
            },
        } as AxiosError<{ error: string }>);

        const action = await store.dispatch(registration({ name: 'user', email: 'user@example.com', password: 'wrongpassword' }) as any);

        const state = store.getState().registration;

        expect(action.type).toBe(registration.rejected.type);
        expect(action.payload).toBe(mockError);

        expect(state).toEqual({
            regToken: "",
            regLoading: false,
            regError: mockError,
        });
    });

});

describe('defReg action test', () => {

    test('должно диспатчить на дефолтное значение', () => {
        const mockDispatch = jest.fn();
        defReg()(mockDispatch);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'registration/defReg',
        });
    });
});
