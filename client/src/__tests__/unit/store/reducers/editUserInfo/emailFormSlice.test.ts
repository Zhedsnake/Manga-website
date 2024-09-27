import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import emailFormReducer, { defEditEmail } from '../../../../../store/reducers/editUserInfo/emailFormSlice';
import { editEmail } from '../../../../../store/action-creators/editUserInfo/emailForm';
import EditUserInfoService from '../../../../../api/EditUserInfoService';
import { EditEmailState } from '../../../../../types/editUserInfo/emailForm';
import { AnyAction } from 'redux';
import { AxiosResponse } from 'axios';

// Изменение для github

describe('emailFormSlice reducer tests', () => {

    const initialState: EditEmailState = {
        message: "",
        loading: false,
        error: null
    };

    test('должно быть возвращено исходное состояние', () => {
        expect(emailFormReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('должен обрабатывать действие defEditEmail', () => {
        const newState = emailFormReducer(initialState, defEditEmail());
        expect(newState).toEqual({
            message: 'default_email_message',
            loading: false,
            error: null
        });
    });

    test('должен обрабатывать действие editEmail.pending', () => {
        const action = { type: editEmail.pending.type };
        const newState = emailFormReducer(initialState, action);
        expect(newState).toEqual({
            message: "",
            loading: true,
            error: null
        });
    });

    test('должен обрабатывать действие editEmail.fulfilled', () => {
        const action = {
            type: editEmail.fulfilled.type,
            payload: 'Email updated successfully'
        };
        const newState = emailFormReducer(initialState, action);
        expect(newState).toEqual({
            message: 'Email updated successfully',
            loading: false,
            error: null
        });
    });

    test('должен обрабатывать действие editEmail.rejected', () => {
        const action = {
            type: editEmail.rejected.type,
            payload: 'Email update failed'
        };
        const newState = emailFormReducer(initialState, action);
        expect(newState).toEqual({
            message: "",
            loading: false,
            error: 'Email update failed'
        });
    });
});


// Тестирование асинхронных экшенов с использованием реального хранилища
describe('editEmail async thunk tests', () => {

    let store: EnhancedStore<{ emailForm: EditEmailState }, AnyAction>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                emailForm: emailFormReducer
            },
            middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('направляет правильные действия на достижение успеха', async () => {
        const mockMessage = 'Email updated successfully';
        jest.spyOn(EditUserInfoService, 'editEmailRequest').mockResolvedValue({
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

    test('отправляет правильные действия в случае сбоя', async () => {
        const mockError = 'Произошла ошибка при изменении email'; // Изменяем на реальную ошибку
        jest.spyOn(EditUserInfoService, 'editEmailRequest').mockRejectedValue({
            error: mockError
        } as any);

        await store.dispatch(editEmail('invalid-email@example.com') as any);

        const state = store.getState().emailForm;
        expect(state).toEqual({
            message: "",
            loading: false,
            error: mockError
        });
    });
});
