import { createAsyncThunk } from "@reduxjs/toolkit";
import EditUserInfoService from "../../../api/EditUserInfoService.ts";

export const editAvatar = createAsyncThunk<string, FormData, { rejectValue: string }>(
    'avatarForm/editAvatar',
    async (avatar: FormData, thunkAPI) => {
        try {
            const response = await EditUserInfoService.editAvatarRequest(avatar);

            if (response && "data" in response && "message" in response.data) {
                return response.data.message;
            } else {
                return thunkAPI.rejectWithValue('Неверная структура ответа');
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                return thunkAPI.rejectWithValue(error.response.data.error);
            }
            return thunkAPI.rejectWithValue('Произошла ошибка при изменении аватара');
        }
    }
);

export const defEditAvatar = () => {
    return (dispatch: any) => {
        dispatch({ type: 'avatarForm/defEditAvatar' });
    };
};
