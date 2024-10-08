import { createAsyncThunk } from '@reduxjs/toolkit';
import GuestService from '../../api/GuestService';

export const getGuestToken = createAsyncThunk<string, void, { rejectValue: string }>(
    'guestToken/getGuestToken',
    async (_, thunkAPI) => {
        try {
            const response = await GuestService.registerGuest();

            if (response && "data" in response && "guestToken" in response.data) {
                return response.data.guestToken;
            } else {
                return thunkAPI.rejectWithValue('Неверная структура ответа');
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                return thunkAPI.rejectWithValue(error.response.data.error);
            }
            return thunkAPI.rejectWithValue('Произошла ошибка при загрузке guest токена');
        }
    }
);