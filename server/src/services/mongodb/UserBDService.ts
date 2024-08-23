import {Model} from "mongoose";
import userModel, {userType} from "../../models/userModel";


class UserBDService {
    private model: Model<userType>;

    constructor() {
        this.model = userModel;
    }

    async register(name: string, password: string, email: string): Promise<{ id: string } | { error: string }> {
        const userExists = await this.model.findOne({
            $or: [
                {name: name},
                {email: email}
            ]
        });

        if (userExists) {
            return {error: "Пользователь с таким именем или почтой уже существует"};
        }

        const newUser = new this.model({name, email, password});

        await newUser.save();

        return {id: newUser.id};
    }

    async login(name: string) {
        const user = await this.model.findOne({name: name});

        if (!user) {
            return {error: "Имя или пароль некорректны"};
        }

        if ("id" && "name" in user) {
            return {id: user.id, name: user.name, password: user.password};
        }
    }

    async GetSmallUserInfoByToken(userId: string) {
        const userData = await this.model.findById(userId).select('pic name -_id');

        if (userData && ("name" && "pic" in userData)) {
            return {name: userData.name, pic: userData.pic};
        }
    }
}

export default new UserBDService();