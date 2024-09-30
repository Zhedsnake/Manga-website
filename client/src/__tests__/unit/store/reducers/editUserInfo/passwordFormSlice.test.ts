import passwordFormReducer, { defEditPassword } from '../../../../../store/reducers/editUserInfo/passwordFormSlice';
import { editPassword } from '../../../../../store/action-creators/editUserInfo/passwordForm';
import { EditPasswordState } from '../../../../../types/editUserInfo/passwordForm';

jest.mock('../../../../../api/EditUserInfoService', () => ({
    __esModule: true,
    default: {
        editPasswordRequest: jest.fn(),
    },
}));

describe('passwordFormSlice reducer tests', () => {

    const initialState: EditPasswordState = {
        message: '',
        loading: false,
        error: '',
    };

    test('должно быть возвращено исходное состояние', () => {
        expect(passwordFormReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('должен обрабатывать действие defEditPassword', () => {
        const initialState: EditPasswordState = {
            message: 'sxsx',
            loading: false,
            error: 'sxsx',
        };

        const newState = passwordFormReducer(initialState, defEditPassword());
        expect(newState).toEqual({
            message: '',
            loading: false,
            error: ''
        });
    });

    test('должен обрабатывать действие editPassword.pending', () => {
        const action = { type: editPassword.pending.type };
        const newState = passwordFormReducer(initialState, action);
        expect(newState).toEqual({
            message: '',
            loading: true,
            error: ''
        });
    });

    test('должен обрабатывать действие editPassword.fulfilled', () => {
        const action = {
            type: editPassword.fulfilled.type,
            payload: 'Пароль успешно обновлен'
        };
        const newState = passwordFormReducer(initialState, action);
        expect(newState).toEqual({
            message: 'Пароль успешно обновлен',
            loading: false,
            error: ''
        });
    });

    test('должен обрабатывать действие editPassword.rejected', () => {
        const action = {
            type: editPassword.rejected.type,
            payload: 'Ошибка обновления пароля'
        };
        const newState = passwordFormReducer(initialState, action);
        expect(newState).toEqual({
            message: '',
            loading: false,
            error: 'Ошибка обновления пароля'
        });
    });
});
