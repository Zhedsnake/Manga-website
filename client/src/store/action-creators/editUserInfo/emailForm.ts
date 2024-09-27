import {Dispatch} from "redux";
import EditUserInfoService from "../../../api/EditUserInfoService.ts";
import {EmailAction, EmailActionTypes} from "../../../types/editUserInfo/emailForm.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const editEmail = createAsyncThunk<
    string, // Тип возвращаемого значения при успешном выполнении
    string, // Тип аргумента, передаваемого в thunk
    { rejectValue: string } // Тип значения при отклонении
>(
    'editUserInfo/editEmail',
    async (email: string, thunkAPI) => {
        try {
            const response = await EditUserInfoService.editEmailRequest(email);
            if ("data" in response && "message" in response.data) {
                return response.data.message;
            } else if ("error" in response) {
                // Убедитесь, что всегда передаётся строка
                return thunkAPI.rejectWithValue(response.error || 'Неизвестная ошибка при обновлении email');
            } else {
                return thunkAPI.rejectWithValue('Неверная структура ответа');
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('Произошла ошибка при изменении email');
        }
    }
);

// Действие для установки дефолтного значения email
export const defEditEmail = () => {
    return (dispatch: Dispatch<EmailAction>) => {
        dispatch({ type: EmailActionTypes.DEF_EDIT_EMAIL });
    };
};
