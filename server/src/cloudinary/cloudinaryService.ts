import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config'

class cloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
    }

    async uploadImage(image: string, publicid: string) {
        const uploadResult = await cloudinary.uploader.upload(image, {
            public_id: publicid,
        });

        return uploadResult;
    }
}

export default new cloudinaryService();