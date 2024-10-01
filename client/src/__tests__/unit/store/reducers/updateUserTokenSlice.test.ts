import updateUserTokenReducer, { defUpdateUserToken } from '../../../../store/reducers/updateUserTokenSlice';
import { updateUserToken as updateUserTokenThunk } from '../../../../store/action-creators/updateUserToken';
import { UpdateUserTokenState } from '../../../../types/updateUserToken';

jest.mock('../../../../api/UserService', () => ({
    __esModule: true,
    default: {
        updateUserToken: jest.fn(),
    },
}));

describe('updateUserTokenSlice reducer tests', () => {

    const initialState: UpdateUserTokenState = {
        userToken: '',
        loading: false,
        error: '',
    };

    test('должно быть возвращено исходное состояние', () => {
        expect(updateUserTokenReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('должен обрабатывать действие defUpdateUserToken', () => {
        const modifiedState: UpdateUserTokenState = {
            userToken: 'oldToken',
            loading: true,
            error: 'Some error',
        };

        const newState = updateUserTokenReducer(modifiedState, defUpdateUserToken());
        expect(newState).toEqual({
            userToken: '',
            loading: false,
            error: ''
        });
    });

    test('должен обрабатывать действие updateUserTokenThunk.pending', () => {
        const action = { type: updateUserTokenThunk.pending.type };
        const newState = updateUserTokenReducer(initialState, action);
        expect(newState).toEqual({
            userToken: '',
            loading: true,
            error: ''
        });
    });

    test('должен обрабатывать действие updateUserTokenThunk.fulfilled', () => {
        const action = {
            type: updateUserTokenThunk.fulfilled.type,
            payload: 'userToken123',
        };
        const newState = updateUserTokenReducer(initialState, action);
        expect(newState).toEqual({
            userToken: 'userToken123',
            loading: false,
            error: ''
        });
    });

    test('должен обрабатывать действие updateUserTokenThunk.rejected', () => {
        const action = {
            type: updateUserTokenThunk.rejected.type,
            payload: 'Ошибка обновления токена',
        };
        const newState = updateUserTokenReducer(initialState, action);
        expect(newState).toEqual({
            userToken: '',
            loading: false,
            error: 'Ошибка обновления токена'
        });
    });
});
