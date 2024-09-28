import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import EditUserInfoService from '../../../../../api/EditUserInfoService';
import { editEmail, defEditEmail } from '../../../../../store/action-creators/editUserInfo/emailForm';
import emailFormReducer from '../../../../../store/reducers/editUserInfo/emailFormSlice';
import { EditEmailState } from '../../../../../types/editUserInfo/emailForm';
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


describe('editEmail async thunk tests', () => {
    let store: EnhancedStore<{ emailForm: EditEmailState }, AnyAction>;

    beforeEach(() => {
        jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
            if (key === 'user-token') return 'mocked-token';
            return null;
        });

        store = configureStore({
            reducer: {
                emailForm: emailFormReducer
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
        const mockMessage = 'Email updated successfully';

        (EditUserInfoService.editEmailRequest as jest.Mock).mockResolvedValue({
            data: { message: mockMessage },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {}
        } as AxiosResponse<{ message: string }>);

        await store.dispatch(editEmail('new-email@example.com') as any);

        const state = store.getState().emailForm;
        expect(state).toEqual({
            message: mockMessage,
            loading: false,
            error: null
        });
    });

    test('должно диспатчить на не успешное действие', async () => {
        const mockError = 'Произошла ошибка при изменении email';

        (EditUserInfoService.editEmailRequest as jest.Mock).mockRejectedValue(new Error(mockError));

        await store.dispatch(editEmail('invalid-email@example.com') as any);

        const state = store.getState().emailForm;
        expect(state).toEqual({
            message: "",
            loading: false,
            error: mockError
        });
    });
});

describe('defEditEmail action test', () => {

    test('должно диспатчить на дефолтное значение', () => {
        const mockDispatch = jest.fn();
        defEditEmail()(mockDispatch);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'emailForm/defEditEmail'
        });
    });
});