import {RegistrationAction, RegistrationActionTypes, RegistrationState} from "../../../types/logInRegistration/registration";

const initialState: RegistrationState = {
    regToken: '',
    regLoading: false,
    regError: '',
};

export const registrationReducer = (state = initialState, action: RegistrationAction): RegistrationState => {
    switch (action.type) {
        case RegistrationActionTypes.REGISTRATION:
            return { regLoading: true, regError: '', regToken: '' };
        case RegistrationActionTypes.REGISTRATION_SUCCESS:
            return { regLoading: false, regError: '', regToken: action.payload };
        case RegistrationActionTypes.REGISTRATION_ERROR:
            return { regLoading: false, regError: action.payload, regToken: '' };
        case RegistrationActionTypes.DEF_REG:
            return {...initialState}
        default:
            return state;
    }
};
