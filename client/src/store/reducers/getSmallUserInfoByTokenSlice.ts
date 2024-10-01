import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSmallUserInfoByToken } from '../action-creators/getSmallUserInfoByToken';
import { GetSmallUserInfoState } from '../../types/getSmallUserInfo';

const initialState: GetSmallUserInfoState = {
    data: {
        name: '',
        pic: '',
        minPicWebp: '',
    },
    loading: false,
    error: '',
};


const getSmallUserInfoSlice = createSlice({
    name: 'getSmallUserInfo',
    initialState,
    reducers: {
        defSmallUserInfo(state) {
            state.data = { name: '', pic: '', minPicWebp: '' };
            state.loading = false;
            state.error = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSmallUserInfoByToken.pending, (state) => {
                state.loading = true;
                state.error = '';
                state.data = { name: '', pic: '', minPicWebp: '' };
            })
            .addCase(getSmallUserInfoByToken.fulfilled, (state, action: PayloadAction<{ name: string; pic?: string; minPicWebp?: string }>) => {
                state.loading = false;
                state.error = '';

                state.data.name = action.payload.name;

                if (action.payload.pic) {
                    state.data.pic = action.payload.pic;
                } else if (action.payload.minPicWebp) {
                    state.data.pic = action.payload.minPicWebp;
                }
            })
            .addCase(getSmallUserInfoByToken.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.data = { name: '', pic: '', minPicWebp: '' };
                state.error = action.payload || '';
            });
    },
});

export const { defSmallUserInfo } = getSmallUserInfoSlice.actions;
export default getSmallUserInfoSlice.reducer;
