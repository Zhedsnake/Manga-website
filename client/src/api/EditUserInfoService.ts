import axios, { AxiosError } from 'axios';
import { API_URL } from './config';
import { Tokens } from "../util/Tokens.ts";

export default class EditUserInfoService {

    static async editNameRequest(name: string) {
        try {
            const token = localStorage.getItem(Tokens.userToken);
            axios.defaults.headers.common['user-token'] = token;
            const response = await axios.put(`${API_URL}/edit-user-name-by-token`, { name });
            return response;
        } catch (e) {
            const error = e as AxiosError<{ error: string }>;
            return { error: error.response?.data?.error || "Неизвестная ошибка" };
        }
    }

    static async editEmailRequest(email: string) {
        try {
            const token = localStorage.getItem(Tokens.userToken);
            axios.defaults.headers.common['user-token'] = token;
            const response = await axios.put(`${API_URL}/edit-user-email-by-token`, { email });
            return response;
        } catch (e) {
            const error = e as AxiosError<{ error: string }>;
            return { error: error.response?.data?.error || "Неизвестная ошибка" };
        }
    }

    static async editPasswordRequest(oldPassword: string, newPassword: string) {
        try {
            const token = localStorage.getItem(Tokens.userToken);
            axios.defaults.headers.common['user-token'] = token;
            const response = await axios.put(`${API_URL}/edit-user-password-by-token`, { oldPassword, newPassword });
            return response;
        } catch (e) {
            const error = e as AxiosError<{ error: string }>;
            return { error: error.response?.data?.error || "Неизвестная ошибка" };
        }
    }

    static async editAvatarRequest(imageFormData: FormData) {
        try {
            const token = localStorage.getItem(Tokens.userToken);
            axios.defaults.headers.common['user-token'] = token;
            const response = await axios.put(`${API_URL}/edit-user-avatar-by-token`, imageFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response;
        } catch (e) {
            const error = e as AxiosError<{ error: string }>;
            return { error: error.response?.data?.error || "Неизвестная ошибка" };
        }
    }
}
