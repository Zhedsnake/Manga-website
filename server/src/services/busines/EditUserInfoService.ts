import JwtService from "../jwt/JwtService";
import UserBDService from "../mongodb/UserBDService";
import bcrypt from "bcrypt";
import cloudinaryService from "../cloudinary/CloudinaryService";
import {UploadApiResponse} from "cloudinary";
import CloudinaryService from "../cloudinary/CloudinaryService";
import userBDService from "../mongodb/UserBDService";
import EditUserInfoBDService from "../mongodb/EditUserInfoBDService";

interface UploadImage {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
}

class EditUserInfoService {
    private salt: string;

    constructor() {
        const salt: string | undefined = process.env.SALT;
        if (!salt) {
            throw new Error('JWT_SECRET is not defined');
        }
        this.salt = salt;
    }

    async EditUserNameByToken(userId: string, updates: { name: string }) {
        const updateName: { message: string } | { error: string } = await EditUserInfoBDService.EditUserNameByToken(userId, updates)
        return updateName;
    }

    async EditUserEmailByToken(userId: string, updates: { email: string }) {
        const updateName: { message: string } | { error: string } = await EditUserInfoBDService.EditUserEmailByToken(userId, updates)
        return updateName;
    }

    async EditUserPasswordByToken(userId: string, userPassword: string, updates: { password: string }) {
        const findUser = await UserBDService.findOneUser(userId);

        if ( findUser && "password" in findUser) {

            const isMatch: boolean = await bcrypt.compare(userPassword, findUser.password);

            if (!isMatch) {
                return {error: 'Пароль некорректны'};
            }

            const isMatchOld: boolean = await bcrypt.compare(updates.password, findUser.password);

            if (isMatchOld) {
                return {error: 'Вы ввели свой старый пароль, как новый'};
            }

            const saltRounds: number = parseInt(this.salt);
            const salt: string = await bcrypt.genSalt(saltRounds);
            const hashedPassword: string = await bcrypt.hash(updates.password, salt);

            const hashedUpdates = { password: hashedPassword};

            const updateName: { message: string } | { error: string } = await EditUserInfoBDService.EditUserPasswordByToken(userId, hashedUpdates)
            return updateName;
        }
    }

    async EditUserAvatarByToken(
        userId: string,
        avatar: { file: UploadImage[] }
    ) {
        const uploadPromises: Promise<UploadApiResponse>[] = avatar.file.map(file =>
            CloudinaryService.uploadImage(file.path, file.originalname, 'Users/Avatars')
        );

        const responseCloudinary: Awaited<UploadApiResponse>[] = await Promise.all(uploadPromises);

        if (responseCloudinary.length > 0 && responseCloudinary[0].secure_url) {
            const avatarUpdate = { pic: responseCloudinary[0].secure_url };

            const responseDB: { message: string } | undefined = await EditUserInfoBDService.EditUserAvatarByToken(userId, avatarUpdate);

            if (responseDB) {
                return responseDB;
            }
        }
    }
}

export default new EditUserInfoService();
