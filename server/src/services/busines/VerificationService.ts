import sharp from "sharp";
import {UploadedImageByMulter} from "../../types/uploadedImageByMulter";
import userBDService from "../mongodb/UserBDService";
import UserBDService from "../mongodb/UserBDService";
import bcrypt from "bcrypt";
import AuthBDService from "../mongodb/AuthBDService";
import BcryptService from "../bcrypt/BcryptService";
import SharpService from "../Sharp/SharpService";


class VerificationService {

    async VerifySupWebp(webpTest: string): Promise<{error: string} | null>{

        const noWebpSup = `Не указана поддержка webp в булевом формате ("true","false")`

        if (webpTest) {
            if (webpTest !== "true" && webpTest !== "false") {
                return {error: noWebpSup};
            }
        } else if (!webpTest) {
            return {error: noWebpSup}
        }

        return null
    }

    async VerifyRegister(name: string, email: string, password: string){

        if (!name || !email || !password) {
            return { error: "Пожалуйста, заполните все поля."};
        }

        const propName = {name: name}
        const propEmail = {email: email}

        const verificationNameResponse:{error: string} | null = await this.VerifyName(name, propName)
        if (verificationNameResponse && "error" in verificationNameResponse) {
            return verificationNameResponse;
        }

        const verificationEmailResponse:{error: string} | null = await this.VerifyEmail(email, propEmail)
        if (verificationEmailResponse && "error" in verificationEmailResponse) {
            return verificationEmailResponse;
        }

        const verificationPasswordResponse:{error: string} | null | undefined = await this.VerifyPassword(password)
        if (verificationPasswordResponse && "error" in verificationPasswordResponse) {
            return verificationPasswordResponse;
        }

        return null;
    }

    async VerifyLogin(prop: { name: string, password: string }): Promise<{ error: string } | { id: string } | undefined> {

        if (!prop.name || !prop.password) {
            return { error: "Пожалуйста, заполните все поля."};
        }

        const propName = {name: prop.name};
        const user: { id: string, password: string } | null = await AuthBDService.login(propName);

        if (!user) {
            return {error: "Имя или пароль некорректны"};
        }

        if ("password" in user && "id" in user) {
            const isMatch: boolean = await BcryptService.Compare(prop.password, user.password);

            if (!isMatch) {
                return {error: 'Имя или пароль некорректны'};
            }

            return {id: user.id};
        }
    }

    async VerifyName(userName: string, prop: { [key: string]: string }){

        if (!userName) {
            return { error: "Не указано имя" };
        }

        if (userName.length < 4) {
            return { error: "Имя должно содержать не менее 4 символов" };
        }

        if (userName.length > 10) {
            return { error: "Имя должно содержать не более 10 символов" };
        }

        const userExists: true | null = await userBDService.findOneUser(prop);
        if (userExists === true) {
            return { error: "Пользователь с таким именем уже существует" };
        }

        return null;
    }

    async VerifyEmail(userEmail: string, prop: { [key: string]: string }){

        if (!userEmail) {
            return {error: "Не указано email"};
        }

        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(userEmail)) {
            return { error: "Некорректный формат email" };
        }

        const userExists: true | null = await userBDService.findOneUser(prop);
        if (userExists === true) {
            return { error: "Пользователь с таким email уже существует" };
        }

        return null
    }

    async VerifyPassword(password: string): Promise<{ error: string } | null | undefined>{

        if (!password) {
            return { error: "Не указан пароль" };
        }

        if (password.length < 6) {
            return { error: "Пароль должен содержать не менее 6 символов" };
        }

        if (password.length > 16) {
            return { error: "Пароль должен содержать не более 16 символов" };
        }

        // Проверка на наличие хотя бы одной заглавной буквы
        const hasUpperCase = /[A-Z]/.test(password);
        if (!hasUpperCase) {
            return { error: "Пароль должен содержать хотя бы одну заглавную букву" };
        }

        // Проверка на наличие хотя бы трех чисел
        const hasThreeDigits = /.*\d.*\d.*\d/.test(password);
        if (!hasThreeDigits) {
            return { error: "Пароль должен содержать хотя бы три числа" };
        }

        // Проверка на наличие хотя бы одного специального символа
        const hasSpecialCharacter = /[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};':"\\|,.<>\/?№]/.test(password);
        if (!hasSpecialCharacter) {
            return { error: "Пароль должен содержать хотя бы один специальный символ" };
        }

        // Проверка на наличие только латинских букв
        const isLatinOnly = /^[A-Za-z0-9!@#\$%\^&\*\(\)_\+\-=\[\]\{\};':"\\|,.<>\/?№]+$/.test(password);
        if (!isLatinOnly) {
            return { error: "Пароль должен содержать только латинские буквы и допустимые символы" };
        }

        return null
    }

    async VerifyEditName(userName: string, prop: { [key: string]: string }): Promise<{ error: string } | null | undefined> {

        const verificationResponse:{error: string} | null = await this.VerifyName(userName, prop)
        if (verificationResponse && "error" in verificationResponse) {
            return verificationResponse;
        }

        return null
    }

    async VerifyEditEmail(userEmail: string, prop: { [key: string]: string }): Promise<{ error: string } | null | undefined> {

        const verificationResponse:{error: string} | null = await this.VerifyEmail(userEmail, prop)
        if (verificationResponse && "error" in verificationResponse) {
            return verificationResponse;
        }

        return null
    }

    async VerifyEditPassword(userId:string, userNewPassword: string, userOldPassword: string){

        if (!userOldPassword) {
            return {error: "Не указан старый пароль"}
        }

        if (!userNewPassword) {
            return {error: "Не указан новый пароль"}
        }

        if (userOldPassword === userNewPassword) {
            return {error: 'Новый пароль не должен совпадать со старым'};
        }

        const findUser = await UserBDService.findOneUserById(userId);

        if (findUser && "password" in findUser) {

            const isMatch: boolean = await BcryptService.Compare(userOldPassword, findUser.password);

            if (!isMatch) {
                return {error: 'Старый пароль некорректен'};
            }

            const verificationResponse:{error: string} | null | undefined = await this.VerifyPassword(userNewPassword)
            if (verificationResponse && "error" in verificationResponse) {
                return verificationResponse;
            }
        }

        return null
    }

    async VerifyEditAvatar(avatarFile: UploadedImageByMulter): Promise<{ error: string } | null> {

        if (avatarFile.mimetype !== "image/jpeg" && avatarFile.mimetype !== "image/png" && avatarFile.mimetype !== "image/jpg") {
            return { error: 'Изображение должно быть в формате jpg или png' };
        }

        const metadata = await SharpService.GetWidthAndHeight(avatarFile);

        if (metadata.width !== metadata.height) {
            return { error: 'Изображение должно иметь соотношение сторон 1:1.' };
        }

        return null;
    }
}

export default new VerificationService();
