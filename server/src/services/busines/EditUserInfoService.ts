import UserBDService from "../mongodb/UserBDService";
import bcrypt from "bcrypt";
import EditUserInfoBDService from "../mongodb/EditUserInfoBDService";
import sharp from "sharp";
import {UploadApiResponse} from "cloudinary";
import CloudinaryService from "../cloudinary/CloudinaryService";
import SharpService from "./SharpService";
import * as fs from "node:fs";


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
        const updateName: { message: string } | {
            error: string
        } = await EditUserInfoBDService.EditUserNameByToken(userId, updates)
        return updateName;
    }

    async EditUserEmailByToken(userId: string, updates: { email: string }) {
        const updateName: { message: string } | {
            error: string
        } = await EditUserInfoBDService.EditUserEmailByToken(userId, updates)
        return updateName;
    }

    async EditUserPasswordByToken(userId: string, userPassword: string, updates: { password: string }) {
        const findUser = await UserBDService.findOneUser(userId);

        if (findUser && "password" in findUser) {

            const isMatch: boolean = await bcrypt.compare(userPassword, findUser.password);

            if (!isMatch) {
                return {error: 'Пароль некорректны'};
            }

            const isMatchOld: boolean = await bcrypt.compare(updates.password, findUser.password);

            if (isMatchOld) {
                return {error: 'Вы ввели свой старый пароль, как новый'};
            }

            const hashedPassword: string = await bcrypt.hash(updates.password, this.salt);

            const hashedUpdates = {password: hashedPassword};

            const updateName: { message: string } | {
                error: string
            } = await EditUserInfoBDService.EditUserPasswordByToken(userId, hashedUpdates)
            return updateName;
        }
    }

    async EditUserAvatarByToken(
        userId: string,
        avatar: { file: UploadImage[] }
    ) {
        const avatarFile: UploadImage | null = Array.isArray(avatar.file) ? avatar.file[0] : null;

        if (avatarFile && "size" in avatarFile && "mimetype" in avatarFile) {

            if (avatarFile.mimetype !== "image/jpeg" && avatarFile.mimetype !== "image/png" && avatarFile.mimetype !== "image/jpg") {
                return {error: 'Изображение должно быть в формате jpg или png'};
            }

            if (avatarFile.size > 368000) { // 3.68 MB in bytes
                return {error: "Размер файла не должен превышать 3.68 MB."};
            }

            //
            const imageBuffer: string = avatarFile.path;
            const metadata = await sharp(imageBuffer).metadata();

            if (metadata.width !== metadata.height) {
                return {error: 'Изображение должно иметь соотношение сторон 1:1.'};
            }

            await CloudinaryService.ClearImages(`Users/Avatars/${userId}`).then()

            const {
                webp,
                minimizedWebp,
                minimized
            } = await SharpService.CompileImageInThreeFormats(imageBuffer, avatarFile)

            const uploadPromises: Promise<UploadApiResponse>[] = avatar.file.map(file =>
                CloudinaryService.uploadImage(file.path, file.originalname, `Users/Avatars/${userId}`)
            );

            const uploadWebpPromises: Promise<UploadApiResponse>[] = avatar.file.map(file =>
                CloudinaryService.uploadImage(webp, file.originalname, `Users/Avatars/${userId}`)
            );

            const uploadResizedPromise: Promise<UploadApiResponse>[] = avatar.file.map(file =>
                CloudinaryService.uploadImage(
                    minimized,
                    `${avatarFile.filename.split('.')[0]}-480p.${avatarFile.mimetype.split('/')[1]}`,
                    `Users/Avatars/${userId}`
                )
            );

            const uploadWebpResizedPromise: Promise<UploadApiResponse>[] = avatar.file.map(file =>
                CloudinaryService.uploadImage(
                    minimizedWebp,
                    `${avatarFile.filename.split('.')[0]}-480p.webp`,
                    `Users/Avatars/${userId}`
                )
            );

            const responseCloudinary: Awaited<UploadApiResponse>[] = await Promise.all(uploadPromises);
            const responseWebpCloudinary: Awaited<UploadApiResponse>[] = await Promise.all(uploadWebpPromises);
            const responseResizedPromise: Awaited<UploadApiResponse>[] = await Promise.all(uploadResizedPromise);
            const responseWebpResizedPromise: Awaited<UploadApiResponse>[] = await Promise.all(uploadWebpResizedPromise);

            await fs.promises.unlink(avatarFile.path);
            await fs.promises.unlink(webp);
            await fs.promises.unlink(minimizedWebp);
            await fs.promises.unlink(minimized);


            if (
                (responseCloudinary.length > 0 && responseCloudinary[0].secure_url)
                &&
                (responseWebpCloudinary.length > 0 && responseWebpCloudinary[0].secure_url)
                &&
                (responseResizedPromise.length > 0 && responseResizedPromise[0].secure_url)
                &&
                (responseWebpResizedPromise.length > 0 && responseResizedPromise[0].secure_url)
            ) {

                const avatarUpdate = {
                    pic: responseCloudinary[0].secure_url,
                    minPic: responseResizedPromise[0].secure_url,
                    minPicWebp: responseWebpResizedPromise[0].secure_url,
                    picWebp: responseWebpCloudinary[0].secure_url
                };

                const responseDB: {
                    message: string
                } | undefined = await EditUserInfoBDService.EditUserAvatarByToken(userId, avatarUpdate);

                if (responseDB) {
                    return responseDB;
                }
            }
        }
    }
}

export default new EditUserInfoService();
