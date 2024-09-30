import { createAsyncThunk } from "@reduxjs/toolkit";
import EditUserInfoService from "../../../api/EditUserInfoService.ts";

export const editName = createAsyncThunk<string, string, { rejectValue: string }>(
    'nameForm/editName',
    async (name: string, thunkAPI) => {
        try {
            const response = await EditUserInfoService.editNameRequest(name);

            if (response && "data" in response && "message" in response.data) {
                return response.data.message;
            } else {
                return thunkAPI.rejectWithValue('Неверная структура ответа');
            }

        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                return thunkAPI.rejectWithValue(error.response.data.error);
            }
            return thunkAPI.rejectWithValue('Произошла ошибка при изменении имени');
        }
    }
);

export const defEditName = () => {
    return (dispatch: any) => {
        dispatch({ type: 'nameForm/defEditName' });
    };
};
