import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { editEmail } from '../../action-creators/editUserInfo/emailForm';
import { EditEmailState } from '../../../types/editUserInfo/emailForm';

const initialState: EditEmailState = {
    message: '',
    loading: false,
    error: '',
};

const emailFormSlice = createSlice({
    name: 'emailForm',
    initialState,
    reducers: {
        defEditEmail(state) {
            state.message = '';
            state.error = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(editEmail.pending, (state) => {
                state.loading = true;
                state.error = '';
                state.message = '';
            })
            .addCase(editEmail.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.message = action.payload;
                state.error = '';
            })
            .addCase(editEmail.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.message = '';
                state.error = action.payload || '';
            });
    },
});

export const { defEditEmail } = emailFormSlice.actions;
export default emailFormSlice.reducer;
