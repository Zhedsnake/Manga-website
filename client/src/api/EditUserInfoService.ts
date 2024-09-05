import axios from 'axios';
import {API_URL} from './config';
import {Tokens} from "../util/Tokens.ts";


export default class EditUserInfoService {
    static async editNameRequest(name: string) {
        try {
            const token = localStorage.getItem(Tokens.userToken);
            axios.defaults.headers.common['user-token'] = token;
            const response = await axios.put(`${API_URL}/edit-user-name-by-token`, {name});
            return response;
        } catch (e) {
            return {error: e.response.data.error};
        }
    }

    static async editEmailRequest(email: string) {
        try {
            const token = localStorage.getItem(Tokens.userToken);
            axios.defaults.headers.common['user-token'] = token;
            const response = await axios.put(`${API_URL}/edit-user-email-by-token`, {email});
            return response;
        } catch (e) {
            return {error: e.response.data.error};
        }
    }

    static async editPasswordRequest(oldPassword: string, newPassword: string) {
        try {
            const token = localStorage.getItem(Tokens.userToken);
            axios.defaults.headers.common['user-token'] = token;
            const response = await axios.put(`${API_URL}/edit-user-password-by-token`, {oldPassword, newPassword});
            return response;
        } catch (e) {
            return {error: e.response.data.error};
        }
    }

    static async editAvatarRequest(imageFormData) {
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
            return {error: e.response.data.error};
        }
    }
}
