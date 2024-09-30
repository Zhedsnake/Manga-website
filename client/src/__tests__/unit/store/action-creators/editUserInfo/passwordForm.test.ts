import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import EditUserInfoService from '../../../../../api/EditUserInfoService';
import { editPassword } from '../../../../../store/action-creators/editUserInfo/passwordForm';
import { AnyAction } from 'redux';
import { AxiosError, AxiosResponse } from 'axios';
import { EditPasswordState } from '../../../../../types/editUserInfo/passwordForm';
import passwordFormReducer from '../../../../../store/reducers/editUserInfo/passwordFormSlice';

jest.mock('../../../../../api/EditUserInfoService', () => ({
    __esModule: true,
    default: {
        editPasswordRequest: jest.fn(),
    },
}));

describe('editPassword async thunk tests', () => {
    let store: EnhancedStore<{ passwordForm: EditPasswordState }, AnyAction>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                passwordForm: passwordFormReducer,
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
        const mockMessage = 'Пароль успешно изменён';

        (EditUserInfoService.editPasswordRequest as jest.Mock).mockResolvedValue({
            data: { message: mockMessage },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        } as AxiosResponse<{ message: string }>);

        const action = await store.dispatch(editPassword({ oldPassword: 'oldPass', newPassword: 'newPass' }) as any);

        const state = store.getState().passwordForm;

        expect(action.type).toBe(editPassword.fulfilled.type);
        expect(action.payload).toBe(mockMessage);

        expect(state).toEqual({
            message: mockMessage,
            loading: false,
            error: "",
        });
    });

    test('должно диспатчить на не успешное действие с ошибкой при изменении пароля', async () => {
        const mockError = 'Ошибка при изменении пароля';

        (EditUserInfoService.editPasswordRequest as jest.Mock).mockRejectedValue({
            isAxiosError: true,
            response: {
                data: { error: mockError },
                status: 400,
                statusText: 'Bad Request',
                headers: {},
                config: {},
            },
        } as AxiosError<{ error: string }>);

        const action = await store.dispatch(editPassword({ oldPassword: 'oldPass', newPassword: 'wrongPass' }) as any);

        const state = store.getState().passwordForm;

        expect(action.type).toBe(editPassword.rejected.type);
        expect(action.payload).toBe(mockError);

        expect(state).toEqual({
            message: "",
            loading: false,
            error: mockError,
        });
    });
});
