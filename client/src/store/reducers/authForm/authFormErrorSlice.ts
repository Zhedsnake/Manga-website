// src/store/reducers/authForm/authFormErrorSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthFormErrorState } from '../../../types/authForm/authFormError.ts';

const initialState: AuthFormErrorState = {
    nameError: '',
    emailError: '',
    passwordError: '',
};

const authFormErrorSlice = createSlice({
    name: 'authFormError',
    initialState,
    reducers: {
        setNameError(state, action: PayloadAction<string>) {
            state.nameError = action.payload;
        },
        setEmailError(state, action: PayloadAction<string>) {
            state.emailError = action.payload;
        },
        setPasswordError(state, action: PayloadAction<string>) {
            state.passwordError = action.payload;
        },
        defAuthFormError(state) {
            state.nameError = '';
            state.emailError = '';
            state.passwordError = '';
        },
    },
});

export const { setNameError, setEmailError, setPasswordError, defAuthFormError } = authFormErrorSlice.actions;
export default authFormErrorSlice.reducer;
