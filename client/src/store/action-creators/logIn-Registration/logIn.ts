import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService from "../../../api/AuthService";

export const logIn = createAsyncThunk<string, { name: string; password: string }, { rejectValue: string }>(
    'logIn/logIn',
    async ({name, password}, thunkAPI) => {
        try {
            const response = await AuthService.logInRequest(name, password);

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


export const defLogIn = () => {
    return (dispatch: any) => {
        dispatch({type: 'logIn/defLogIn'});
    };
};
