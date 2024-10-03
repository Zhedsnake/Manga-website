import axios, { AxiosError } from 'axios';
import { API_URL } from './config';

export default class GuestService {

    static async registerGuest() {
        try {
            const response = await axios.post(`${API_URL}/guest`);
            return response;
        } catch (e) {
            const error = e as AxiosError<{ error: string }>;
            throw new Error(error.response?.data?.error || "Неизвестная ошибка при регистрации гостя");
        }
    }

    // static async removeGuest(guestToken: string) {
    //     try {
    //         axios.defaults.headers.common['guest-token'] = guestToken;
    //         const response = await axios.delete(`${API_URL}/guest`);
    //         return response;
    //     } catch (e) {
    //         const error = e as AxiosError<{ error: string }>;
    //         throw new Error(error.response?.data?.error || "Неизвестная ошибка при удалении гостя");
    //     }
    // }
}
