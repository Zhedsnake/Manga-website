import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../api/UserService";
import { GetUserInfoState } from "../../types/getUserInfo";

export const getUserInfoByToken = createAsyncThunk<GetUserInfoState, void, { rejectValue: string }>(
    'userInfo/getUserInfoByToken',
    async (_, thunkAPI) => {
        try {
            const response = await UserService.getUserInfoByToken();

            if (response && "data" in response && "name" in response.data && "email" in response.data && "pic" in response.data && "registeredAt" in response.data) {
                return response.data as GetUserInfoState;
            } else {
                return thunkAPI.rejectWithValue('Неверная структура ответа');
            }

        } catch (error: any) {
            if (error.response && error.response.data && "error" in error.response.data) {
                return thunkAPI.rejectWithValue(error.response.data.error);
            }
            return thunkAPI.rejectWithValue('Ошибка выполнения запроса');
        }
    }
);