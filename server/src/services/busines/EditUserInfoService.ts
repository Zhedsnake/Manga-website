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
import BcryptService from "../bcrypt/BcryptService";


class EditUserInfoService {

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

    async EditUserNameByToken(userId: string, userName: string): Promise<({error: string} & {error: unknown}) | {message: string} | undefined>{

        const updates = {name: userName}

        const verificationResponse:{error: string} | null | undefined = await VerificationService.VerifyEditName(userName, updates)
        if (verificationResponse && "error" in verificationResponse) {
            return verificationResponse;
        }

        const updateName: { message: string } | undefined = await EditUserInfoBDService.EditUserNameByToken(userId, updates)

        if (updateName) {
            return updateName;
        }
    }

    async EditUserEmailByToken(userId: string, userEmail: string): Promise<({error: string} & {error: unknown}) | {message: string} | undefined>{

        const updates = { email: userEmail }

        const verificationResponse:{error: string} | null | undefined = await VerificationService.VerifyEditEmail(userEmail, updates)
        if (verificationResponse && "error" in verificationResponse) {
            return verificationResponse;
        }

        const updateEmail: { message: string } | undefined = await EditUserInfoBDService.EditUserEmailByToken(userId, updates)
        if (updateEmail) {
            return updateEmail;
        }
    }

    async EditUserPasswordByToken(userId: string, userOldPassword: string, userNewPassword: string): Promise<({error: string} & {error: unknown}) | {message: string} | undefined>{

        const verificationResponse:{error: string} | null = await VerificationService.VerifyEditPassword(userId, userOldPassword, userNewPassword)
        if (verificationResponse && "error" in verificationResponse) {
            return verificationResponse;
        }

        const hashedPassword: string = await BcryptService.Hash(userNewPassword);

        const hashedUpdates = {password: hashedPassword};

        const updatePassword: { message: string } | undefined = await EditUserInfoBDService.EditUserPasswordByToken(userId, hashedUpdates)
        if (updatePassword) {
            return updatePassword;
        }
    }

    async EditUserAvatarByToken( userId: string, avatar: { file: UploadedImageByMulter }): Promise<void | { error: string } | { message: string }> {

        const avatarFile = avatar.file;
        const avatarPath: string = avatarFile.path;

        const verificationResponse: { error: string } | null = await VerificationService.VerifyEditAvatar(avatar.file);
        if (verificationResponse && "error" in verificationResponse) {
            await fs.promises.unlink(avatarPath);

            return verificationResponse;
        }

        const {
            minimizedFilePath,
            webpFilePath,
            minimizedWebpFilePath
        } = await SharpService.CompileImageInThreeFormats(avatarPath, avatarFile)

        const avatarsArray:({ path: string })[]  = [
            {path: avatarFile.path},
            {path: minimizedFilePath},
            {path: webpFilePath},
            {path: minimizedWebpFilePath}
        ]

        await CloudinaryService.ClearImages(`Users/Avatars/${userId}`)

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
