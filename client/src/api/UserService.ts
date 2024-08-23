import axios from 'axios';
import {API_URL} from './config';
import {Tokens} from "../util/setTocken.ts";


export default class UserService {
    static async getSmallUserInfoByToken() {
        const token = localStorage.getItem(Tokens.userToken);
        axios.defaults.headers.common['user-token'] = token;
        const response = await axios.get(`${API_URL}/user-small-info-by-token`);
        return response;
    }

    static async updateUserToken() {
        const token = localStorage.getItem(Tokens.userToken);
        axios.defaults.headers.common['user-token'] = token;
        const response = await axios.get(`${API_URL}/update-user-token`);
        return response;
    }
}
