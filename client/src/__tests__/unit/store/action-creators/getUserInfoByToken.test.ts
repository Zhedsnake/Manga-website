import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import UserService from '../../../../api/UserService';
import { getUserInfoByToken } from '../../../../store/action-creators/getUserInfoByToken';
import { AxiosError, AxiosResponse } from 'axios';
import { GetUserInfoState } from '../../../../types/getUserInfo';
import getUserInfoReducer from '../../../../store/reducers/getUserInfoByTokenSlice';
import { AnyAction } from 'redux';

jest.mock('../../../../api/UserService', () => ({
    __esModule: true,
    default: {
        getUserInfoByToken: jest.fn(),
    },
}));

describe('getUserInfoByToken async thunk tests', () => {
    let store: EnhancedStore<{ userInfo: GetUserInfoState }, AnyAction>;

    const initialState: GetUserInfoState = {
        name: "Неизвестно",
        email: "Неизвестно",
        pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        picWebp: "",
        registeredAt: "Неизвестно",
        birthday: "Неизвестно",
        loading: false,
        error: ''
    };

    beforeEach(() => {
        store = configureStore({
            reducer: {
                userInfo: getUserInfoReducer,
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

    test('должно диспатчить успешное действие getUserInfoByToken', async () => {
        const mockUserInfo: GetUserInfoState = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            pic: 'https://example.com/avatar.jpg',
            picWebp: 'https://example.com/avatar.webp',
            registeredAt: '2024-01-01',
            birthday: '1990-01-01',
            loading: false,
            error: '',
        };

        (UserService.getUserInfoByToken as jest.Mock).mockResolvedValue({
            data: mockUserInfo,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {}
        } as AxiosResponse<GetUserInfoState>);

        const action = await store.dispatch(getUserInfoByToken() as any);
        const state = store.getState().userInfo;

        expect(action.type).toBe(getUserInfoByToken.fulfilled.type);
        expect(action.payload).toEqual(mockUserInfo);

        expect(state).toEqual({
            ...mockUserInfo,
            loading: false,
            error: ''
        });
    });

    test('должно диспатчить неуспешное действие getUserInfoByToken с ошибкой', async () => {
        const mockError = 'Ошибка при получении данных пользователя';

        (UserService.getUserInfoByToken as jest.Mock).mockRejectedValue({
            isAxiosError: true,
            response: {
                data: { error: mockError },
                status: 400,
                statusText: 'Bad Request',
                headers: {},
                config: {},
            },
        } as AxiosError<{ error: string }>);

        const action = await store.dispatch(getUserInfoByToken() as any);
        const state = store.getState().userInfo;

        expect(action.type).toBe(getUserInfoByToken.rejected.type);
        expect(action.payload).toBe(mockError);

        expect(state).toEqual({
            ...initialState,
            loading: false,
            error: mockError
        });
    });
});
