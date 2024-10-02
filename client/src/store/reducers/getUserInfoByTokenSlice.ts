import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserInfoByToken } from '../action-creators/getUserInfoByToken';
import { GetUserInfoState } from '../../types/getUserInfo';

const initialState: GetUserInfoState = {
    name: "Неизвестно",
    email: "Неизвестно",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    picWebp: "",
    registeredAt: "Неизвестно",
    birthday: "Неизвестно",
    loading: false,
    error: ''
};

const getUserInfoSlice = createSlice({
    name: 'getUserInfo',
    initialState,
    reducers: {
        defUserInfo(state) {
            state.name = "Неизвестно";
            state.email = "Неизвестно";
            state.pic = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
            state.picWebp = "";
            state.registeredAt = "Неизвестно";
            state.birthday = "Неизвестно";
            state.loading = false;
            state.error = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfoByToken.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(getUserInfoByToken.fulfilled, (state, action: PayloadAction<GetUserInfoState>) => {
                state.loading = false;
                state.name = action.payload.name;
                state.email = action.payload.email;
                state.pic = action.payload.pic || "";
                state.picWebp = action.payload.picWebp || "";
                state.registeredAt = action.payload.registeredAt;
                state.birthday = action.payload.birthday;
                state.error = '';
            })
            .addCase(getUserInfoByToken.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка при получении информации';
            });
    },
});

export const { defUserInfo } = getUserInfoSlice.actions;
export default getUserInfoSlice.reducer;
