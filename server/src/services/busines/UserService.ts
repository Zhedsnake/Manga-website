import JwtService from "../jwt/JwtService";
import UserBDService from "../mongodb/UserBDService";
import bcrypt from "bcrypt";
import cloudinaryService from "../cloudinary/CloudinaryService";
import {UploadApiResponse} from "cloudinary";
import CloudinaryService from "../cloudinary/CloudinaryService";
import userBDService from "../mongodb/UserBDService";

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

class UserService {
    private salt: string;

    constructor() {
        const salt: string | undefined = process.env.SALT;
        if (!salt) {
            throw new Error('JWT_SECRET is not defined');
        }
        this.salt = salt;
    }

    async register(name: string, email: string, password: string) {
        const saltRounds: number = parseInt(this.salt);
        const salt: string = await bcrypt.genSalt(saltRounds);
        const hashedPassword: string = await bcrypt.hash(password, salt);

        const responseBD: { id: string } | {
            error: string
        } = await UserBDService.register(name, hashedPassword, email);

        if ("id" in responseBD) {
            const payload = {
                user: {
                    id: responseBD.id,
                },
            };

            const userToken: string = JwtService.getUserToken(payload);

            return {userToken: userToken};

        } else if ("error" in responseBD) {
            return responseBD
        }
    }

    async login(name: string, password: string) {
        const responseBD:
            { id: string,
            name: string,
            password: string }
            | { error: string } = await UserBDService.login(name);

        if ("password" in responseBD) {
            const isMatch: boolean = await bcrypt.compare(password, responseBD.password);

            if (!isMatch) {
                return {error: 'Имя или пароль некорректны'};
            }

            const payload = {
                user: {
                    id: responseBD.id,
                },
            };

            const userToken: string = JwtService.getUserToken(payload);
            return {userToken: userToken};

        } else if ("error" in responseBD) {
            return responseBD
        }
    }

    async GetSmallUserInfoByToken(userId: string): Promise<{ name: string, pic: string } | undefined> {
        const userData: { name: string, pic: string } | undefined = await UserBDService.GetSmallUserInfoByToken(userId);
        return userData;
    }

    async UpdateUserToken(userId: string): Promise<{ userToken: string }> {
        const payload = {
            user: {
                id: userId,
            },
        };

        const userToken = JwtService.getUserToken(payload);
        return {userToken: userToken};
    }

    async GetUserInfoByToken(userId: string) {
        const userData: {
            name: string
            registeredAt: string
            pic: string
            email: string }
            | undefined = await UserBDService.GetUserInfoByToken(userId);


        if (userData) {
            const formattedDate = new Date(userData.registeredAt).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });

            return {
                ...userData,
                registeredAt: formattedDate
            };
        }
    }
}

export default new UserService();
