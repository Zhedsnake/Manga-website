import emailFormReducer, { defEditEmail } from '../../../../../store/reducers/editUserInfo/emailFormSlice';
import { editEmail } from '../../../../../store/action-creators/editUserInfo/emailForm';
import { EditEmailState } from '../../../../../types/editUserInfo/emailForm';


jest.mock('../../../../../api/EditUserInfoService', () => ({
    __esModule: true,
    default: {
        editEmailRequest: jest.fn(),
        editNameRequest: jest.fn(),
        editPasswordRequest: jest.fn(),
        editAvatarRequest: jest.fn(),
    },
}));

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
            message: "",
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