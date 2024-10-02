import getSmallUserInfoByTokenReducer, { defSmallUserInfo } from '../../../../store/reducers/getSmallUserInfoByTokenSlice';
import { getSmallUserInfoByToken } from '../../../../store/action-creators/getSmallUserInfoByToken';
import { GetSmallUserInfoState } from '../../../../types/getSmallUserInfo';

describe('getSmallUserInfoByTokenSlice reducer tests', () => {
    const initialState: GetSmallUserInfoState = {
        data: {
            name: '',
            pic: '',
            minPicWebp: '',
        },
        loading: false,
        error: "",
    };

    test('должно быть возвращено исходное состояние', () => {
        expect(getSmallUserInfoByTokenReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('должен обрабатывать действие defSmallUserInfo', () => {
        const modernInitialState: GetSmallUserInfoState = {
            data: {
                name: 'John Doe',
                pic: 'url_to_pic',
                minPicWebp: 'url_to_min_pic',
            },
            loading: false,
            error: 'Some error',
        };

        const newState = getSmallUserInfoByTokenReducer(modernInitialState, defSmallUserInfo());
        expect(newState).toEqual(initialState);
    });

    test('должен обрабатывать действие getSmallUserInfoByToken.pending', () => {
        const action = { type: getSmallUserInfoByToken.pending.type };
        const newState = getSmallUserInfoByTokenReducer(initialState, action);
        expect(newState).toEqual({
            data: {
                name: '',
                pic: '',
                minPicWebp: '',
            },
            loading: true,
            error: '',
        });
    });

    test('должен обрабатывать действие getSmallUserInfoByToken.fulfilled', () => {
        const action = {
            type: getSmallUserInfoByToken.fulfilled.type,
            payload: { name: 'Jane Doe', pic: 'url_to_jane_pic' },
        };
        const newState = getSmallUserInfoByTokenReducer(initialState, action);
        expect(newState).toEqual({
            data: {
                name: 'Jane Doe',
                pic: 'url_to_jane_pic',
                minPicWebp: '',
            },
            loading: false,
            error: '',
        });
    });

    test('должен обрабатывать действие getSmallUserInfoByToken.rejected', () => {
        const action = {
            type: getSmallUserInfoByToken.rejected.type,
            payload: 'Ошибка получения данных пользователя',
        };
        const newState = getSmallUserInfoByTokenReducer(initialState, action);
        expect(newState).toEqual({
            data: {
                name: '',
                pic: '',
                minPicWebp: '',
            },
            loading: false,
            error: 'Ошибка получения данных пользователя',
        });
    });
});
