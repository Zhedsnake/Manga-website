import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import EditUserInfoService from '../../../../../api/EditUserInfoService';
import { editPassword, defEditPassword } from '../../../../../store/action-creators/editUserInfo/passwordForm';
import passwordFormReducer from '../../../../../store/reducers/editUserInfo/passwordFormSlice';
import { EditPasswordState } from '../../../../../types/editUserInfo/passwordForm';
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

describe('editPassword async thunk tests', () => {
    let store: EnhancedStore<{ passwordForm: EditPasswordState }, AnyAction>;

    beforeEach(() => {
        jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
            if (key === 'user-token') return 'mocked-token';
            return null;
        });

        store = configureStore({
            reducer: {
                passwordForm: passwordFormReducer
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
        const mockMessage = 'Password updated successfully';

        (EditUserInfoService.editPasswordRequest as jest.Mock).mockResolvedValue({
            data: { message: mockMessage },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {}
        } as AxiosResponse<{ message: string }>);

        await store.dispatch(editPassword({ oldPassword: 'oldPassword', newPassword: 'newPassword' }) as any);

        const state = store.getState().passwordForm;
        expect(state).toEqual({
            message: mockMessage,
            loading: false,
            error: null
        });
    });

    test('должно диспатчить на не успешное действие', async () => {
        const mockError = 'Произошла ошибка при изменении пароля';

        (EditUserInfoService.editPasswordRequest as jest.Mock).mockRejectedValue(new Error(mockError));

        await store.dispatch(editPassword({ oldPassword: 'oldPassword', newPassword: 'newPassword' }) as any);

        const state = store.getState().passwordForm;
        expect(state).toEqual({
            message: "",
            loading: false,
            error: mockError
        });
    });
});

describe('defEditPassword action test', () => {

    test('должно диспатчить на дефолтное значение', () => {
        const mockDispatch = jest.fn();
        defEditPassword()(mockDispatch);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'passwordForm/defEditPassword'
        });
    });
});
