import authFormReducer, { setName, setEmail, setPassword, defAuthForm } from '../../../../../store/reducers/authForm/authFormSlice';
import { AuthFormState } from '../../../../../types/authForm/authForm.ts';

describe('authFormSlice reducer tests', () => {
    const initialState: AuthFormState = {
        name: '',
        email: '',
        password: '',
    };

    test('должно быть возвращено исходное состояние', () => {
        expect(authFormReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('должен обрабатывать действие setName', () => {
        const action = setName('John Doe');
        const newState = authFormReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            name: 'John Doe',
        });
    });

    test('должен обрабатывать действие setEmail', () => {
        const action = setEmail('john.doe@example.com');
        const newState = authFormReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            email: 'john.doe@example.com',
        });
    });

    test('должен обрабатывать действие setPassword', () => {
        const action = setPassword('securePassword123');
        const newState = authFormReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            password: 'securePassword123',
        });
    });

    test('должен обрабатывать действие defAuthForm', () => {
        const newState = authFormReducer(initialState, defAuthForm());
        expect(newState).toEqual(initialState);
    });
});
