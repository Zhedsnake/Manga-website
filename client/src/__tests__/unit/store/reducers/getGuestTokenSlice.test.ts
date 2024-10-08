import guestTokenReducer, { defGuestToken } from '../../../../store/reducers/getGuestTokenSlice';
import { getGuestToken } from '../../../../store/action-creators/getGuestToken';
import { GuestTokenState } from '../../../../types/getGuestToken';

jest.mock('../../../../api/GuestService.ts', () => ({
    __esModule: true,
    default: {
        registerGuest: jest.fn(),
    },
}));

describe('guestTokenSlice reducer tests', () => {

    const initialState: GuestTokenState = {
        guestToken: null,
        loading: false,
        error: null,
    };

    test('должно быть возвращено исходное состояние', () => {
        expect(guestTokenReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('должен обрабатывать действие defGuestToken', () => {
        const modifiedState: GuestTokenState = {
            guestToken: 'someToken',
            loading: false,
            error: 'Some error',
        };

        const newState = guestTokenReducer(modifiedState, defGuestToken());
        expect(newState).toEqual({
            guestToken: null,
            loading: false,
            error: null,
        });
    });

    test('должен обрабатывать действие getGuestToken.pending', () => {
        const action = { type: getGuestToken.pending.type };
        const newState = guestTokenReducer(initialState, action);
        expect(newState).toEqual({
            guestToken: null,
            loading: true,
            error: null,
        });
    });

    test('должен обрабатывать действие getGuestToken.fulfilled', () => {
        const action = {
            type: getGuestToken.fulfilled.type,
            payload: 'guestToken123',
        };
        const newState = guestTokenReducer(initialState, action);
        expect(newState).toEqual({
            guestToken: 'guestToken123',
            loading: false,
            error: null,
        });
    });

    test('должен обрабатывать действие getGuestToken.rejected', () => {
        const action = {
            type: getGuestToken.rejected.type,
            payload: 'Ошибка загрузки guest токена',
        };
        const newState = guestTokenReducer(initialState, action);
        expect(newState).toEqual({
            guestToken: null,
            loading: false,
            error: 'Ошибка загрузки guest токена',
        });
    });
});
