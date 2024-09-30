import avatarFormReducer, { defEditAvatar } from '../../../../../store/reducers/editUserInfo/avatarFormSlice';
import { editAvatar } from '../../../../../store/action-creators/editUserInfo/avatarForm';
import { EditAvatarState } from '../../../../../types/editUserInfo/avatarForm';

jest.mock('../../../../../api/EditUserInfoService', () => ({
    __esModule: true,
    default: {
        editAvatarRequest: jest.fn(),
    },
}));

describe('avatarFormSlice reducer tests', () => {

    const initialState: EditAvatarState = {
        message: '',
        loading: false,
        error: '',
    };

    test('должно быть возвращено исходное состояние', () => {
        expect(avatarFormReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('должен обрабатывать действие defEditAvatar', () => {
        const newState = avatarFormReducer(initialState, defEditAvatar());
        expect(newState).toEqual({
            message: '',
            loading: false,
            error: ''
        });
    });

    test('должен обрабатывать действие editAvatar.pending', () => {
        const action = { type: editAvatar.pending.type };
        const newState = avatarFormReducer(initialState, action);
        expect(newState).toEqual({
            message: '',
            loading: true,
            error: ''
        });
    });

    test('должен обрабатывать действие editAvatar.fulfilled', () => {
        const action = {
            type: editAvatar.fulfilled.type,
            payload: 'Аватар успешно обновлен'
        };
        const newState = avatarFormReducer(initialState, action);
        expect(newState).toEqual({
            message: 'Аватар успешно обновлен',
            loading: false,
            error: ''
        });
    });

    test('должен обрабатывать действие editAvatar.rejected', () => {
        const action = {
            type: editAvatar.rejected.type,
            payload: 'Ошибка обновления аватара'
        };
        const newState = avatarFormReducer(initialState, action);
        expect(newState).toEqual({
            message: '',
            loading: false,
            error: 'Ошибка обновления аватара'
        });
    });
});
