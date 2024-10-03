import axios, { AxiosError } from 'axios';
import { API_URL } from './config';
import { Tokens } from "../util/Tokens.ts";

export default class UserService {

    static async getSmallUserInfoByToken() {
        try {
            const token = localStorage.getItem(Tokens.userToken);
            const webpTest = localStorage.getItem(Tokens.isSupportedWebp);

            axios.defaults.headers.common['user-token'] = token;
            axios.defaults.headers.common['webp-test'] = webpTest;

            const response = await axios.get(`${API_URL}/user-small-info-by-token`);
            return response;
        } catch (e) {
            const error = e as AxiosError<{ error: string }>;
            throw new Error(error.response?.data?.error || "Неизвестная ошибка при получении информации о пользователе");
        }
    }

    static async updateUserToken() {
        try {
            const token = localStorage.getItem(Tokens.userToken);
            axios.defaults.headers.common['user-token'] = token;
            const response = await axios.get(`${API_URL}/update-user-token`);
            return response;
        } catch (e) {
            const error = e as AxiosError<{ error: string }>;
            throw new Error(error.response?.data?.error || "Неизвестная ошибка при обновлении токена пользователя");
        }
    }

    static async getUserInfoByToken() {
        try {
            const token = localStorage.getItem(Tokens.userToken);
            const webpTest = localStorage.getItem(Tokens.isSupportedWebp);
            axios.defaults.headers.common['user-token'] = token;
            axios.defaults.headers.common['webp-test'] = webpTest;
            const response = await axios.get(`${API_URL}/user-info-by-token`);
            return response;
        } catch (e) {
            const error = e as AxiosError<{ error: string }>;
            throw new Error(error.response?.data?.error || "Неизвестная ошибка при получении полной информации о пользователе");
        }
    }
}
