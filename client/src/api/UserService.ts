import axios, {AxiosResponse} from 'axios';
import {API_URL} from './config';
import {Tokens} from "../util/Tokens.ts";


export default class UserService {
    static async getSmallUserInfoByToken(): Promise<AxiosResponse<{name: string, pic: string} | {name: string, minPicWebp: string}>> {
        const token = localStorage.getItem(Tokens.userToken);
        const webpTest = localStorage.getItem(Tokens.isSupportedWebp);
        axios.defaults.headers.common['user-token'] = token;
        axios.defaults.headers.common['webp-test'] = webpTest;
        const response = await axios.get(`${API_URL}/user-small-info-by-token`);
        return response;
    }

    static async updateUserToken() {
        const token = localStorage.getItem(Tokens.userToken);
        axios.defaults.headers.common['user-token'] = token;
        const response = await axios.get(`${API_URL}/update-user-token`);
        return response;
    }

    static async getUserInfoByToken() {
        const token = localStorage.getItem(Tokens.userToken);
        const webpTest = localStorage.getItem(Tokens.isSupportedWebp);
        axios.defaults.headers.common['user-token'] = token;
        axios.defaults.headers.common['webp-test'] = webpTest;
        const response = await axios.get(`${API_URL}/user-info-by-token`);
        return response;
    }
}
