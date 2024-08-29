import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
    }

    async uploadImage(imagePath: string, originalname: string, folder: string): Promise<UploadApiResponse> {
        const uploadResult: UploadApiResponse = await cloudinary.uploader.upload(imagePath, {
            public_id: originalname,
            folder: `${folder}`,
        });

        return uploadResult;
    }
}


export default new CloudinaryService();
