import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import 'dotenv/config';

class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
    }

    async uploadImage(image: string, public_id: string, folder: string): Promise<UploadApiResponse> {
        const uploadResult: UploadApiResponse = await cloudinary.uploader.upload(image, {
            public_id: public_id,
            folder: `${folder}`,
        });

        return uploadResult;
    }
}


export default new CloudinaryService();
