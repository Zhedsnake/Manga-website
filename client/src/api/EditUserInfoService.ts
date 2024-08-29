import axios from 'axios';
import {API_URL} from './config';
import {Tokens} from "../util/setTocken.ts";


export default class EditUserInfoService {
    static async editNameRequest(name: string) {
        const token = localStorage.getItem(Tokens.userToken);
        axios.defaults.headers.common['user-token'] = token;
        const response = await axios.put(`${API_URL}/edit-user-name-by-token`, {name});
        return response;
    }
}
