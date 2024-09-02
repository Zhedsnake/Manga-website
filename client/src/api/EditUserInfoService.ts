import axios from 'axios';
import {API_URL} from './config';
import {Tokens} from "../util/Tokens.ts";


export default class EditUserInfoService {
    static async editNameRequest(name: string) {
        const token = localStorage.getItem(Tokens.userToken);
        axios.defaults.headers.common['user-token'] = token;
        const response = await axios.put(`${API_URL}/edit-user-name-by-token`, {name});
        return response;
    }

    static async editEmailRequest(email: string) {
        const token = localStorage.getItem(Tokens.userToken);
        axios.defaults.headers.common['user-token'] = token;
        const response = await axios.put(`${API_URL}/edit-user-email-by-token`, {email});
        return response;
    }

    static async editPasswordRequest(oldPassword: string, newPassword: string) {
        const token = localStorage.getItem(Tokens.userToken);
        axios.defaults.headers.common['user-token'] = token;
        const response = await axios.put(`${API_URL}/edit-user-password-by-token`, {oldPassword, newPassword});
        return response;
    }

    static async editAvatarRequest(imageFormData) {
        const token = localStorage.getItem(Tokens.userToken);
        axios.defaults.headers.common['user-token'] = token;
        const response = await axios.put(`${API_URL}/edit-user-avatar-by-token`, imageFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response;
    }
}
