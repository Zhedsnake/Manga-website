import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registration } from '../../action-creators/logIn-Registration/registraion';
import { RegistrationState } from '../../../types/logInRegistration/registration';

const initialState: RegistrationState = {
    regToken: '',
    regLoading: false,
    regError: '',
};

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        defRegistration(state) {
            state.regToken = '';
            state.regError = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registration.pending, (state) => {
                state.regLoading = true;
                state.regError = '';
                state.regToken = '';
            })
            .addCase(registration.fulfilled, (state, action: PayloadAction<string>) => {
                state.regLoading = false;
                state.regToken = action.payload;
                state.regError = '';
            })
            .addCase(registration.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.regLoading = false;
                state.regToken = '';
                state.regError = action.payload || '';
            });
    },
});

export const { defRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;
