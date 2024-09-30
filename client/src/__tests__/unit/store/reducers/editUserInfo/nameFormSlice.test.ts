import nameFormReducer, { defEditName } from '../../../../../store/reducers/editUserInfo/nameFormSlice';
import { editName } from '../../../../../store/action-creators/editUserInfo/nameForm';
import { EditNameState } from '../../../../../types/editUserInfo/nameForm';

jest.mock('../../../../../api/EditUserInfoService', () => ({
    __esModule: true,
    default: {
        editNameRequest: jest.fn(),
    },
}));

describe('nameFormSlice reducer tests', () => {

    const initialState: EditNameState = {
        message: '',
        loading: false,
        error: '',
    };

    test('должно быть возвращено исходное состояние', () => {
        expect(nameFormReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('должен обрабатывать действие defEditName', () => {
        const initialState: EditNameState = {
            message: 'sxsx',
            loading: false,
            error: 'sxsxs',
        };

        const newState = nameFormReducer(initialState, defEditName());
        expect(newState).toEqual({
            message: '',
            loading: false,
            error: ''
        });
    });

    test('должен обрабатывать действие editName.pending', () => {
        const action = { type: editName.pending.type };
        const newState = nameFormReducer(initialState, action);
        expect(newState).toEqual({
            message: '',
            loading: true,
            error: ''
        });
    });

    test('должен обрабатывать действие editName.fulfilled', () => {
        const action = {
            type: editName.fulfilled.type,
            payload: 'Имя успешно обновлено'
        };
        const newState = nameFormReducer(initialState, action);
        expect(newState).toEqual({
            message: 'Имя успешно обновлено',
            loading: false,
            error: ''
        });
    });

    test('должен обрабатывать действие editName.rejected', () => {
        const action = {
            type: editName.rejected.type,
            payload: 'Ошибка обновления имени'
        };
        const newState = nameFormReducer(initialState, action);
        expect(newState).toEqual({
            message: '',
            loading: false,
            error: 'Ошибка обновления имени'
        });
    });
});
