import { UploadApiResponse } from 'cloudinary';
import CloudinaryService from "../cloudinary/cloudinaryService";
import ImagesBDService from "../mongodb/ImagesBDService";

interface UploadMangaImageBody {
    title?: string;
    description?: string;
}

interface UploadMangaImageFile {
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

class ImagesService {

    async uploadMangaImage(
        body: UploadMangaImageBody,
        image: { file: UploadMangaImageFile }
    ) {
        if (!image.file || Object.keys(image.file).length === 0) {
            throw new Error('Файл не загружен');
        }

        const responseCloudinary: UploadApiResponse = await CloudinaryService.uploadImage(
            image.file.path,
            image.file.originalname, 'Mangas/example'
        );

        const responseDB = await ImagesBDService.uploadImages(
            responseCloudinary.original_filename,
            responseCloudinary.secure_url
        )

        console.log(responseDB);

        return ('Файл загружен')
    }

    async uploadMultipleMangaImages(
        body: UploadMangaImageBody,
        images: { files: UploadMangaImageFile[] }
    ) {

        console.log(`Body is`, body);
        console.log(`Image is`, images);

        const uploadPromises = images.files.map(file =>
            CloudinaryService.uploadImage(file.path, file.originalname, 'Mangas/example')
        );

        return await Promise.all(uploadPromises);
    }

}

export default new ImagesService();