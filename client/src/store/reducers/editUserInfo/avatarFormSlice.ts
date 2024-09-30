import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { editAvatar } from '../../action-creators/editUserInfo/avatarForm'; // Импортируйте ваш асинхронный action creator
import { EditAvatarState } from '../../../types/editUserInfo/avatarForm.ts';

const initialState: EditAvatarState = {
    message: '',
    loading: false,
    error: '',
};

const avatarFormSlice = createSlice({
    name: 'avatarForm',
    initialState,
    reducers: {
        defEditAvatar(state) {
            state.message = '';
            state.loading = false;
            state.error = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(editAvatar.pending, (state) => {
                state.loading = true;
                state.error = '';
                state.message = '';
            })
            .addCase(editAvatar.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.message = action.payload;
                state.error = '';
            })
            .addCase(editAvatar.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.message = '';
                state.error = action.payload || '';
            });
    },
});

export const { defEditAvatar } = avatarFormSlice.actions;
export default avatarFormSlice.reducer;
