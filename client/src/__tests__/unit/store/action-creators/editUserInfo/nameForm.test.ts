import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import EditUserInfoService from '../../../../../api/EditUserInfoService';
import { editName, defEditName } from '../../../../../store/action-creators/editUserInfo/nameForm';
import { AnyAction } from 'redux';
import { AxiosError, AxiosResponse } from 'axios';
import { EditNameState } from '../../../../../types/editUserInfo/nameForm';
import nameFormReducer from '../../../../../store/reducers/editUserInfo/nameFormSlice';

jest.mock('../../../../../api/EditUserInfoService', () => ({
    __esModule: true,
    default: {
        editNameRequest: jest.fn(),
    },
}));

describe('editName async thunk tests', () => {
    let store: EnhancedStore<{ nameForm: EditNameState }, AnyAction>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                nameForm: nameFormReducer,
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
        const mockMessage = 'Имя успешно изменено';

        (EditUserInfoService.editNameRequest as jest.Mock).mockResolvedValue({
            data: { message: mockMessage },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        } as AxiosResponse<{ message: string }>);

        const action = await store.dispatch(editName('NewName') as any);

        const state = store.getState().nameForm;

        expect(action.type).toBe(editName.fulfilled.type);
        expect(action.payload).toBe(mockMessage);

        expect(state).toEqual({
            message: mockMessage,
            loading: false,
            error: "",
        });
    });

    test('должно диспатчить на не успешное действие с ошибкой при изменении имени', async () => {
        const mockError = 'Ошибка при изменении имени';

        (EditUserInfoService.editNameRequest as jest.Mock).mockRejectedValue({
            isAxiosError: true,
            response: {
                data: { error: mockError },
                status: 400,
                statusText: 'Bad Request',
                headers: {},
                config: {},
            },
        } as AxiosError<{ error: string }>);

        const action = await store.dispatch(editName('InvalidName') as any);

        const state = store.getState().nameForm;

        expect(action.type).toBe(editName.rejected.type);
        expect(action.payload).toBe(mockError);

        expect(state).toEqual({
            message: "",
            loading: false,
            error: mockError,
        });
    });
});

describe('defEditName action test', () => {
    test('должно диспатчить на дефолтное значение', () => {
        const mockDispatch = jest.fn();
        defEditName()(mockDispatch);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'nameForm/defEditName',
        });
    });
});
