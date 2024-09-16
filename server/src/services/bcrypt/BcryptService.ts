import bcrypt from "bcrypt";
import 'dotenv/config'

class BcryptService {
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

    async Hash(value: string): Promise<string> {
        return await bcrypt.hash(value, this.salt);
    }

    async Compare(ValueOne: string, ValueTwo: string): Promise<boolean> {
        return await bcrypt.compare(ValueOne, ValueTwo);
    }

}

export {BcryptService}

export default new BcryptService();
