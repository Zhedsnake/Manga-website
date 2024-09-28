import { createAsyncThunk } from "@reduxjs/toolkit";
import EditUserInfoService from "../../../api/EditUserInfoService.ts";

export const editName = createAsyncThunk<string, string, { rejectValue: string }>(
    'editUserInfo/editName',
    async (name: string, thunkAPI) => {
        try {
            const response = await EditUserInfoService.editNameRequest(name);

            if ("data" in response && "message" in response.data) {
                return response.data.message;
            } else {
                return thunkAPI.rejectWithValue('Неверная структура ответа');
            }

        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'Произошла ошибка при изменении имени');
        }
    }
);

export const defEditName = () => {
    return (dispatch: any) => {
        dispatch({ type: 'nameForm/defEditName' });
    };
};
