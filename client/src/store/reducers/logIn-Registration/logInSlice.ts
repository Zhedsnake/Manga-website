import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logIn } from '../../action-creators/logIn-Registration/logIn';

const initialState = {
    logInToken: '',
    logInLoading: false,
    logInError: '',
};

const logInSlice = createSlice({
    name: 'logIn',
    initialState,
    reducers: {
        defLogIn(state) {
            state.logInToken = '';
            state.logInError = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logIn.pending, (state) => {
                state.logInLoading = true;
            })
            .addCase(logIn.fulfilled, (state, action: PayloadAction<string>) => {
                state.logInLoading = false;
                state.logInToken = action.payload;
                state.logInError = '';
            })
            .addCase(logIn.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.logInLoading = false;
                state.logInToken = '';
                state.logInError = action.payload || '';
            });
    },
});

export const { defLogIn } = logInSlice.actions;
export default logInSlice.reducer;
