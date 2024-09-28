import { createAsyncThunk } from "@reduxjs/toolkit";
import EditUserInfoService from "../../../api/EditUserInfoService.ts";

export const editPassword = createAsyncThunk<string, { oldPassword: string; newPassword: string }, { rejectValue: string }>(
    'editUserInfo/editPassword',
    async ({ oldPassword, newPassword }, thunkAPI) => {
        try {
            const response = await EditUserInfoService.editPasswordRequest(oldPassword, newPassword);

            if ("data" in response && "message" in response.data) {
                return response.data.message;
            } else {
                return thunkAPI.rejectWithValue('Неверная структура ответа');
            }

        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'Произошла ошибка при изменении пароля');
        }
    }
);

export const defEditPassword = () => {
    return (dispatch: any) => {
        dispatch({ type: 'passwordForm/defEditPassword' });
    };
};
