import { UploadApiResponse } from 'cloudinary';
import CloudinaryService from "../cloudinary/cloudinaryService";
import ImagesBDService from "../mongodb/ImagesBDService";

interface UploadImageBody {
    title?: string;
    description?: string;
}

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

class ImagesService {

    async uploadMultipleImages(
        body: UploadImageBody,
        images: { files: UploadImage[] }
    ) {
        try {
            const uploadPromises: Promise<UploadApiResponse>[] = images.files.map(file =>
                CloudinaryService.uploadImage(file.path, file.originalname, 'Mangas/example')
            );

            const responseCloudinary: Awaited<UploadApiResponse>[] = await Promise.all(uploadPromises);


            const savePromises = responseCloudinary.map(saveImageData =>
                ImagesBDService.uploadImages(
                    saveImageData.original_filename,
                    saveImageData.secure_url
                )
            );

            const responseDB = await Promise.all(savePromises);

            if(responseDB){
                return ({message: 'Файлы загружены'})
            } else {
                return ({message:'Произошла ошибка при загрузке файлов'})
            }
        } catch (e) {
            console.error(e);
        }
    }

}

export default new ImagesService();