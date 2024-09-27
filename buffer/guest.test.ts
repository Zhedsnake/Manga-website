import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { getGuestToken, defGuestToken } from "../client/src/store/action-creators/guest";
import { GuestTokenActionTypes, GuestTokenAction, GuestTokenState } from "../client/src/types/getGuestToken";
import guestService from "../client/src/api/GuestService";
import { AnyAction } from 'redux';

jest.mock('../client/src/api/GuestService.ts');

const middlewares: ThunkMiddleware<any, AnyAction>[] = [thunk];
const mockStore = configureMockStore<GuestTokenState, AnyAction>(middlewares);

describe('guestActions', () => {
    let store: MockStoreEnhanced<GuestTokenState, AnyAction>;

    beforeEach(() => {
        store = mockStore({});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('должен успешно получить guest token и задиспатчить GET_GUEST_TOKEN_SUCCESS', async () => {
        const mockGuestToken = 'guest_token_123';
        (guestService.registerGuest as jest.Mock).mockResolvedValue({
            data: { guestToken: mockGuestToken },
        });

        const expectedActions: GuestTokenAction[] = [
            { type: GuestTokenActionTypes.GET_GUEST_TOKEN },
            { type: GuestTokenActionTypes.GET_GUEST_TOKEN_SUCCESS, payload: mockGuestToken }
        ];

        await store.dispatch<any>(getGuestToken());

        expect(store.getActions()).toEqual(expectedActions);
        expect(guestService.registerGuest).toHaveBeenCalledTimes(1);
    });

    test('должен обработать ошибку и задиспатчить GET_GUEST_TOKEN_ERROR', async () => {
        const mockError = new Error('Ошибка при получении токена');
        (guestService.registerGuest as jest.Mock).mockRejectedValue(mockError);

        const expectedActions: GuestTokenAction[] = [
            { type: GuestTokenActionTypes.GET_GUEST_TOKEN },
            { type: GuestTokenActionTypes.GET_GUEST_TOKEN_ERROR, payload: 'Произошла ошибка при загрузке guest токена' }
        ];

        await store.dispatch<any>(getGuestToken());

        expect(store.getActions()).toEqual(expectedActions);
        expect(guestService.registerGuest).toHaveBeenCalledTimes(1);
    });

    test('должен задиспатчить дефолтный guest token', () => {
        const expectedAction = {
            type: GuestTokenActionTypes.DEF_GUEST_TOKEN,
            payload: 'default_guest_token',
        };

        store.dispatch<any>(defGuestToken());

        expect(store.getActions()).toEqual([expectedAction]);
    });
});
