import { createAsyncThunk } from "@reduxjs/toolkit";
import EditUserInfoService from "../../../api/EditUserInfoService.ts";

export const editPassword = createAsyncThunk<string, { oldPassword: string; newPassword: string }, { rejectValue: string }>(
    'passwordForm/editPassword',
    async ({ oldPassword, newPassword }, thunkAPI) => {
        try {
            const response = await EditUserInfoService.editPasswordRequest(oldPassword, newPassword);

            if (response && "data" in response && "message" in response.data) {
                return response.data.message;
            } else {
                return thunkAPI.rejectWithValue('Неверная структура ответа');
            }

        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                return thunkAPI.rejectWithValue(error.response.data.error);
            }
            return thunkAPI.rejectWithValue('Произошла ошибка при изменении пароля');
        }
    }
);

export const defEditPassword = () => {
    return (dispatch: any) => {
        dispatch({ type: 'passwordForm/defEditPassword' });
    };
};
