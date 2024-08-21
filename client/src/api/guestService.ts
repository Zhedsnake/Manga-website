import axios, {AxiosResponse} from "axios";
import {API_URL} from "./config.ts";

export default class guestService {
    static async registerGuest(): Promise<AxiosResponse<string>> {
        const response: AxiosResponse<string> = await axios.post(`${API_URL}/guest`)
        return response;
    }

    // static async removeGuest(guestToken: string): Promise<axios.AxiosResponse<any>> {
    //     axios.defaults.headers.common['guest-token'] = guestToken
    //     const response: axios.AxiosResponse<any> = await axios.delete(`${API_URL}/guest`);
    //     return response;
    // }
}
