import emailFormReducer, { defEditEmail } from '../../../../../store/reducers/editUserInfo/emailFormSlice';
import { editEmail } from '../../../../../store/action-creators/editUserInfo/emailForm';
import { EditEmailState } from '../../../../../types/editUserInfo/emailForm';

describe('emailFormSlice reducer tests', () => {

    const initialState: EditEmailState = {
        message: '',
        loading: false,
        error: '',
    };

    test('должно быть возвращено исходное состояние', () => {
        expect(emailFormReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('должен обрабатывать действие defEditEmail', () => {
        const newState = emailFormReducer(initialState, defEditEmail());
        expect(newState).toEqual({
            message: '',
            loading: false,
            error: ''
        });
    });

    test('должен обрабатывать действие editEmail.pending', () => {
        const action = { type: editEmail.pending.type };
        const newState = emailFormReducer(initialState, action);
        expect(newState).toEqual({
            message: '',
            loading: true,
            error: ''
        });
    });

    test('должен обрабатывать действие editEmail.fulfilled', () => {
        const action = {
            type: editEmail.fulfilled.type,
            payload: 'Email успешно обновлен'
        };
        const newState = emailFormReducer(initialState, action);
        expect(newState).toEqual({
            message: 'Email успешно обновлен',
            loading: false,
            error: ''
        });
    });

    test('должен обрабатывать действие editEmail.rejected', () => {
        const action = {
            type: editEmail.rejected.type,
            payload: 'Ошибка обновления email'
        };
        const newState = emailFormReducer(initialState, action);
        expect(newState).toEqual({
            message: '',
            loading: false,
            error: 'Ошибка обновления email'
        });
    });
});
