import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService from "../../../api/AuthService";

export const registration = createAsyncThunk<string, { name: string; email: string; password: string }, { rejectValue: string }>(
    'registration/registration',
    async ({name, email, password}, thunkAPI) => {
        try {
            const response = await AuthService.registerRequest(name, email, password);

            if (response && "data" in response && "userToken" in response.data) {
                return response.data.userToken;
            } else {
                return thunkAPI.rejectWithValue('Неверная структура ответа');
            }

        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                return thunkAPI.rejectWithValue(error.response.data.error);
            }
            return thunkAPI.rejectWithValue('Неизвестная ошибка');
        }
    }
);
