import {Dispatch} from "redux";
import EditUserInfoService from "../../../api/EditUserInfoService.ts";
import {EmailAction, EmailActionTypes} from "../../../types/editUserInfo/emailForm.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const editEmail = createAsyncThunk<string, string, { rejectValue: string }>(
    'editUserInfo/editEmail',
    async (email: string, thunkAPI) => {
        try {
            const response = await EditUserInfoService.editEmailRequest(email);

            if ("data" in response && "message" in response.data) {
                return response.data.message;
            }

        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'Произошла ошибка при изменении email');
        }
    }
);

export const defEditEmail = () => {
    return (dispatch: Dispatch<EmailAction>) => {
        dispatch({ type: EmailActionTypes.DEF_EDIT_EMAIL });
    };
};
