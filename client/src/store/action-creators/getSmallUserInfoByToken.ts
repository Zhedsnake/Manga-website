import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from "../../api/UserService";
import { AxiosResponse } from "axios";

export const getSmallUserInfoByToken = createAsyncThunk<
    { name: string; pic: string } | { name: string; minPicWebp: string },
    void,
    { rejectValue: string }
>(
    'user/getSmallUserInfo',
    async (_, thunkAPI) => {
        try {
            const response: AxiosResponse<{ name: string; pic: string } | { name: string; minPicWebp: string }> =
                await UserService.getSmallUserInfoByToken();

            if (response && 'data' in response) {
                return response.data;
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
