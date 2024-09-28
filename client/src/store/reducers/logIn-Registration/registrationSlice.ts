import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegistrationState } from "../../../types/logInRegistration/registration";

const initialState: RegistrationState = {
    regToken: '',
    regLoading: false,
    regError: '',
};

export const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        defRegistration: (state) => {
            state.regToken = '';
            state.regLoading = false;
            state.regError = '';
        },
        registration: (state) => {
            state.regLoading = true;
            state.regError = '';
            state.regToken = '';
        },
        registrationSuccess: (state, action: PayloadAction<string>) => {
            state.regLoading = false;
            state.regError = '';
            state.regToken = action.payload;
        },
        registrationError: (state, action: PayloadAction<string>) => {
            state.regLoading = false;
            state.regError = action.payload;
            state.regToken = '';
        }
    },
});

export const { defRegistration, registration, registrationSuccess, registrationError } = registrationSlice.actions;
export default registrationSlice.reducer;
