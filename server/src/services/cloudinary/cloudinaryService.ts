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

    async uploadImage(imagePath: string, originalname: string, folder: string): Promise<UploadApiResponse> {
        const format = imagePath.split('.').pop()?.toLowerCase();
        const originalNameNoFormat = originalname.split('.').slice(0, -1).join('.');

        const randomSuffix = Math.floor(Math.random() * 10000);
        const modifiedName = `${originalNameNoFormat}-${randomSuffix}`;

        const uploadResult: UploadApiResponse = await cloudinary.uploader.upload(imagePath, {
            public_id: modifiedName,
            folder: `${folder}`,
            format: format, // (png, jpg, jpeg, webp)
        });

        return uploadResult;
    }

    async ClearImages(folder: string): Promise<void> {
        const prefix = `${folder}/`;

        await cloudinary.api.delete_resources_by_prefix(prefix);
    }
}


export default new CloudinaryService();
