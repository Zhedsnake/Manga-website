import { Model } from "mongoose";
import {guestModel, guestType} from "../../models/guestModel";


class GuestBDService {
    private model: Model<guestType>;

    constructor() {
        this.model = guestModel;
    }

    async createGuest (): Promise<string> {
        const newGuest = new this.model({});
        await newGuest.save();

        return newGuest.id
    }
}

export default new GuestBDService();