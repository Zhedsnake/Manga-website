import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { editPassword } from "../../action-creators/editUserInfo/passwordForm"; // Импортируйте ваш асинхронный action creator
import { EditPasswordState } from "../../../types/editUserInfo/passwordForm.ts";

const initialState: EditPasswordState = {
    message: "",
    loading: false,
    error: null
};

export const passwordFormSlice = createSlice({
    name: "passwordForm",
    initialState,
    reducers: {
        defEditPassword: (state) => {
            state.message = "";
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(editPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = "";
            })
            .addCase(editPassword.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.message = action.payload;
                state.error = null;
            })
            .addCase(editPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка обновления пароля';
            });
    },
});

export const { defEditPassword } = passwordFormSlice.actions;
export default passwordFormSlice.reducer;
