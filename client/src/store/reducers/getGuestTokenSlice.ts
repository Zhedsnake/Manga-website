import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getGuestToken } from '../action-creators/getGuestToken';
import { GuestTokenState } from '../../types/getGuestToken';

const initialState: GuestTokenState = {
    guestToken: null,
    loading: false,
    error: null,
};

const guestTokenSlice = createSlice({
    name: 'guestToken',
    initialState,
    reducers: {
        defGuestToken(state) {
            state.guestToken = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGuestToken.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.guestToken = null;
            })
            .addCase(getGuestToken.fulfilled, (state, action: PayloadAction<string>) => {
                state.guestToken = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getGuestToken.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.guestToken = null;
                state.error = action.payload || 'Произошла ошибка';
            });
    },
});

export const { defGuestToken } = guestTokenSlice.actions;
export default guestTokenSlice.reducer;
