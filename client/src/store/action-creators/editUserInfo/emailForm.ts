import { createAsyncThunk } from "@reduxjs/toolkit";
import EditUserInfoService from "../../../api/EditUserInfoService.ts";

export const editEmail = createAsyncThunk<string, string, { rejectValue: string }>(
    'emailForm/editEmail',
    async (email: string, thunkAPI) => {
        try {
            const response = await EditUserInfoService.editEmailRequest(email);

            if (response && "data" in response && "message" in response.data) {
                return response.data.message;
            } else {
                return thunkAPI.rejectWithValue('Неверная структура ответа');
            }

        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                return thunkAPI.rejectWithValue(error.response.data.error);
            }
            return thunkAPI.rejectWithValue('Произошла ошибка при изменении email');
        }
    }
);

export const defEditEmail = () => {
    return (dispatch: any) => {
        dispatch({ type: 'emailForm/defEditEmail' });
    };
};
