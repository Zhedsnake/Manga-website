import sharp from "sharp";
import {UploadedImageByMulter} from "../../types/uploadedImageByMulter";
import userBDService from "../mongodb/UserBDService";


class VerificationService {

    async VerifyName(userName: string, prop: { [key: string]: string }): Promise<{ error: string } | null> {

        if (!userName) {
            return { error: "Не указано имя" };
        }

        const userExists: true | null = await userBDService.findOneUser(prop);
        if (userExists === true) {
            return { error: "Пользователь с таким именем уже существует" };
        }

        if (userName.length < 4) {
            return { error: "Имя должно содержать не менее 4 символов" };
        }

        if (userName.length > 10) {
            return { error: "Имя должно содержать не более 10 символов" };
        }

        return null;
    }

    async VerifyAvatar(avatarFile: UploadedImageByMulter[]): Promise<{ error: string } | null> {

        if (!avatarFile || avatarFile.length === 0) {
            return { error: 'Файл не загружен' };
        }

        if (avatarFile.length > 1) {
            return { error: 'Вы загрузили больше одного файла' };
        }

        const avatarFileLocal = avatarFile[0];

        if (avatarFileLocal.mimetype !== "image/jpeg" && avatarFileLocal.mimetype !== "image/png" && avatarFileLocal.mimetype !== "image/jpg") {
            return { error: 'Изображение должно быть в формате jpg или png' };
        }

        if (avatarFileLocal.size > 368000) { // 3.68 MB in bytes
            return { error: "Размер файла не должен превышать 3.68 MB." };
        }

        const metadata = await sharp(avatarFileLocal.path).metadata();

        if (metadata.width !== metadata.height) {
            return { error: 'Изображение должно иметь соотношение сторон 1:1.' };
        }

        return null;
    }
}

export default new VerificationService();
