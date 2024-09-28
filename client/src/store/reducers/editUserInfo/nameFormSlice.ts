import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { editName } from "../../action-creators/editUserInfo/nameForm";
import { EditNameState } from "../../../types/editUserInfo/nameForm.ts";

const initialState: EditNameState = {
    message: "",
    loading: false,
    error: null
};

export const nameFormSlice = createSlice({
    name: "nameForm",
    initialState,
    reducers: {
        defEditName: (state) => {
            state.message = "";
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(editName.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = "";
            })
            .addCase(editName.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.message = action.payload;
                state.error = null;
            })
            .addCase(editName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка обновления имени';
            });
    },
});

export const { defEditName } = nameFormSlice.actions;
export default nameFormSlice.reducer;
