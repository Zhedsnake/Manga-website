import axios, {AxiosError} from 'axios';
import {API_URL} from './config';


export default class AuthService {
    static async logInRequest(name: string, password: string) {
        try {
            const response = await axios.post(`${API_URL}/login`, {name, password});
            return response;
        } catch (e) {
            const error = e as AxiosError<{ error: string }>;
            throw new Error(error.response?.data?.error || "Неизвестная ошибка");
        }
    }

    static async registerRequest(name: string, email: string, password: string) {
        try {
            const response = await axios.post(`${API_URL}/register`, {name, email, password});
            return response;
        } catch (e) {
            const error = e as AxiosError<{ error: string }>;
            throw new Error(error.response?.data?.error || "Неизвестная ошибка");
        }
    }
}
