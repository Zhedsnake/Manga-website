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

    async uploadMangaImage(image: string, public_id: string, folder: string): Promise<UploadApiResponse> {
        const uploadResult = await cloudinary.uploader.upload(image, {
            public_id: public_id,
            folder: `Mangas/${folder}`,
        });

        return uploadResult;
    }

    // async uploadMultipleMangaImages(images: { path: string, public_id: string }[], folder: string): Promise<UploadApiResponse[]> {
    //     const uploadPromises = images.map(image =>
    //         this.uploadOneImage(image.path, image.public_id, folder)
    //     );
    //
    //     const uploadResults = await Promise.all(uploadPromises);
    //
    //     return uploadResults;
    // }
    //
    // async uploadAvatarImage(image: string, public_id: string, folder: string): Promise<UploadApiResponse> {
    //     const uploadResult = await cloudinary.uploader.upload(image, {
    //         public_id: public_id,
    //         folder: `Avatars/${folder}`,
    //         format: 'webp'
    //     });
    //
    //     return uploadResult;
    // }
}


export default new CloudinaryService();
