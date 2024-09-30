import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthFormState } from '../../../types/authForm/authForm.ts';

const initialState: AuthFormState = {
    name: '',
    email: '',
    password: '',
};

const authFormSlice = createSlice({
    name: 'authForm',
    initialState,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        defAuthForm(state) {
            state.name = '';
            state.email = '';
            state.password = '';
        },
    },
});

export const { setName, setEmail, setPassword, defAuthForm } = authFormSlice.actions;
export default authFormSlice.reducer;
