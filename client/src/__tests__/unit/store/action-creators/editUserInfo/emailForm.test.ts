import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import EditUserInfoService from '../../../../../api/EditUserInfoService';
import { editEmail } from '../../../../../store/action-creators/editUserInfo/emailForm';
import { AnyAction } from 'redux';
import { AxiosError, AxiosResponse } from 'axios';
import { EditEmailState } from '../../../../../types/editUserInfo/emailForm';
import emailFormReducer from '../../../../../store/reducers/editUserInfo/emailFormSlice';

jest.mock('../../../../../api/EditUserInfoService', () => ({
    __esModule: true,
    default: {
        editEmailRequest: jest.fn(),
    },
}));

describe('editEmail async thunk tests', () => {
    let store: EnhancedStore<{ emailForm: EditEmailState }, AnyAction>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                emailForm: emailFormReducer,
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
        const mockMessage = 'Email успешно изменён';

        (EditUserInfoService.editEmailRequest as jest.Mock).mockResolvedValue({
            data: { message: mockMessage },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        } as AxiosResponse<{ message: string }>);

        const action = await store.dispatch(editEmail('newemail@example.com') as any);

        const state = store.getState().emailForm;

        expect(action.type).toBe(editEmail.fulfilled.type);
        expect(action.payload).toBe(mockMessage);

        expect(state).toEqual({
            message: mockMessage,
            loading: false,
            error: "",
        });
    });

    test('должно диспатчить на не успешное действие с ошибкой при изменении email', async () => {
        const mockError = 'Ошибка при изменении email';

        (EditUserInfoService.editEmailRequest as jest.Mock).mockRejectedValue({
            isAxiosError: true,
            response: {
                data: { error: mockError },
                status: 400,
                statusText: 'Bad Request',
                headers: {},
                config: {},
            },
        } as AxiosError<{ error: string }>);

        const action = await store.dispatch(editEmail('invalid-email') as any);

        const state = store.getState().emailForm;

        expect(action.type).toBe(editEmail.rejected.type);
        expect(action.payload).toBe(mockError);

        expect(state).toEqual({
            message: "",
            loading: false,
            error: mockError,
        });
    });
});

