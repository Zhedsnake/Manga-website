import getSmallUserInfoReducer, { defSmallUserInfo } from '../../../../store/reducers/getSmallUserInfoByTokenSlice';
import { getSmallUserInfoByToken } from '../../../../store/action-creators/getSmallUserInfoByToken';
import { GetSmallUserInfoState } from '../../../../types/getSmallUserInfo.ts';

jest.mock('../../../../api/UserService', () => ({
    __esModule: true,
    default: {
        getSmallUserInfoRequest: jest.fn(),
    },
}));

describe('getSmallUserInfoSlice reducer tests', () => {
    const initialState: GetSmallUserInfoState = {
        data: {
            name: '',
            pic: '',
            minPicWebp: '',
        },
        loading: false,
        error: '',
    };

    test('должно быть возвращено исходное состояние', () => {
        expect(getSmallUserInfoReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('должен обрабатывать действие defSmallUserInfo', () => {
        const modernInitialState: GetSmallUserInfoState = {
            data: {
                name: 'John Doe',
                pic: 'profile.jpg',
                minPicWebp: 'profile.webp',
            },
            loading: false,
            error: 'Ошибка',
        };

        const newState = getSmallUserInfoReducer(modernInitialState, defSmallUserInfo());
        expect(newState).toEqual(initialState);
    });

    test('должен обрабатывать действие getSmallUserInfo.pending', () => {
        const action = { type: getSmallUserInfoByToken.pending.type };
        const newState = getSmallUserInfoReducer(initialState, action);

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

    test('должен обрабатывать действие getSmallUserInfo.fulfilled', () => {
        const action = {
            type: getSmallUserInfoByToken.fulfilled.type,
            payload: { name: 'John Doe', pic: 'profile.jpg' },
        };
        const newState = getSmallUserInfoReducer(initialState, action);
        expect(newState).toEqual({
            data: {
                name: 'John Doe',
                pic: 'profile.jpg',
                minPicWebp: '',
            },
            loading: false,
            error: '',
        });
    });

    test('должен обрабатывать действие getSmallUserInfo.rejected', () => {
        const action = {
            type: getSmallUserInfoByToken.rejected.type,
            payload: 'Ошибка получения данных',
        };
        const newState = getSmallUserInfoReducer(initialState, action);
        expect(newState).toEqual({
            data: {
                name: '',
                pic: '',
                minPicWebp: '',
            },
            loading: false,
            error: 'Ошибка получения данных',
        });
    });
});
