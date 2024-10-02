import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../api/UserService';

export const getSmallUserInfoByToken = createAsyncThunk<
    { name: string; pic?: string; minPicWebp?: string },
    void,
    { rejectValue: string }
>('getSmallUserInfo/getSmallUserInfoByToken', async (_, thunkAPI) => {
    try {
        const response = await UserService.getSmallUserInfoByToken();

        if (response && 'data' in response && ("name" in response.data && "pic" in response.data) || ("name" in response.data && "minPicWebp" in response.data)) {
            return response.data;
        } else {
            return thunkAPI.rejectWithValue('Неверная структура ответа');
        }

    } catch (error: any) {
        if (error.response && error.response.data && 'error' in error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
        return thunkAPI.rejectWithValue('Неизвестная ошибка');
    }
});