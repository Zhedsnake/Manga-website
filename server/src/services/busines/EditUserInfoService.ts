import UserBDService from "../mongodb/UserBDService";
import bcrypt from "bcrypt";
import EditUserInfoBDService from "../mongodb/EditUserInfoBDService";
import {UploadApiResponse} from "cloudinary";
import CloudinaryService from "../cloudinary/CloudinaryService";
import SharpService from "../Sharp/SharpService";
import * as fs from "node:fs";
import VerificationService from "./VerificationService";
import {UploadedImageByMulter} from "../../types/uploadedImageByMulter";
import * as path from "node:path";


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

    private async cleanupTmpDir() {
        try {
            const tmpDir = '/tmp';
            const files = await fs.promises.readdir(tmpDir);

            const deletePromises = files.map(file => {
                const filePath = path.join(tmpDir, file);
                if (!file.startsWith('v8-compile-cache-0')) {
                    return fs.promises.unlink(filePath);
                }
            });

            await Promise.all(deletePromises);
        } catch (error) {
            console.error("Error cleaning up /tmp directory:", error);
        }
    }

    async EditUserNameByToken(userId: string, userName: string) {

        const updates = {name: userName}

        const verificationResponse:{error: string} | null = await VerificationService.VerifyName(userName, updates)
        if (verificationResponse && "error" in verificationResponse) {
            return verificationResponse;
        }

        const updateName: { message: string } | undefined = await EditUserInfoBDService.EditUserNameByToken(userId, updates)

        if (updateName) {
            return updateName;
        }
    }

    async EditUserEmailByToken(userId: string, updates: { email: string }) {
        const updateName: { message: string } | {
            error: string
        } = await EditUserInfoBDService.EditUserEmailByToken(userId, updates)
        return updateName;
    }

    async EditUserPasswordByToken(userId: string, userPassword: string, updates: { password: string }) {
        const findUser = await UserBDService.findOneUserById(userId);

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

    async EditUserAvatarByToken( userId: string, avatar: { file: UploadedImageByMulter[] }): Promise<void | { error: string } | { message: string }> {

        const avatarFile = avatar.file[0];
        const avatarBuffer: string = avatarFile.path;

        const verificationResponse: { error: string } | null = await VerificationService.VerifyAvatar(avatar.file);
        if (verificationResponse && "error" in verificationResponse) {
            await fs.promises.unlink(avatarBuffer);

            return verificationResponse;
        }


        await CloudinaryService.ClearImages(`Users/Avatars/${userId}`)

        const {
            minimizedFilePath,
            webpFilePath,
            minimizedWebpFilePath
        } = await SharpService.CompileImageInThreeFormats(avatarBuffer, avatarFile)

        const avatarsArray:({ path: string })[]  = [
            {path: avatarFile.path},
            {path: minimizedFilePath},
            {path: webpFilePath},
            {path: minimizedWebpFilePath}
        ]

        const avatarsSavesPromises: Promise<UploadApiResponse>[] = avatarsArray.map(image =>
            CloudinaryService.uploadImage(
                image.path,
                avatarFile.originalname,
                `Users/Avatars/${userId}`)
        );

        const avatarSaves: Awaited<UploadApiResponse>[] = await Promise.all(avatarsSavesPromises);

        const avatarsSecureUrl: string[] = avatarSaves.map(item => item.secure_url);

        await Promise.all(
            avatarsArray.map(async (item) => {
                await fs.promises.unlink(item.path);
            })
        );

        const avatarUpdate = {
            pic: avatarsSecureUrl[0],
            minPic: avatarsSecureUrl[1],
            picWebp: avatarsSecureUrl[2],
            minPicWebp: avatarsSecureUrl[3],
        };

        const responseDB: {
            message: string
        } | undefined = await EditUserInfoBDService.EditUserAvatarByToken(userId, avatarUpdate);

        if (responseDB) {
            return responseDB;
        }
    }
}

export default new EditUserInfoService();
