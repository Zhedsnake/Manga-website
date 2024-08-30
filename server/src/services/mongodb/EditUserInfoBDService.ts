import {Model} from "mongoose";
import userModel, {userType} from "../../models/userModel";


class UserBDService {
    private model: Model<userType>;

    constructor() {
        this.model = userModel;
    }

    async EditUserNameByToken(
        userId: string,
        updates: { name: string }
    ): Promise<{ message: string } | { error: string }> {
        const userExists = await this.model.findOne({name: updates.name});

        if (userExists) {
            return {error: "Пользователь с таким именем уже существует"};
        }

        const user = await this.model.findByIdAndUpdate(userId, updates, {new: true});

        return {message: "Ваш никнейм успешно обновлен"};
    }

    async EditUserEmailByToken(
        userId: string,
        updates: { email: string }
    ): Promise<{ message: string } | { error: string }> {
        const userExists = await this.model.findOne({email: updates.email});

        if (userExists) {
            return {error: "Пользователь с такой почтой уже существует"};
        }

        const user = await this.model.findByIdAndUpdate(userId, updates, {new: true});

        return {message: "Ваша почта успешно обновлена"};
    }

    async EditUserPasswordByToken(
        userId: string,
        updates: { password: string }
    ): Promise<{ message: string }> {

        const user = await this.model.findByIdAndUpdate(userId, updates, {new: true});

        return {message: "Ваш пароль успешно обновлен"};
    }


    async EditUserAvatarByToken(
        userId: string,
        updates: { pic:string, picWebp:string }
    ): Promise<{ message: string }> {

        const user = await this.model.findByIdAndUpdate(userId, updates, {new: true});

        return {message: "Ваш аватар успешно обновлен"};
    }
}

export default new UserBDService();