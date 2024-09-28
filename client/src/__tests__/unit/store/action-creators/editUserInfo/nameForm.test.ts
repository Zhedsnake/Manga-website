import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import EditUserInfoService from '../../../../../api/EditUserInfoService';
import { editName, defEditName } from '../../../../../store/action-creators/editUserInfo/nameForm';
import nameFormReducer from '../../../../../store/reducers/editUserInfo/nameFormSlice';
import { EditNameState } from '../../../../../types/editUserInfo/nameForm';
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

describe('editName async thunk tests', () => {
    let store: EnhancedStore<{ nameForm: EditNameState }, AnyAction>;

    beforeEach(() => {
        jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
            if (key === 'user-token') return 'mocked-token';
            return null;
        });

        store = configureStore({
            reducer: {
                nameForm: nameFormReducer
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
        const mockMessage = 'Name updated successfully';

        (EditUserInfoService.editNameRequest as jest.Mock).mockResolvedValue({
            data: { message: mockMessage },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {}
        } as AxiosResponse<{ message: string }>);

        await store.dispatch(editName('New Name') as any);

        const state = store.getState().nameForm;
        expect(state).toEqual({
            message: mockMessage,
            loading: false,
            error: null
        });
    });

    test('должно диспатчить на не успешное действие', async () => {
        const mockError = 'Произошла ошибка при изменении имени';

        (EditUserInfoService.editNameRequest as jest.Mock).mockRejectedValue(new Error(mockError));

        await store.dispatch(editName('Invalid Name') as any);

        const state = store.getState().nameForm;
        expect(state).toEqual({
            message: "",
            loading: false,
            error: mockError
        });
    });
});

describe('defEditName action test', () => {

    test('должно диспатчить на дефолтное значение', () => {
        const mockDispatch = jest.fn();
        defEditName()(mockDispatch);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'nameForm/defEditName'
        });
    });
});
