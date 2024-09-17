import {Model} from "mongoose";
import userModel, {userType} from "../../models/userModel";
import {guestModel, guestType} from "../../models/guestModel";


class AuthBDService {
    private userModel: Model<userType>;
    private guestModel: Model<guestType>;

    constructor() {
        this.userModel = userModel;
        this.guestModel = guestModel;
    }

    async createGuest (): Promise<{ id: string } | null> {
        const newGuest = new this.guestModel({});
        await newGuest.save();

        if (newGuest && "id" in newGuest) {
            return {id: newGuest.id}
        }

        return null
    }

    async register(prop: Record<string, any>): Promise<{ id: string } | null> {

        const newUser = new this.userModel(prop);

        await newUser.save();

        if (newUser && "id" in newUser) {
            return {id: newUser.id};
        }

        return null
    }

    async login(propName: {name: string}): Promise<{ id: string, password: string } | null> {
        const user = await this.userModel.findOne(propName);

        if (user && "id" in user && "password" in user) {
            return {id: user.id, password: user.password};
        }

        return null
    }
}

export {AuthBDService};

export default new AuthBDService();