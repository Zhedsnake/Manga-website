import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import guestService from '../../../../api/GuestService';
import { getGuestToken } from '../../../../store/action-creators/getGuestToken';
import { AnyAction } from 'redux';
import { AxiosError, AxiosResponse } from 'axios';
import guestTokenReducer from '../../../../store/reducers/getGuestTokenSlice';
import { GuestTokenState } from '../../../../types/getGuestToken';

jest.mock('../../../../api/GuestService', () => ({
    __esModule: true,
    default: {
        registerGuest: jest.fn(),
    },
}));

describe('guestToken async thunk tests', () => {
    let store: EnhancedStore<{ guestToken: GuestTokenState }, AnyAction>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                guestToken: guestTokenReducer
            },
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    serializableCheck: false,
                }),
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('должно диспатчить успешное действие при получении guest токена', async () => {
        const mockToken = 'guestToken123';

        (guestService.registerGuest as jest.Mock).mockResolvedValue({
            data: { guestToken: mockToken },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {}
        } as AxiosResponse<{ guestToken: string }>);

        const action = await store.dispatch(getGuestToken() as any);

        const state = store.getState().guestToken;

        expect(action.type).toBe(getGuestToken.fulfilled.type);
        expect(action.payload).toBe(mockToken);

        expect(state).toEqual({
            guestToken: mockToken,
            loading: false,
            error: null,
        });
    });

    test('должно диспатчить не успешное действие при ошибке получения guest токена', async () => {
        const mockError = 'Ошибка при получении guest токена';

        (guestService.registerGuest as jest.Mock).mockRejectedValue({
            isAxiosError: true,
            response: {
                data: { error: mockError },
                status: 400,
                statusText: 'Bad Request',
                headers: {},
                config: {},
            },
        } as AxiosError<{ error: string }>);

        const action = await store.dispatch(getGuestToken() as any);

        const state = store.getState().guestToken;

        expect(action.type).toBe(getGuestToken.rejected.type);
        expect(action.payload).toBe(mockError);

        expect(state).toEqual({
            guestToken: null,
            loading: false,
            error: mockError,
        });
    });
});
