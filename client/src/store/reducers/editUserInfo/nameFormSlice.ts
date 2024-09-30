import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { editName } from "../../action-creators/editUserInfo/nameForm";
import { EditNameState } from "../../../types/editUserInfo/nameForm";

const initialState: EditNameState = {
    message: '',
    loading: false,
    error: '',
};

const nameFormSlice = createSlice({
    name: 'nameForm',
    initialState,
    reducers: {
        defEditName(state) {
            state.message = '';
            state.error = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(editName.pending, (state) => {
                state.loading = true;
                state.error = '';
                state.message = '';
            })
            .addCase(editName.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.message = action.payload;
                state.error = '';
            })
            .addCase(editName.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.message = '';
                state.error = action.payload || 'Ошибка обновления имени';
            });
    },
});

export const { defEditName } = nameFormSlice.actions;
export default nameFormSlice.reducer;
