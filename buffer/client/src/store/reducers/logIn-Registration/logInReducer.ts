import {LogInAction, LogInActionTypes, LogInState} from "../../../types/logInRegistration/logIn";

const initialState: LogInState = {
    logInToken: '',
    logInLoading: false,
    logInError: '',
};

export const logInReducer = (state = initialState, action: LogInAction): LogInState => {
    switch (action.type) {
        case LogInActionTypes.LOG_IN:
            return { logInLoading: true, logInError: '', logInToken: '' };
        case LogInActionTypes.LOG_IN_SUCCESS:
            return { logInLoading: false, logInError: '', logInToken: action.payload };
        case LogInActionTypes.LOG_IN_ERROR:
            return { logInLoading: false, logInError: action.payload, logInToken: '' };
        case LogInActionTypes.DEF_LOG_IN:
            return {...initialState}
        default:
            return state;
    }
};
