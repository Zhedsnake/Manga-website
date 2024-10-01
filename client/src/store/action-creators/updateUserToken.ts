import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../api/UserService.ts";

export const updateUserToken = createAsyncThunk<string, void, { rejectValue: string }>(
    'authForm/updateUserToken',
    async (_, thunkAPI) => {
        try {
            const response = await UserService.updateUserToken();

            if ("userToken" in response.data) {
                return response.data.userToken;
            } else {
                return thunkAPI.rejectWithValue('Неверная структура ответа');
            }
        } catch (error: any) {
            if (error.response?.data && "error" in error.response.data) {
                return thunkAPI.rejectWithValue(error.response.data.error);
            } else {
                return thunkAPI.rejectWithValue('Неизвестная ошибка');
            }
        }
    }
);
