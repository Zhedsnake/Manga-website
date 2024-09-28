import { createAsyncThunk } from "@reduxjs/toolkit";
import EditUserInfoService from "../../../api/EditUserInfoService.ts";

export const editAvatar = createAsyncThunk<string, FormData, { rejectValue: string }>(
    'editUserInfo/editAvatar',
    async (avatar: FormData, thunkAPI) => {
        try {
            const response = await EditUserInfoService.editAvatarRequest(avatar);

            if ("data" in response && "message" in response.data) {
                return response.data.message;
            } else {
                return thunkAPI.rejectWithValue('Неверная структура ответа');
            }

        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'Произошла ошибка при изменении аватара');
        }
    }
);

export const defEditAvatar = () => {
    return (dispatch: any) => {
        dispatch({ type: 'avatarForm/defEditAvatar' });
    };
};
