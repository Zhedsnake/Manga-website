import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { editPassword } from '../../action-creators/editUserInfo/passwordForm';
import { EditPasswordState } from '../../../types/editUserInfo/passwordForm';

const initialState: EditPasswordState = {
    message: '',
    loading: false,
    error: '',
};

const passwordFormSlice = createSlice({
    name: 'passwordForm',
    initialState,
    reducers: {
        defEditPassword(state) {
            state.message = '';
            state.error = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(editPassword.pending, (state) => {
                state.loading = true;
                state.error = '';
                state.message = '';
            })
            .addCase(editPassword.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.message = action.payload;
                state.error = '';
            })
            .addCase(editPassword.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.message = '';
                state.error = action.payload || 'Ошибка обновления пароля';
            });
    },
});

export const { defEditPassword } = passwordFormSlice.actions;
export default passwordFormSlice.reducer;
