import axios from "axios";
import {API_URL} from "./config.ts";

export default class guestService {
    static async getGuestToken() {
        const response = await axios.get(`${API_URL}/create-guest`)
        return response;
    }
}
