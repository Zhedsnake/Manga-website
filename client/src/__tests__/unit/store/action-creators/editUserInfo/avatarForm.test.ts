import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import EditUserInfoService from '../../../../../api/EditUserInfoService';
import { editAvatar } from '../../../../../store/action-creators/editUserInfo/avatarForm';
import { AnyAction } from 'redux';
import { AxiosError, AxiosResponse } from 'axios';
import { EditAvatarState } from '../../../../../types/editUserInfo/avatarForm';
import avatarFormReducer from '../../../../../store/reducers/editUserInfo/avatarFormSlice';

jest.mock('../../../../../api/EditUserInfoService', () => ({
    __esModule: true,
    default: {
        editAvatarRequest: jest.fn(),
    },
}));

describe('editAvatar async thunk tests', () => {
    let store: EnhancedStore<{ avatarForm: EditAvatarState }, AnyAction>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                avatarForm: avatarFormReducer,
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
        const mockMessage = 'Аватар успешно изменён';

        (EditUserInfoService.editAvatarRequest as jest.Mock).mockResolvedValue({
            data: { message: mockMessage },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        } as AxiosResponse<{ message: string }>);

        const action = await store.dispatch(editAvatar(new FormData()) as any);

        const state = store.getState().avatarForm;

        expect(action.type).toBe(editAvatar.fulfilled.type);
        expect(action.payload).toBe(mockMessage);

        expect(state).toEqual({
            message: mockMessage,
            loading: false,
            error: "",
        });
    });

    test('должно диспатчить на не успешное действие с ошибкой при изменении аватара', async () => {
        const mockError = 'Ошибка при изменении аватара';

        (EditUserInfoService.editAvatarRequest as jest.Mock).mockRejectedValue({
            isAxiosError: true,
            response: {
                data: { error: mockError },
                status: 400,
                statusText: 'Bad Request',
                headers: {},
                config: {},
            },
        } as AxiosError<{ error: string }>);

        const action = await store.dispatch(editAvatar(new FormData()) as any);

        const state = store.getState().avatarForm;

        expect(action.type).toBe(editAvatar.rejected.type);
        expect(action.payload).toBe(mockError);

        expect(state).toEqual({
            message: "",
            loading: false,
            error: mockError,
        });
    });
});
