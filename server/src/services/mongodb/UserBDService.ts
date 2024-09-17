import { Model } from "mongoose";
import userModel, { userType } from "../../models/userModel";

class UserBDService {
    private model: Model<userType>;

    constructor() {
        this.model = userModel;
    }
    
    async GetSmallUserInfoByTokenNoWebp(userId: string): Promise<{ name: string, minPic?: string, pic?: string } | null> {
        const userData = await this.model.findById(userId).select('pic minPic name -_id');

        if (userData && "name" in userData) {

            if ("minPic" in userData && userData.minPic) {
                return { name: userData.name, minPic: userData.minPic };
            } else if ("pic" in userData && userData.pic) {
                return { name: userData.name, pic: userData.pic };
            }
        }

        return null;
    }

    async GetSmallUserInfoByTokenWebp(userId: string): Promise<{ name: string, minPicWebp?: string, pic?: string } | null> {
        const userData = await this.model.findById(userId).select('minPicWebp pic name -_id');

        if (userData && "name" in userData) {
            if ("minPicWebp" in userData && userData.minPicWebp) {
                return { name: userData.name, minPicWebp: userData.minPicWebp };
            } else if ("pic" in userData && userData.pic) {
                return { name: userData.name, pic: userData.pic };
            }
        }

        return null;
    }

    async findOneUserById(userId: string) {
        const userData = await this.model.findById(userId);
        return userData;
    }

    async GetUserInfoByTokenNoWebp(userId: string): Promise<{ name: string, registeredAt: string, pic: string, email: string } | undefined> {
        const userData = await this.model.findById(userId).select('-password');

        if (userData && "name" in userData && "pic" in userData && "email" in userData && "createdAt" in userData) {
            const registeredAt = userData.createdAt instanceof Date
                ? userData.createdAt.toISOString()
                : String(userData.createdAt);

            return {
                name: userData.name,
                email: userData.email,
                pic: userData.pic,
                registeredAt: registeredAt
            };
        }
    }

    async GetUserInfoByTokenWebp(userId: string): Promise<{ name: string, registeredAt: string, picWebp?: string, pic?: string, email: string } | undefined> {
        const userData = await this.model.findById(userId).select('-password');

        if (userData && "name" in userData && "pic" in userData && "email" in userData && "createdAt" in userData) {
            const registeredAt = userData.createdAt instanceof Date
                ? userData.createdAt.toISOString()
                : String(userData.createdAt);

            const baseData = {
                name: userData.name,
                email: userData.email,
                registeredAt: registeredAt
            }

            if ("picWebp" in userData) {
                return {
                    ...baseData,
                    picWebp: userData.picWebp,
                };
            }

            return {
                ...baseData,
                pic: userData.pic,
            };
        }
    }

    async findOneUser(prop: { [key: string]: string }): Promise<true | null> {
        const userExists = await this.model.findOne(prop);

        return userExists ? true : null;
    }
}

export default new UserBDService();
