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

    async uploadMangaImage(image: string, public_id: string, folder: string) {
        const uploadResult = await cloudinary.uploader.upload(image, {
            public_id: public_id,
            folder: `Mangas/${folder}`
        });

        return uploadResult;
    }

    async uploadMultipleMangaImages(images: { path: string, public_id: string }[], folder: string) {
        // Массив промисов для загрузки всех изображений
        const uploadPromises = images.map(image =>
            this.uploadMangaImage(image.path, image.public_id, folder)
        );

        // Ожидание завершения всех загрузок
        const uploadResults = await Promise.all(uploadPromises);

        return uploadResults;
    }

    async uploadAvatarImage(image: string, public_id: string, folder: string) {
        const uploadResult = await cloudinary.uploader.upload(image, {
            public_id: public_id,
            folder: `Avatars/${folder}`
        });

        return uploadResult;
    }

    async optimizeUrlImage(image: string) {
        const optimizeUrl = cloudinary.url(image, {
            fetch_format: 'auto',
            quality: 'auto'
        });
        return optimizeUrl
    }
}

export default new cloudinaryService();