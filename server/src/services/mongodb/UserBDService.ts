import { Model } from "mongoose";
import userModel, {userType} from "../../models/userModel";
import registerRequestTypes from "../../types/registerRequestTypes";


class UserBDService {
    private model: Model<userType>;

    constructor() {
        this.model = userModel;
    }

    async register (register: registerRequestTypes): Promise<{ id: string } | {error: string}> {
        const {name, email, password} = register;
        const userExists = await this.model.findOne({
            $or: [
                { name: name },
                { email: email }
            ]
        });

        if (userExists) {
            return { error: "Пользователь с таким именем или почтой уже существует"};
        }

        const newUser = new this.model({ name, email, password });
        await newUser.save();

        return { id: newUser.id};
    }
}

export default new UserBDService();