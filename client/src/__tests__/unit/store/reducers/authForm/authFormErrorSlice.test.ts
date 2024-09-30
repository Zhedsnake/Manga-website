import authFormErrorReducer, {
    setNameError,
    setEmailError,
    setPasswordError,
    defAuthFormError,
} from '../../../../../store/reducers/authForm/authFormErrorSlice';
import { AuthFormErrorState } from '../../../../../types/authForm/authFormError.ts';

describe('authFormErrorSlice reducer tests', () => {
    const initialState: AuthFormErrorState = {
        nameError: '',
        emailError: '',
        passwordError: '',
    };

    test('должно быть возвращено исходное состояние', () => {
        expect(authFormErrorReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('должен обрабатывать действие setNameError', () => {
        const errorMessage = 'Имя не может быть пустым';
        const action = setNameError(errorMessage);
        const newState = authFormErrorReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            nameError: errorMessage,
        });
    });

    test('должен обрабатывать действие setEmailError', () => {
        const errorMessage = 'Email некорректен';
        const action = setEmailError(errorMessage);
        const newState = authFormErrorReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            emailError: errorMessage,
        });
    });

    test('должен обрабатывать действие setPasswordError', () => {
        const errorMessage = 'Пароль слишком короткий';
        const action = setPasswordError(errorMessage);
        const newState = authFormErrorReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            passwordError: errorMessage,
        });
    });

    test('должен обрабатывать действие defAuthFormError', () => {
        const modifiedState: AuthFormErrorState = {
            nameError: 'Ошибка имени',
            emailError: 'Ошибка email',
            passwordError: 'Ошибка пароля',
        };
        const action = defAuthFormError();
        const newState = authFormErrorReducer(modifiedState, action);
        expect(newState).toEqual(initialState);
    });
});
