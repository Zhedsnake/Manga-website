import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import UserService from '../../../../api/UserService';
import { updateUserToken } from '../../../../store/action-creators/updateUserToken';
import { AnyAction } from 'redux';
import { AxiosError, AxiosResponse } from 'axios';
import { UpdateUserTokenState } from '../../../../types/updateUserToken';
import updateUserTokenReducer from '../../../../store/reducers/updateUserTokenSlice.ts';

jest.mock('../../../../api/UserService', () => ({
    __esModule: true,
    default: {
        updateUserToken: jest.fn(),
    },
}));

describe('updateUserToken async thunk tests', () => {
    let store: EnhancedStore<{ updateUserToken: UpdateUserTokenState }, AnyAction>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                updateUserToken: updateUserTokenReducer
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

        (UserService.updateUserToken as jest.Mock).mockResolvedValue({
            data: { userToken: mockToken },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {}
        } as AxiosResponse<{ userToken: string }>);

        await store.dispatch(updateUserToken() as any);

        const state = store.getState().updateUserToken;

        expect(state).toEqual({
            userToken: mockToken,
            loading: false,
            error: "",
        });
    });

    test('должно диспатчить на не успешное действие с ошибкой при обновлении токена', async () => {
        const mockError = 'Ошибка обновления токена';

        (UserService.updateUserToken as jest.Mock).mockRejectedValue({
            isAxiosError: true,
            response: {
                data: { error: mockError },
                status: 400,
                statusText: 'Bad Request',
                headers: {},
                config: {},
            },
        } as AxiosError<{ error: string }>);

        await store.dispatch(updateUserToken() as any);

        const state = store.getState().updateUserToken;

        expect(state).toEqual({
            userToken: "",
            loading: false,
            error: mockError,
        });
    });
});
