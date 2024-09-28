import passwordFormReducer, { defEditPassword } from '../../../../../store/reducers/editUserInfo/passwordFormSlice';
import { editPassword } from '../../../../../store/action-creators/editUserInfo/passwordForm';
import { EditPasswordState } from '../../../../../types/editUserInfo/passwordForm.ts';

jest.mock('../../../../../api/EditUserInfoService', () => ({
    __esModule: true,
    default: {
        editEmailRequest: jest.fn(),
        editNameRequest: jest.fn(),
        editPasswordRequest: jest.fn(),
        editAvatarRequest: jest.fn(),
    },
}));

describe('passwordFormSlice reducer tests', () => {

    const initialState: EditPasswordState = {
        message: "",
        loading: false,
        error: null
    };

    test('должно быть возвращено исходное состояние', () => {
        expect(passwordFormReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('должен обрабатывать действие defEditPassword', () => {
        const newState = passwordFormReducer(initialState, defEditPassword());
        expect(newState).toEqual({
            message: "",
            loading: false,
            error: null
        });
    });

    test('должен обрабатывать действие editPassword.pending', () => {
        const action = { type: editPassword.pending.type };
        const newState = passwordFormReducer(initialState, action);
        expect(newState).toEqual({
            message: "",
            loading: true,
            error: null
        });
    });

    test('должен обрабатывать действие editPassword.fulfilled', () => {
        const action = {
            type: editPassword.fulfilled.type,
            payload: 'Password updated successfully'
        };
        const newState = passwordFormReducer(initialState, action);
        expect(newState).toEqual({
            message: 'Password updated successfully',
            loading: false,
            error: null
        });
    });

    test('должен обрабатывать действие editPassword.rejected', () => {
        const action = {
            type: editPassword.rejected.type,
            payload: 'Password update failed'
        };
        const newState = passwordFormReducer(initialState, action);
        expect(newState).toEqual({
            message: "",
            loading: false,
            error: 'Password update failed'
        });
    });
});
