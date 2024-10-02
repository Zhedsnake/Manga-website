import getUserInfoReducer, { defUserInfo } from '../../../../store/reducers/getUserInfoByTokenSlice';
import { getUserInfoByToken } from '../../../../store/action-creators/getUserInfoByToken';
import { GetUserInfoState } from '../../../../types/getUserInfo';

describe('getUserInfoSlice reducer tests', () => {

    const initialState: GetUserInfoState = {
        name: "Неизвестно",
        email: "Неизвестно",
        pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        picWebp: "",
        registeredAt: "Неизвестно",
        birthday: "Неизвестно",
        loading: false,
        error: ''
    };

    test('должно быть возвращено исходное состояние', () => {
        expect(getUserInfoReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('должен обрабатывать действие defUserInfo', () => {
        const modifiedState: GetUserInfoState = {
            name: "Иван",
            email: "ivan@example.com",
            pic: "https://example.com/avatar.jpg",
            picWebp: "https://example.com/avatar.webp",
            registeredAt: "2022-01-01",
            birthday: "1990-05-12",
            loading: false,
            error: ''
        };

        const newState = getUserInfoReducer(modifiedState, defUserInfo());
        expect(newState).toEqual(initialState);
    });

    test('должен обрабатывать действие getUserInfoByToken.pending', () => {
        const action = { type: getUserInfoByToken.pending.type };
        const newState = getUserInfoReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            loading: true
        });
    });

    test('должен обрабатывать действие getUserInfoByToken.fulfilled', () => {
        const action = {
            type: getUserInfoByToken.fulfilled.type,
            payload: {
                name: "Иван",
                email: "ivan@example.com",
                pic: "https://example.com/avatar.jpg",
                picWebp: "https://example.com/avatar.webp",
                registeredAt: "2022-01-01",
                birthday: "1990-05-12",
                loading: false,
                error: null
            }
        };
        const newState = getUserInfoReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            name: "Иван",
            email: "ivan@example.com",
            pic: "https://example.com/avatar.jpg",
            picWebp: "https://example.com/avatar.webp",
            registeredAt: "2022-01-01",
            birthday: "1990-05-12",
            loading: false,
            error: ''
        });
    });

    test('должен обрабатывать действие getUserInfoByToken.rejected', () => {
        const action = {
            type: getUserInfoByToken.rejected.type,
            payload: 'Ошибка получения данных пользователя'
        };
        const newState = getUserInfoReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            loading: false,
            error: 'Ошибка получения данных пользователя'
        });
    });
});
