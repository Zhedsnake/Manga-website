import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import UserService from '../../../../api/UserService';
import { getSmallUserInfoByToken } from '../../../../store/action-creators/getSmallUserInfoByToken';
import { AnyAction } from 'redux';
import { AxiosError, AxiosResponse } from 'axios';
import { GetSmallUserInfoState } from '../../../../types/getSmallUserInfo';
import getSmallUserInfoReducer from '../../../../store/reducers/getSmallUserInfoByTokenSlice';

jest.mock('../../../../api/UserService', () => ({
    __esModule: true,
    default: {
        getSmallUserInfoByToken: jest.fn(),
    },
}));

describe('getSmallUserInfoByToken async thunk tests', () => {
    let store: EnhancedStore<{ getSmallUserInfo: GetSmallUserInfoState }, AnyAction>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                getSmallUserInfo: getSmallUserInfoReducer,
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

    test('должно диспатчить на успешное действие', async () => {
        const mockResponseData = { name: 'user', pic: 'userPicUrl', minPicWebp: '' };

        (UserService.getSmallUserInfoByToken as jest.Mock).mockResolvedValue({
            data: mockResponseData,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: {} },
        } as AxiosResponse<{ name: string; pic?: string; minPicWebp?: string }>);

        const action = await store.dispatch(getSmallUserInfoByToken() as any);

        const state = store.getState().getSmallUserInfo;

        expect(action.type).toBe(getSmallUserInfoByToken.fulfilled.type);
        expect(action.payload).toEqual(mockResponseData);

        expect(state).toEqual({
            data: mockResponseData,
            loading: false,
            error: '',
        });
    });

    test('должно диспатчить на успешное действие с minPicWebp', async () => {
        const mockResponseData = { name: 'user', minPicWebp: 'userPicWebpUrl' };

        (UserService.getSmallUserInfoByToken as jest.Mock).mockResolvedValue({
            data: mockResponseData,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: {} },
        } as AxiosResponse<{ name: string; pic?: string; minPicWebp?: string }>);

        const action = await store.dispatch(getSmallUserInfoByToken() as any);

        const state = store.getState().getSmallUserInfo;

        expect(action.type).toBe(getSmallUserInfoByToken.fulfilled.type);
        expect(action.payload).toEqual(mockResponseData);

        expect(state).toEqual({
            data: {
                name: 'user',
                pic: '',
                minPicWebp: 'userPicWebpUrl',
            },
            loading: false,
            error: '',
        });
    });

    test('должно диспатчить на не успешное действие с ошибкой при получении информации о пользователе', async () => {
        const mockError = 'Ошибка при получении информации о пользователе';

        (UserService.getSmallUserInfoByToken as jest.Mock).mockRejectedValue({
            isAxiosError: true,
            response: {
                data: { error: mockError },
                status: 400,
                statusText: 'Bad Request',
                headers: {},
                config: { headers: {} },
            },
        } as AxiosError<{ error: string }>);

        const action = await store.dispatch(getSmallUserInfoByToken() as any);

        const state = store.getState().getSmallUserInfo;

        expect(action.type).toBe(getSmallUserInfoByToken.rejected.type);
        expect(action.payload).toBe(mockError);

        expect(state).toEqual({
            data: { name: '', pic: '', minPicWebp: '' },
            loading: false,
            error: mockError,
        });
    });
});
