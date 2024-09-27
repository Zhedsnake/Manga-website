import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { editEmail } from "../../action-creators/editUserInfo/emailForm";
import { EditEmailState } from "../../../types/editUserInfo/emailForm";

// Изменение дял github

const initialState: EditEmailState = {
    message: "",
    loading: false,
    error: null
};

export const emailFormSlice = createSlice({
    name: "emailForm",
    initialState,
    reducers: {
        defEditEmail: (state) => {
            state.message = 'default_email_message';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(editEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editEmail.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.message = action.payload;
                state.error = null;
            })
            .addCase(editEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка обновления email';
            });
    },
});

export const { defEditEmail } = emailFormSlice.actions;
export default emailFormSlice.reducer;