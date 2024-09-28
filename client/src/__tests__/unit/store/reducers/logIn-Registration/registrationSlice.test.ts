import registrationReducer, { defRegistration, registration, registrationSuccess, registrationError } from '../../../../../store/reducers/logIn-Registration/registrationSlice';
import { RegistrationState } from '../../../../../types/logInRegistration/registration';

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
            regError: '',
        });
    });

    test('должен обрабатывать действие registration', () => {
        const action = { type: registration.type };
        const newState = registrationReducer(initialState, action);
        expect(newState).toEqual({
            regToken: '',
            regLoading: true,
            regError: '',
        });
    });

    test('должен обрабатывать действие registrationSuccess', () => {
        const action = {
            type: registrationSuccess.type,
            payload: 'registrationToken123'
        };
        const newState = registrationReducer(initialState, action);
        expect(newState).toEqual({
            regToken: 'registrationToken123',
            regLoading: false,
            regError: '',
        });
    });

    test('должен обрабатывать действие registrationError', () => {
        const action = {
            type: registrationError.type,
            payload: 'Registration failed'
        };
        const newState = registrationReducer(initialState, action);
        expect(newState).toEqual({
            regToken: '',
            regLoading: false,
            regError: 'Registration failed',
        });
    });
});
