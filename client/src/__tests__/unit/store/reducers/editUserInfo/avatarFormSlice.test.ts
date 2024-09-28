import avatarFormReducer, { defEditAvatar } from '../../../../../store/reducers/editUserInfo/avatarFormSlice';
import { editAvatar } from '../../../../../store/action-creators/editUserInfo/avatarForm';
import { EditAvatarState } from '../../../../../types/editUserInfo/avatarForm.ts';

jest.mock('../../../../../api/EditUserInfoService', () => ({
    __esModule: true,
    default: {
        editEmailRequest: jest.fn(),
        editNameRequest: jest.fn(),
        editPasswordRequest: jest.fn(),
        editAvatarRequest: jest.fn(),
    },
}));

describe('avatarFormSlice reducer tests', () => {

    const initialState: EditAvatarState = {
        message: "",
        loading: false,
        error: null
    };

    test('должно быть возвращено исходное состояние', () => {
        expect(avatarFormReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('должен обрабатывать действие defEditAvatar', () => {
        const newState = avatarFormReducer(initialState, defEditAvatar());
        expect(newState).toEqual({
            message: "",
            loading: false,
            error: null
        });
    });

    test('должен обрабатывать действие editAvatar.pending', () => {
        const action = { type: editAvatar.pending.type };
        const newState = avatarFormReducer(initialState, action);
        expect(newState).toEqual({
            message: "",
            loading: true,
            error: null
        });
    });

    test('должен обрабатывать действие editAvatar.fulfilled', () => {
        const action = {
            type: editAvatar.fulfilled.type,
            payload: 'Avatar updated successfully'
        };
        const newState = avatarFormReducer(initialState, action);
        expect(newState).toEqual({
            message: 'Avatar updated successfully',
            loading: false,
            error: null
        });
    });

    test('должен обрабатывать действие editAvatar.rejected', () => {
        const action = {
            type: editAvatar.rejected.type,
            payload: 'Avatar update failed'
        };
        const newState = avatarFormReducer(initialState, action);
        expect(newState).toEqual({
            message: "",
            loading: false,
            error: 'Avatar update failed'
        });
    });
});
