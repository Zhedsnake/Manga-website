import axios from 'axios';
import {API_URL} from './config';


export default class AuthService {
    static async logInRequest(name: string, email: string, password: string) {
        const response = await axios.post(`${API_URL}/log-in`, {name, email, password});
        return response;
    }

    static async registerRequest(name: string, email: string, password: string) {
        const response = await axios.post(`${API_URL}/register`, {name, email, password});
        return response;
    }
}
