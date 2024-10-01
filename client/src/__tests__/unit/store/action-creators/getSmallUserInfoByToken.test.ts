import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import UserService from '../../../../api/UserService';
import {getSmallUserInfoByToken} from '../../../../store/action-creators/getSmallUserInfoByToken';
import {AnyAction} from 'redux';
import {AxiosError, AxiosResponse} from 'axios';
import getSmallUserInfoReducer from '../../../../store/reducers/getSmallUserInfoByTokenSlice';
import {GetSmallUserInfoState} from '../../../../types/getSmallUserInfo';

jest.mock('../../../../api/UserService', () => ({
    __esModule: true,
    default: {
        getSmallUserInfoByToken: jest.fn(),
    },
}));

describe('getSmallUserInfo async thunk tests', () => {
    let store: EnhancedStore<{ smallUserInfo: GetSmallUserInfoState }, AnyAction>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                smallUserInfo: getSmallUserInfoReducer,
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
        const mockUserInfo = {name: 'user', pic: 'userPic.jpg'};

        (UserService.getSmallUserInfoByToken as jest.Mock).mockResolvedValue({
            data: mockUserInfo,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        } as AxiosResponse<{ name: string; pic: string }>);

        const action = await store.dispatch(getSmallUserInfoByToken() as any);
        const state = store.getState().smallUserInfo;

        expect(action.type).toBe(getSmallUserInfoByToken.fulfilled.type);
        expect(action.payload).toEqual(mockUserInfo);

        expect(state).toEqual({
            data: {
                minPicWebp: "",
                name: "user",
                pic: "userPic.jpg"
            },
            error: '',
            loading: false,
        });
    });

    test('должно диспатчить на не успешное действие с ошибкой', async () => {
        const mockError = 'Ошибка получения информации о пользователе';

        (UserService.getSmallUserInfoByToken as jest.Mock).mockRejectedValue({
            isAxiosError: true,
            response: {
                data: {error: mockError},
                status: 400,
                statusText: 'Bad Request',
                headers: {},
                config: {},
            },
        } as AxiosError<{ error: string }>);

        const action = await store.dispatch(getSmallUserInfoByToken() as any);
        const state = store.getState().smallUserInfo;

        expect(action.type).toBe(getSmallUserInfoByToken.rejected.type);
        expect(action.payload).toBe(mockError);

        expect(state).toEqual({
            data: {
                minPicWebp: "",
                name: "",
                pic: "",
            },
            error: mockError,
            loading: false,
        });
    });
});
