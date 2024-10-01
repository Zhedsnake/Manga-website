import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UpdateUserTokenState } from '../../types/updateUserToken';
import { updateUserToken as updateUserTokenThunk } from '../action-creators/updateUserToken';

const initialState: UpdateUserTokenState = {
    userToken: "",
    loading: false,
    error: "",
};

const updateUserTokenSlice = createSlice({
    name: 'updateUserToken',
    initialState,
    reducers: {
        defUpdateUserToken(state) {
            state.userToken = "";
            state.loading = false;
            state.error = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserTokenThunk.pending, (state) => {
                state.loading = true;
                state.error = "";
                state.userToken = "";
            })
            .addCase(updateUserTokenThunk.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.userToken = action.payload;
                state.error = "";
            })
            .addCase(updateUserTokenThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.userToken = "";
                state.error = action.payload || "";
            });
    },
});

export const { defUpdateUserToken } = updateUserTokenSlice.actions;
export default updateUserTokenSlice.reducer;
