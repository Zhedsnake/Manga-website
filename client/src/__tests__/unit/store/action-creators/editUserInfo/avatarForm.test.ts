import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import EditUserInfoService from '../../../../../api/EditUserInfoService';
import { editAvatar, defEditAvatar } from '../../../../../store/action-creators/editUserInfo/avatarForm';
import avatarFormReducer from '../../../../../store/reducers/editUserInfo/avatarFormSlice';
import { EditAvatarState } from '../../../../../types/editUserInfo/avatarForm';
import { AnyAction } from 'redux';
import { AxiosResponse } from 'axios';

jest.mock('../../../../../api/EditUserInfoService', () => ({
    __esModule: true,
    default: {
        editEmailRequest: jest.fn(),
        editNameRequest: jest.fn(),
        editPasswordRequest: jest.fn(),
        editAvatarRequest: jest.fn(),
    },
}));

describe('editAvatar async thunk tests', () => {
    let store: EnhancedStore<{ avatarForm: EditAvatarState }, AnyAction>;

    beforeEach(() => {
        jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
            if (key === 'user-token') return 'mocked-token';
            return null;
        });

        store = configureStore({
            reducer: {
                avatarForm: avatarFormReducer
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
        const mockMessage = 'Avatar updated successfully';
        const mockAvatar = new FormData(); // Создайте объект FormData для теста

        (EditUserInfoService.editAvatarRequest as jest.Mock).mockResolvedValue({
            data: { message: mockMessage },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {}
        } as AxiosResponse<{ message: string }>);

        await store.dispatch(editAvatar(mockAvatar) as any);

        const state = store.getState().avatarForm;
        expect(state).toEqual({
            message: mockMessage,
            loading: false,
            error: null
        });
    });

    test('должно диспатчить на не успешное действие', async () => {
        const mockError = 'Произошла ошибка при изменении аватара';
        const mockAvatar = new FormData(); // Создайте объект FormData для теста

        (EditUserInfoService.editAvatarRequest as jest.Mock).mockRejectedValue(new Error(mockError));

        await store.dispatch(editAvatar(mockAvatar) as any);

        const state = store.getState().avatarForm;
        expect(state).toEqual({
            message: "",
            loading: false,
            error: mockError
        });
    });
});

describe('defEditAvatar action test', () => {

    test('должно диспатчить на дефолтное значение', () => {
        const mockDispatch = jest.fn();
        defEditAvatar()(mockDispatch);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'avatarForm/defEditAvatar'
        });
    });
});
