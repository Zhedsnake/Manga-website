import axios from "axios";
import {API_URL} from "./config.ts";

export default class guestService {
    static async getGuestToken(): Promise<axios.AxiosResponse<any>> {
        const response: axios.AxiosResponse<any> = await axios.get(`${API_URL}/get-guest-token`)
        return response;
    }
}
