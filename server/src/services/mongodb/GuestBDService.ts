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

    // async removeGuest(id: string): Promise<boolean> {
    //     const result = await this.model.findByIdAndDelete({ _id: id });
    //     return true;
    // }
}

export default new GuestBDService();