import {Model} from "mongoose";
import userModel, {userType} from "../../models/userModel";


class EditUserInfoBDService {
    private model: Model<userType>;

    constructor() {
        this.model = userModel;
    }

    async EditUserNameByToken(
        userId: string,
        updates: { name: string }
    ): Promise<{ message: string } | undefined> {

        const user = await this.model.findByIdAndUpdate(userId, updates, {new: true});

        if (user) {
            return {message: "Ваш никнейм успешно обновлен"};
        }
    }

    async EditUserEmailByToken(
        userId: string,
        updates: { email: string }
    ): Promise<{ message: string } | undefined> {

        const user = await this.model.findByIdAndUpdate(userId, updates, {new: true});

        if (user) {
            return {message: "Ваша почта успешно обновлена"};
        }
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
        updates: {
            pic:string,
            minPic: string,
            picWebp:string,
            minPicWebp: string,
        }
    ): Promise<{ message: string } | undefined> {

        const user = await this.model.findByIdAndUpdate(userId, updates, {new: true});

        if (user) {
            return {message: "Ваш аватар успешно обновлен"};
        }
    }
}

export default new EditUserInfoBDService();