import { registrationReducer } from "../../../../../../../../client/src/store/reducers/logIn-Registration/registrationReducer";
import { RegistrationActionTypes, RegistrationAction, RegistrationState } from "../../../../../../../../client/src/types/logInRegistration/registration";

describe('registrationReducer', () => {
    const initialState: RegistrationState = {
        regToken: '',
        regLoading: false,
        regError: '',
    };

    test('должен возвращать начальное состояние по умолчанию', () => {
        const newState = registrationReducer(undefined, {} as RegistrationAction);
        expect(newState).toEqual(initialState);
    });

    test('должен обрабатывать REGISTRATION', () => {
        const action: RegistrationAction = {
            type: RegistrationActionTypes.REGISTRATION,
        };

        const expectedState: RegistrationState = {
            regToken: '',
            regLoading: true,
            regError: ''
        };

        const newState = registrationReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать REGISTRATION_SUCCESS', () => {
        const action: RegistrationAction = {
            type: RegistrationActionTypes.REGISTRATION_SUCCESS,
            payload: "reg_token_123"
        };

        const expectedState: RegistrationState = {
            regToken: "reg_token_123",
            regLoading: false,
            regError: ''
        };

        const newState = registrationReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать REGISTRATION_ERROR', () => {
        const action: RegistrationAction = {
            type: RegistrationActionTypes.REGISTRATION_ERROR,
            payload: "Registration failed"
        };

        const expectedState: RegistrationState = {
            regToken: '',
            regLoading: false,
            regError: "Registration failed"
        };

        const newState = registrationReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать DEF_REG и сбрасывать состояние', () => {
        const action: RegistrationAction = {
            type: RegistrationActionTypes.DEF_REG,
        };

        const currentState: RegistrationState = {
            regToken: "reg_token_123",
            regLoading: true,
            regError: "Some error"
        };

        const newState = registrationReducer(currentState, action);
        expect(newState).toEqual(initialState);
    });
});
