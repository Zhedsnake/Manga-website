import {Model} from "mongoose";
import userModel, {userType} from "../../models/userModel";


class UserBDService {
    private model: Model<userType>;

    constructor() {
        this.model = userModel;
    }

    async GetSmallUserInfoByToken(userId: string): Promise<{ name: string, pic: string } | undefined> {
        const userData = await this.model.findById(userId).select('pic name -_id');

        if (userData && ("name" && "pic" in userData)) {
            return {name: userData.name, pic: userData.pic};
        }
    }

    async findOneUserById(userId: string) {
        const userData = await this.model.findById(userId);
        return userData;
    }

    async GetUserInfoByToken(userId: string): Promise<{ name: string, registeredAt: string, pic: string, email: string } | undefined> {
        const userData = await this.model.findById(userId).select('-password');

        if (userData && ("name" && "pic" && "email" && "createdAt" in userData)) {
            const registeredAt = userData.createdAt instanceof Date
                ? userData.createdAt.toISOString()
                : String(userData.createdAt);

            return {
                name: userData.name,
                email: userData.email,
                pic: userData.pic,
                registeredAt: registeredAt
            };
        }
    }

    async findOneUser(prop: { [key: string]: string }): Promise<true | null>{
        const userExists = await this.model.findOne(prop);

        if (userExists) {
            return true;
        } else {
            return null;
        }
    }
}

export default new UserBDService();