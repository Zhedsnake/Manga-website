import UserBDService from "../mongodb/UserBDService";
import bcrypt from "bcrypt";
import EditUserInfoBDService from "../mongodb/EditUserInfoBDService";
import sharp from "sharp";
import {UploadApiResponse} from "cloudinary";
import CloudinaryService from "../cloudinary/CloudinaryService";


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
        this.salt = '';
        this.initSalt();
    }

    private async initSalt() {
        const salt: string | undefined = process.env.SALT;
        if (!salt) {
            throw new Error('JWT_SECRET is not defined');
        }

        const saltRounds: number = parseInt(salt);
        this.salt = await bcrypt.genSalt(saltRounds);
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

            const hashedPassword: string = await bcrypt.hash(updates.password, this.salt);

            const hashedUpdates = { password: hashedPassword};

            const updateName: { message: string } | { error: string } = await EditUserInfoBDService.EditUserPasswordByToken(userId, hashedUpdates)
            return updateName;
        }
    }

    async EditUserAvatarByToken(
        userId: string,
        avatar: { file: UploadImage[] }
    ) {
        const avatarFile = Array.isArray(avatar.file) ? avatar.file[0] : null;

        if (avatarFile && "size" in avatarFile && "mimetype" in avatarFile) {

            if (avatarFile.mimetype !== "image/jpeg" && avatarFile.mimetype !== "image/png" && avatarFile.mimetype !== "image/jpg") {
                return { error: 'Изображение должно быть в формате jpg или png' };
            }

            if (avatarFile.size > 368000) { // 3.68 MB in bytes
                return { error: "Размер файла не должен превышать 3.68 MB." };
            }

            const imageBuffer = avatarFile.path;
            const metadata = await sharp(imageBuffer).metadata();

            if (metadata.width !== metadata.height) {
                return { error: 'Изображение должно иметь соотношение сторон 1:1.' };
            }

            const webpImageBuffer = await sharp(imageBuffer)
                .webp()
                .toBuffer();

            const webpFilePath = `/tmp/${avatarFile.filename.split('.')[0]}.webp`;
            await sharp(webpImageBuffer).toFile(webpFilePath);

            const hashedUserId: string = await bcrypt.hash(userId, this.salt);

            const uploadPromises: Promise<UploadApiResponse>[] = avatar.file.map(file =>
                CloudinaryService.uploadImage(file.path, file.originalname, `Users/Avatars/${userId}`)
            );

            const uploadWebpPromises: Promise<UploadApiResponse>[] = avatar.file.map(file =>
                CloudinaryService.uploadImage(webpFilePath, file.originalname, `Users/Avatars/${userId}`)
            );

            const responseCloudinary: Awaited<UploadApiResponse>[] = await Promise.all(uploadPromises);

            const responseWebpCloudinary: Awaited<UploadApiResponse>[] = await Promise.all(uploadWebpPromises);

            if (
                (responseCloudinary.length > 0 && responseCloudinary[0].secure_url)
                &&
                (responseWebpCloudinary.length > 0 && responseWebpCloudinary[0].secure_url)
            ) {

                const avatarUpdate = {
                    pic: responseCloudinary[0].secure_url,
                    picWebp: responseWebpCloudinary[0].secure_url
                };

                const responseDB: { message: string } | undefined = await EditUserInfoBDService.EditUserAvatarByToken(userId, avatarUpdate);

                if (responseDB) {
                    return responseDB;
                }
            }
        }
    }
}

export default new EditUserInfoService();
