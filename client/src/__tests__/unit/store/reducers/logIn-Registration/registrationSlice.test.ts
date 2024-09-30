import registrationReducer, { defRegistration } from '../../../../../store/reducers/logIn-Registration/registrationSlice';
import { registration } from '../../../../../store/action-creators/logIn-Registration/registraion';
import { RegistrationState } from '../../../../../types/logInRegistration/registration';

jest.mock('../../../../../api/AuthService', () => ({
    __esModule: true,
    default: {
        registerRequest: jest.fn(),
    },
}));

describe('registrationSlice reducer tests', () => {

    const initialState: RegistrationState = {
        regToken: '',
        regLoading: false,
        regError: '',
    };

    test('должно быть возвращено исходное состояние', () => {
        expect(registrationReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('должен обрабатывать действие defRegistration', () => {
        const newState = registrationReducer(initialState, defRegistration());
        expect(newState).toEqual({
            regToken: '',
            regLoading: false,
            regError: ''
        });
    });

    test('должен обрабатывать действие registration.pending', () => {
        const action = { type: registration.pending.type };
        const newState = registrationReducer(initialState, action);
        expect(newState).toEqual({
            regToken: '',
            regLoading: true,
            regError: ''
        });
    });

    test('должен обрабатывать действие registration.fulfilled', () => {
        const action = {
            type: registration.fulfilled.type,
            payload: 'userToken123'
        };
        const newState = registrationReducer(initialState, action);
        expect(newState).toEqual({
            regToken: 'userToken123',
            regLoading: false,
            regError: ''
        });
    });

    test('должен обрабатывать действие registration.rejected', () => {
        const action = {
            type: registration.rejected.type,
            payload: 'Ошибка регистрации'
        };
        const newState = registrationReducer(initialState, action);
        expect(newState).toEqual({
            regToken: '',
            regLoading: false,
            regError: 'Ошибка регистрации'
        });
    });
});
