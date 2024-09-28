import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LogInState } from "../../../types/logInRegistration/logIn";

const initialState: LogInState = {
    logInToken: '',
    logInLoading: false,
    logInError: '',
};

export const logInSlice = createSlice({
    name: "logIn",
    initialState,
    reducers: {
        defLogIn: (state) => {
            state.logInToken = '';
            state.logInLoading = false;
            state.logInError = '';
        },
        logIn: (state) => {
            state.logInLoading = true;
            state.logInError = '';
            state.logInToken = '';
        },
        logInSuccess: (state, action: PayloadAction<string>) => {
            state.logInLoading = false;
            state.logInError = '';
            state.logInToken = action.payload;
        },
        logInError: (state, action: PayloadAction<string>) => {
            state.logInLoading = false;
            state.logInError = action.payload;
            state.logInToken = '';
        }
    },
});

export const { defLogIn, logIn, logInSuccess, logInError } = logInSlice.actions;
export default logInSlice.reducer;
